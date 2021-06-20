package hr.fer.zavrsni.webApp.controller;

import java.util.ArrayList;
import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;

import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.Point;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import hr.fer.zavrsni.webApp.dao.AccountRepository;
import hr.fer.zavrsni.webApp.dao.LocationRepository;
import hr.fer.zavrsni.webApp.dao.SightingRecordRepository;
import hr.fer.zavrsni.webApp.dao.SpeciesRepository;
import hr.fer.zavrsni.webApp.model.Account;
import hr.fer.zavrsni.webApp.model.SightingRecord;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class RecordController {

	@Autowired
	private SightingRecordRepository sightingRecordRepository;

	@Autowired
	private LocationRepository locationRepository;

	@Autowired
	private SpeciesRepository speciesRepository;

	@Autowired
	private AccountRepository accountRepository;

	@GetMapping("/record/getAll")
	public List<Map<String, Object>> getRecords() {
		List<Map<String, Object>> response = new ArrayList<>();
		for (SightingRecord sightingRecord : sightingRecordRepository.findAll()) {
			Map<String, Object> recordMap = new HashMap<>();

			recordMap.put("id", sightingRecord.getRecordId());
			recordMap.put("description", sightingRecord.getDescription());
			recordMap.put("coordinates", sightingRecord.getLocationCoordinates() == null ? null
					: sightingRecord.getLocationCoordinates().toString());
			recordMap.put("locationDescription", sightingRecord.getLocationDescription());
			recordMap.put("location", sightingRecord.getLocationId().toString());
			recordMap.put("speciesId", sightingRecord.getSpecies().getSpeciesId());
			recordMap.put("userId", sightingRecord.getUser() == null ? null : sightingRecord.getUser().getUserId());

			response.add(recordMap);
		}

		return response;
	}

	@PostMapping(value = "/record/getOne")
	public Map<String, Object> getRecord(@RequestBody Map<String, Object> postObj) {
		Map<String, Object> response = new HashMap<String, Object>();
		SightingRecord record;

		try {
			record = sightingRecordRepository.findByRecordId((Integer) postObj.get("id"));
		} catch (NoSuchElementException | IllegalArgumentException e) {
			response.put("message", "Invalid account id.");
			return response;
		}

		response.put("description", record.getDescription());
		if (record.getLocationCoordinates() != null) {
			response.put("coordinateX", record.getLocationCoordinates().getX());
			response.put("coordinateY", record.getLocationCoordinates().getY());
		}
		response.put("locationDescription", record.getLocationDescription());
		System.out.println(record.getLocationId());
		System.out.println(locationRepository.findByLocationId(record.getLocationId()));
		response.put("location", locationRepository.findByLocationId(record.getLocationId()).getName());
		byte[] base64 = Base64.getEncoder().encode(record.getPhotograph());
		response.put("photograph", new String(base64));
		response.put("species", record.getSpecies().getSpeciesName());
		response.put("speciesGroup", record.getSpecies().getSpeciesGroup().getSpeciesGroupName());

		return response;
	}

	@PostMapping(value = "/record/delete")
	public Map<String, String> deleteRecord(@RequestBody Map<String, Object> postObj) {
		Map<String, String> response = new HashMap<>();
		SightingRecord sightingRecord;

		try {
			sightingRecord = sightingRecordRepository.findByRecordId((Integer) postObj.get("id"));
		} catch (NoSuchElementException | IllegalArgumentException e) {
			response.put("message", "Invalid sighting record id.");
			return response;
		}

		sightingRecordRepository.delete(sightingRecord);

		response.put("message", "Sighting record successfully deleted.");
		return response;
	}

	@PostMapping(value = "/record/create")
	public Map<String, String> createRecord(@RequestBody Map<String, Object> postObj) {

		Map<String, String> response = new HashMap<>();
		Integer lastId = sightingRecordRepository.findFirstByOrderByRecordIdDesc().getRecordId();

		Point pt = null;
		if (postObj.get("coordinatesLat") != null) {
			System.out.println("NOT NULL");
			GeometryFactory fac = new GeometryFactory();
			double lat = (Double) (postObj.get("coordinatesLat"));
			double lon = (Double) (postObj.get("coordinatesLon"));
			pt = fac.createPoint(new Coordinate(lat, lon));
		}
		Account account;
		if (postObj.get("userId").toString()=="") {
			account = null;
		} else
			account = accountRepository.findByUserId(Integer.parseInt(postObj.get("userId").toString()));
		SightingRecord newSightingRecord = new SightingRecord(lastId + 1, postObj.get("description").toString(), pt,
				postObj.get("locationDescription").toString(),
				locationRepository.findByName(postObj.get("location").toString()),
				postObj.get("photograph").toString().getBytes(),
				speciesRepository.findBySpeciesName(postObj.get("species").toString()), account);
		sightingRecordRepository.save(newSightingRecord);
		response.put("message", "Sighting record successfully created.");

		return response;
	}

}
