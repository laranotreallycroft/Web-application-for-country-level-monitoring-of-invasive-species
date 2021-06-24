package hr.fer.zavrsni.webApp.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import hr.fer.zavrsni.webApp.dao.CountyRepository;
import hr.fer.zavrsni.webApp.dao.LocationRepository;
import hr.fer.zavrsni.webApp.dao.SightingRecordRepository;
import hr.fer.zavrsni.webApp.model.Location;
import hr.fer.zavrsni.webApp.model.SightingRecord;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class LocationController {

	@Autowired
	private LocationRepository locationRepository;

	@Autowired
	private CountyRepository countyRepository;

	@Autowired
	private SightingRecordRepository sightingRecordRepository;

	@GetMapping("/location/getAll")
	public List<Map<String, String>> getlocations() {
		List<Map<String, String>> response = new ArrayList<>();
		for (Location location : locationRepository.findAll()) {
			Map<String, String> locationMap = new HashMap<>();
			locationMap.put("id", Integer.toString(location.getLocationId()));
			locationMap.put("name", location.getName());
			locationMap.put("county", location.getCounty().getName());

			response.add(locationMap);
		}

		return response;
	}

	@PostMapping(value = "/location/delete")
	public Map<String, String> deleteLocation(@RequestBody Map<String, Object> postObj) {
		Map<String, String> response = new HashMap<>();
		Location location;

		try {
			location = locationRepository.findByLocationId((Integer) postObj.get("id"));
		} catch (NoSuchElementException | IllegalArgumentException e) {
			response.put("message", "Invalid location id.");
			return response;
		}
		for (SightingRecord record : location.getRecords())
			sightingRecordRepository.delete(record);
		locationRepository.delete(location);

		response.put("message", "Location successfully deleted.");
		return response;
	}

	@PostMapping(value = "/location/create")
	public Map<String, String> createLocation(@RequestBody Map<String, Object> postObj) {

		Map<String, String> response = new HashMap<>();
		Location location;

		try {
			location = locationRepository.findByName(postObj.get("locationName").toString());

		} catch (NoSuchElementException | IllegalArgumentException e) {
			response.put("message", "Some error?");
			return response;
		}
		if (location != null)
			throw new IllegalArgumentException("location with this name already exists. Please choose another one.");
		Integer lastId = locationRepository.findFirstByOrderByLocationIdDesc().getLocationId();
		Location newLocation = new Location(lastId + 1, postObj.get("locationName").toString(),
				countyRepository.findByName(postObj.get("county").toString()));
		locationRepository.save(newLocation);
		response.put("message", "Location successfully created.");
		return response;
	}

}
