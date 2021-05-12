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

import hr.fer.zavrsni.webApp.dao.SpeciesGroupRepository;
import hr.fer.zavrsni.webApp.model.Species;
import hr.fer.zavrsni.webApp.model.SpeciesGroup;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class SpeciesGroupController {

	@Autowired
	private SpeciesGroupRepository speciesGroupRepository;

	@GetMapping("/speciesGroup/getAll")
	public List<Map<String, String>> getSpeciesGroups() {
		List<Map<String, String>> response = new ArrayList<>();
		for (SpeciesGroup speciesGroup : speciesGroupRepository.findAll()) {
			Map<String, String> speciesGroupMap = new HashMap<>();
			speciesGroupMap.put("id", Integer.toString(speciesGroup.getSpeciesGroupId()));
			speciesGroupMap.put("name", speciesGroup.getSpeciesGroupName());

			response.add(speciesGroupMap);
		}

		return response;
	}
	
	@PostMapping(value = "/speciesGroup/delete")
	public Map<String, String> deleteSpecies(@RequestBody Map<String, Object> postObj) {
		Map<String, String> response = new HashMap<>();
		SpeciesGroup species;

		try {
			species = speciesGroupRepository.findBySpeciesGroupId(Integer.parseInt(postObj.get("id").toString()));
		} catch (NoSuchElementException | IllegalArgumentException e) {
			response.put("message", "Invalid species group id.");
			return response;
		}

		speciesGroupRepository.delete(species);

		response.put("message", "Species group successfully deleted.");
		return response;
	}
}