/*package hr.fer.zavrsni.webApp.controller;


import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import hr.fer.zavrsni.webApp.dao.SpeciesRepository;
import hr.fer.zavrsni.webApp.model.Species;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class SpeciesController {

	@Autowired
	private SpeciesRepository speciesRepository;

	@GetMapping("/species")
	public List<Map<String, String>> getspecies() {
		List<Map<String, String>> response = new ArrayList<>();
		for (Species species : speciesRepository.findAll()) {
			Map<String, String> speciesMap = new HashMap<>();
			speciesMap.put("id", Integer.toString(species.getSpeciesId()));
			speciesMap.put("name", species.getSpeciesName());
			speciesMap.put("description", species.getDescription());
			speciesMap.put("speciesGroupName", species.getSpeciesGroup().getSpeciesGroupName());

			response.add(speciesMap);
		}

		return response;
	}

	@RequestMapping(value = "/species/delete", method = RequestMethod.POST)
	public Map<String, String> deleteSpecies(@RequestParam("id") UUID id) {
		Map<String, String> response = new HashMap<>();
		Species species;

		try {
			species = speciesRepository.findById(id).orElseThrow();
		} catch (NoSuchElementException | IllegalArgumentException e) {
			response.put("message", "Ne postoji volonter sa zadanim id-om.");
			return response;
		}

		speciesRepository.delete(species);

		response.put("message", "Volonter uspješno izbrisan.");
		return response;
	}

	@PostMapping("/species/insert")
	public Map<String, String> addSpecies(@RequestParam("name") String name, @RequestParam("groupName") String groupName) {
		Map<String, String> response = new HashMap<>();

		if (speciesRepository.findBySpeciesName(name) != null) {
			response.put("message", "Već postoji mjesto sa upisanim imenom!");

			return response;
		}

		try {
		//	Species species = new Species(name, groupName);
		//	speciesRepository.save(species);
		} catch (Exception e) {
			response.put("message", "Uneseni podatci nisu ispravni!");
			return response;
		}

		response.put("message", "Mjesto uspješno dodano!");

		return response;
	}

	@PostMapping("/species/edit")
	public Map<String, String> editSpecies(@RequestParam("id") UUID id) {
		Map<String, String> response = new HashMap<>();

		Optional<Species> species;

		try {
			species = speciesRepository.findById(id);
		} catch (NoSuchElementException | IllegalArgumentException ex) {
			response.put("message", "Ne postoji mjesto sa predanim imenom");

			return response;
		}

		try {
		//	species.setName(name);
		//	species.setCounty(county);
		//	speciesRepository.save(species);
		} catch (Exception e) {
			response.put("message", "Promijenjeni podatci nisu ispravni!");
			return response;
		}

		response.put("message", "Mjesto uspješno izmjenjeno!");

		return response;
	}
}
*/