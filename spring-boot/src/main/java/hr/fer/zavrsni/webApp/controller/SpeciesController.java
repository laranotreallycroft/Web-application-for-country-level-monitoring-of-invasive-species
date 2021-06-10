package hr.fer.zavrsni.webApp.controller;

import java.util.ArrayList;
import java.util.Base64;
import java.util.HashMap;
import java.util.LinkedList;
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
import net.minidev.json.JSONArray;
import net.minidev.json.JSONObject;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class SpeciesController {

	@Autowired
	private SpeciesRepository speciesRepository;

	@Autowired
	private SpeciesGroupRepository speciesGroupRepository;

	@GetMapping("/species/getAll")
	public List<Map<String, String>> getAllSpecies() {
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

	@GetMapping("/species/getTop50")
	public List<JSONArray> getTop50Species() {
		List<JSONArray> response = new ArrayList<>();
		List<Species> plantaeList = new LinkedList<>();
		List<Species> animaliaList = new LinkedList<>();
		List<Species> chromistaList = new LinkedList<>();
		plantaeList = speciesGroupRepository.findBySpeciesGroupId(1).getSpecies();
		animaliaList = speciesGroupRepository.findBySpeciesGroupId(2).getSpecies();
		chromistaList = speciesGroupRepository.findBySpeciesGroupId(3).getSpecies();
		plantaeList.sort((o1, o2) -> o2.getRecords().size() - o1.getRecords().size());
		animaliaList.sort((o1, o2) -> o2.getRecords().size() - o1.getRecords().size());
		chromistaList.sort((o1, o2) -> o2.getRecords().size() - o1.getRecords().size());
		JSONArray plantaeJsonArary = new JSONArray();
		JSONArray animaliaJsonArary = new JSONArray();
		JSONArray chromistaJsonArary = new JSONArray();
		for (int i = 0; i < 50; i++) {

			if (plantaeList.size() > i && plantaeList.get(i).getRecords().size() > 0) {
				JSONObject plantaeJson = new JSONObject();
				String shortenedName = plantaeList.get(i).getSpeciesName().split(" ")[0] + " "
						+ plantaeList.get(i).getSpeciesName().split(" ")[1];
				plantaeJson.put("name", shortenedName);
				plantaeJson.put("count", Integer.toString(plantaeList.get(i).getRecords().size()));
				plantaeJsonArary.add(plantaeJson);

			}
			if (animaliaList.size() > i && animaliaList.get(i).getRecords().size() > 0) {
				JSONObject animaliaJson = new JSONObject();
				String shortenedName = animaliaList.get(i).getSpeciesName().split(" ")[0] + " "
						+ animaliaList.get(i).getSpeciesName().split(" ")[1];
				animaliaJson.put("name", shortenedName);
				animaliaJson.put("count", Integer.toString(animaliaList.get(i).getRecords().size()));
				animaliaJsonArary.add(animaliaJson);
			} 
			if (chromistaList.size() > i && chromistaList.get(i).getRecords().size() > 0) {
				JSONObject chromistaJson = new JSONObject();
				String shortenedName = chromistaList.get(i).getSpeciesName().split(" ")[0] + " "
						+ chromistaList.get(i).getSpeciesName().split(" ")[1];
				chromistaJson.put("name", shortenedName);
				chromistaJson.put("count", Integer.toString(chromistaList.get(i).getRecords().size()));
				chromistaJsonArary.add(chromistaJson);
			}

		}
		response.add(plantaeJsonArary);
		response.add(animaliaJsonArary);
		response.add(chromistaJsonArary);
		return response;
	}

	@PostMapping(value = "/species/getOne")
	public Map<String, Object> getSpecies(@RequestBody Map<String, Object> postObj) {
		Map<String, Object> response = new HashMap<String, Object>();
		Species species;

		try {
			species = speciesRepository.findBySpeciesId(Integer.parseInt(postObj.get("id").toString()));
		} catch (NoSuchElementException | IllegalArgumentException e) {
			response.put("message", "Invalid account id.");
			return response;
		}

		response.put("id", Integer.toString(species.getSpeciesId()));
		response.put("name", species.getSpeciesName());
		response.put("description", species.getDescription());
		byte[] base64 = Base64.getEncoder().encode(species.getPhotograph());
		response.put("photograph", new String(base64));
		response.put("recordCount", species.getRecords().size());

		return response;
	}

	public static String byteArrayToHex(byte[] a) {
		StringBuilder sb = new StringBuilder(a.length * 2);
		for (byte b : a)
			sb.append(String.format("%02x", b));
		return sb.toString();
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
				postObj.get("description").toString(), postObj.get("photograph"));
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
