package hr.fer.zavrsni.webApp.controller;

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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import hr.fer.zavrsni.webApp.dao.SpeciesGroupRepository;
import hr.fer.zavrsni.webApp.dao.SpeciesRepository;
import hr.fer.zavrsni.webApp.model.Account;
import hr.fer.zavrsni.webApp.model.Species;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class SpeciesController {

	@Autowired
	private SpeciesRepository speciesRepository;

	@Autowired
	private SpeciesGroupRepository speciesGroupRepository;

	@GetMapping("/species/getAll")
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

	@PostMapping(value = "/species/delete")
	public Map<String, String> deleteSpecies(@RequestBody Map<String, Object> postObj) {
		Map<String, String> response = new HashMap<>();
		Species species;

		try {
			species = speciesRepository.findBySpeciesId(Integer.parseInt(postObj.get("id").toString()));
		} catch (NoSuchElementException | IllegalArgumentException e) {
			response.put("message", "Invalid species id.");
			return response;
		}

		speciesRepository.delete(species);

		response.put("message", "Species successfully deleted.");
		return response;
	}

	@PostMapping(value = "/species/create")
	public Map<String, String> createSpecies(@RequestBody Map<String, Object> postObj) {

		Map<String, String> response = new HashMap<>();
		Species species;

		try {
			species = speciesRepository.findBySpeciesName(postObj.get("speciesName").toString());

		} catch (NoSuchElementException | IllegalArgumentException e) {
			response.put("message", "Some error?");
			return response;
		}
		if (species != null)
			throw new IllegalArgumentException("Species with this name already exists. Please choose another one.");
		Integer lastId = speciesRepository.findFirstByOrderBySpeciesIdDesc().getSpeciesId();
		Species newSpecies = new Species(lastId + 1, postObj.get("speciesName").toString(),
				speciesGroupRepository.findBySpeciesGroupName(postObj.get("speciesGroup").toString()),
				postObj.get("description").toString(),postObj.get("photograph"));
		speciesRepository.save(newSpecies);
		response.put("message", "Species successfully created.");
		return response;
	}
	/*
	 * 
	 * @PostMapping("/species/edit") public Map<String, String>
	 * editSpecies(@RequestParam("id") UUID id) { Map<String, String> response = new
	 * HashMap<>();
	 * 
	 * Optional<Species> species;
	 * 
	 * try { species = speciesRepository.findById(id); } catch
	 * (NoSuchElementException | IllegalArgumentException ex) {
	 * response.put("message", "Ne postoji mjesto sa predanim imenom");
	 * 
	 * return response; }
	 * 
	 * try { // species.setName(name); // species.setCounty(county); //
	 * speciesRepository.save(species); } catch (Exception e) {
	 * response.put("message", "Promijenjeni podatci nisu ispravni!"); return
	 * response; }
	 * 
	 * response.put("message", "Mjesto uspješno izmjenjeno!");
	 * 
	 * return response; }
	 */
}
