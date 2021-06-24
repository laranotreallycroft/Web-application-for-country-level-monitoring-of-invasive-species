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
import hr.fer.zavrsni.webApp.model.County;
import hr.fer.zavrsni.webApp.model.Location;
import hr.fer.zavrsni.webApp.model.SightingRecord;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class CountyController {

	@Autowired
	private LocationRepository locationRepository;

	@Autowired
	private CountyRepository countyRepository;

	@Autowired
	private SightingRecordRepository sightingRecordRepository;

	@GetMapping("/county/getAll")
	public List<Map<String, Object>> getCounties() {
		List<Map<String, Object>> response = new ArrayList<>();
		for (County county : countyRepository.findAll()) {
			Map<String, Object> countyMap = new HashMap<>();
			countyMap.put("id", county.getCountyId());
			countyMap.put("name", county.getName());

			response.add(countyMap);
		}

		return response;
	}

	@PostMapping("/county/getLocations")
	public List<Map<String, Object>> getLocationFromCounty(@RequestBody Map<String, Object> postObj) {
		List<Map<String, Object>> response = new ArrayList<>();
		for (Location location : countyRepository.findByName(postObj.get("county").toString()).getLocations()) {
			Map<String, Object> locationMap = new HashMap<>();
			locationMap.put("id", location.getLocationId());
			locationMap.put("name", location.getName());
			response.add(locationMap);

		}

		return response;
	}

	@PostMapping(value = "/county/delete")
	public Map<String, String> deleteCounty(@RequestBody Map<String, Object> postObj) {
		Map<String, String> response = new HashMap<>();
		County county;

		try {
			county = countyRepository.findByCountyId((Integer) postObj.get("id"));
		} catch (NoSuchElementException | IllegalArgumentException e) {
			response.put("message", "Invalid location id.");
			return response;
		}

		for (Location location : county.getLocations()) {
			for (SightingRecord record : location.getRecords()) {
				sightingRecordRepository.delete(record);
			}
			locationRepository.delete(location);
		}
		countyRepository.delete(county);

		response.put("message", "County successfully deleted.");
		return response;
	}

	@PostMapping(value = "/county/create")
	public Map<String, String> createCounty(@RequestBody Map<String, Object> postObj) {

		Map<String, String> response = new HashMap<>();
		County county;

		try {
			county = countyRepository.findByName(postObj.get("name").toString());

		} catch (NoSuchElementException | IllegalArgumentException e) {
			response.put("message", "Some error?");
			return response;
		}
		if (county != null)
			throw new IllegalArgumentException("County with this name already exists. Please choose another one.");
		Integer lastId = countyRepository.findFirstByOrderByCountyIdDesc().getCountyId();
		County newCounty = new County(lastId + 1, postObj.get("name").toString());
		countyRepository.save(newCounty);
		response.put("message", "Location successfully created.");
		return response;
	}

}
