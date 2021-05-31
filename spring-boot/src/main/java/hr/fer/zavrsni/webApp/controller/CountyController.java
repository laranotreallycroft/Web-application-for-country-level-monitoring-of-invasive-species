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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import hr.fer.zavrsni.webApp.dao.CountyRepository;
import hr.fer.zavrsni.webApp.dao.LocationRepository;
import hr.fer.zavrsni.webApp.model.County;
import hr.fer.zavrsni.webApp.model.Location;
import hr.fer.zavrsni.webApp.model.SpeciesGroup;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class CountyController {

	@Autowired
	private LocationRepository locationRepository;

	@Autowired
	private CountyRepository countyRepository;

	@GetMapping("/county/getAll")
	public List<Map<String, String>> getCounties() {
		List<Map<String, String>> response = new ArrayList<>();
		for (County county : countyRepository.findAll()) {
			Map<String, String> countyMap = new HashMap<>();
			countyMap.put("id", Integer.toString(county.getCountyId()));
			countyMap.put("name", county.getName());

			response.add(countyMap);
		}

		return response;
	}

	@PostMapping("/county/getLocations")
	public List<Map<String, String>> getLocationFromCounty(@RequestBody Map<String, Object> postObj) {
		List<Map<String, String>> response = new ArrayList<>();
		for (Location location : countyRepository.findByName(postObj.get("county").toString()).getLocations()) {
			Map<String, String> locationMap = new HashMap<>();
			locationMap.put("id", Integer.toString(location.getLocationId()));
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
			county = countyRepository.findByCountyId(Integer.parseInt(postObj.get("id").toString()));
		} catch (NoSuchElementException | IllegalArgumentException e) {
			response.put("message", "Invalid location id.");
			return response;
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
