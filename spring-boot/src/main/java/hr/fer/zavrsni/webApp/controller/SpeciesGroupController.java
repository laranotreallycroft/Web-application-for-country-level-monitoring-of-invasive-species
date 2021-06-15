package hr.fer.zavrsni.webApp.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import hr.fer.zavrsni.webApp.dao.SightingRecordRepository;
import hr.fer.zavrsni.webApp.dao.SpeciesGroupRepository;
import hr.fer.zavrsni.webApp.dao.SpeciesRepository;
import hr.fer.zavrsni.webApp.model.SightingRecord;
import hr.fer.zavrsni.webApp.model.Species;
import hr.fer.zavrsni.webApp.model.SpeciesGroup;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class SpeciesGroupController {

	@Autowired
	private SpeciesGroupRepository speciesGroupRepository;

	@Autowired
	private SpeciesRepository speciesRepository;

	@Autowired
	private SightingRecordRepository sightingRecordRepository;

	@GetMapping("/speciesGroup/getAll")
	public List<Map<String, Object>> getSpeciesGroups() {
		List<Map<String, Object>> response = new ArrayList<>();
		for (SpeciesGroup speciesGroup : speciesGroupRepository.findAll()) {
			Map<String, Object> speciesGroupMap = new HashMap<>();
			speciesGroupMap.put("id", speciesGroup.getSpeciesGroupId());
			speciesGroupMap.put("name", speciesGroup.getSpeciesGroupName());

			response.add(speciesGroupMap);
		}

		return response;
	}

	@PostMapping(value = "/speciesGroup/getSpecies")
	public List<Map<String, Object>> getSpecies(@RequestBody Map<String, Object> postObj) {
		List<Map<String, Object>> response = new ArrayList<>();
		SpeciesGroup speciesGroup;

		try {
			speciesGroup = speciesGroupRepository.findBySpeciesGroupName(postObj.get("speciesGroup").toString());
		} catch (NoSuchElementException | IllegalArgumentException e) {
			return response;
		}

		for (Species species : speciesGroup.getSpecies()) {
			Map<String, Object> speciesMap = new HashMap<>();
			speciesMap.put("id", species.getSpeciesId());
			speciesMap.put("name", species.getSpeciesName());

			response.add(speciesMap);
		}

		return response;
	}

	@PostMapping(value = "/speciesGroup/delete")
	public Map<String, String> deleteSpecies(@RequestBody Map<String, Object> postObj) {
		Map<String, String> response = new HashMap<>();
		SpeciesGroup speciesGroup;

		try {
			speciesGroup = speciesGroupRepository.findBySpeciesGroupId((Integer) postObj.get("id"));
		} catch (NoSuchElementException | IllegalArgumentException e) {
			response.put("message", "Invalid species group id.");
			return response;
		}

		for (Species species : speciesGroup.getSpecies()) {
			for (SightingRecord record : species.getRecords()) {
				sightingRecordRepository.delete(record);
			}
			speciesRepository.delete(species);
		}
		speciesGroupRepository.delete(speciesGroup);

		response.put("message", "Species group successfully deleted.");
		return response;
	}

	@PostMapping(value = "/speciesGroup/create")
	public Map<String, String> createSpeciesGroup(@RequestBody Map<String, Object> postObj) {

		Map<String, String> response = new HashMap<>();
		SpeciesGroup speciesGroup;

		try {
			speciesGroup = speciesGroupRepository.findBySpeciesGroupName(postObj.get("speciesGroupName").toString());

		} catch (NoSuchElementException | IllegalArgumentException e) {
			response.put("message", "Some error?");
			return response;
		}
		if (speciesGroup != null)
			throw new IllegalArgumentException(
					"Species group with this name already exists. Please choose another one.");
		Integer lastId = speciesGroupRepository.findFirstByOrderBySpeciesGroupIdDesc().getSpeciesGroupId();
		SpeciesGroup newSpeciesGroup = new SpeciesGroup(lastId + 1, postObj.get("speciesGroupName").toString());
		speciesGroupRepository.save(newSpeciesGroup);
		response.put("message", "Species group successfully created.");
		return response;
	}
}