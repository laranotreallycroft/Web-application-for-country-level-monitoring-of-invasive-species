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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import hr.fer.zavrsni.webApp.dao.LocationRepository;
import hr.fer.zavrsni.webApp.dao.SightingRecordRepository;
import hr.fer.zavrsni.webApp.model.Location;
import hr.fer.zavrsni.webApp.model.SightingRecord;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class RecordController {

	@Autowired
	private SightingRecordRepository sightingRecordRepository;

	@GetMapping("/record/getAll")
	public List<Map<String, String>> getRecords() {
		List<Map<String, String>> response = new ArrayList<>();
		for (SightingRecord record : sightingRecordRepository.findAll()) {
			Map<String, String> recordMap = new HashMap<>();
			recordMap.put("id", Integer.toString(record.getRecordId()));
			recordMap.put("description", record.getDescription());
			recordMap.put("coordinates",
					record.getLocationCoordinates() == null ? null : record.getLocationCoordinates().toString());
			recordMap.put("locationDescription", record.getLocationDescription());
			recordMap.put("location", record.getLocationId().toString());
			recordMap.put("speciesId", record.getSpecies().getSpeciesId().toString());
			recordMap.put("userId", record.getUser() == null ? null : record.getUser().getUserId().toString());

			response.add(recordMap);
		}

		return response;
	}
	/*
	 * @RequestMapping(value = "/location/delete", method = RequestMethod.POST)
	 * public Map<String, String> deleteLocation(@RequestParam("id") Integer id) {
	 * Map<String, String> response = new HashMap<>(); Location location;
	 * 
	 * try { location = locationRepository.findByLocationId(id); } catch
	 * (NoSuchElementException | IllegalArgumentException e) {
	 * response.put("message", "Ne postoji lokacija sa zadanim id-om."); return
	 * response; }
	 * 
	 * locationRepository.delete(location);
	 * 
	 * response.put("message", "Lokacija uspješno izbrisana."); return response; }
	 * 
	 * @PostMapping("/location/insert") public Map<String, String>
	 * addLocation(@RequestParam("name") String name, @RequestParam("county") String
	 * county) { Map<String, String> response = new HashMap<>();
	 * 
	 * Location location = locationRepository.findByName(name); if (location != null
	 * && location.getCounty().equals(county)) { response.put("message",
	 * "Već postoji ovo mjesto!"); return response; }
	 * 
	 * try { location = new Location(name, county);
	 * locationRepository.save(location); } catch (Exception e) {
	 * response.put("message", "Uneseni podatci nisu ispravni!"); return response; }
	 * 
	 * response.put("message", "Mjesto uspješno dodano!");
	 * 
	 * return response; }
	 * 
	 * @PostMapping("/location/edit") public Map<String, String>
	 * editLocation(@RequestParam("id") Integer id,@RequestParam("name") String
	 * name,@RequestParam("county") String county) { Map<String, String> response =
	 * new HashMap<>();
	 * 
	 * Location location;
	 * 
	 * try { location = locationRepository.findByLocationId(id); } catch
	 * (NoSuchElementException | IllegalArgumentException ex) {
	 * response.put("message", "Ne postoji mjesto sa predanim imenom");
	 * 
	 * return response; }
	 * 
	 * try { location.setName(name); location.setCounty(county);
	 * locationRepository.save(location); } catch (Exception e) {
	 * response.put("message", "Promijenjeni podatci nisu ispravni!"); return
	 * response; }
	 * 
	 * response.put("message", "Mjesto uspješno izmjenjeno!");
	 * 
	 * return response; }
	 */
}
