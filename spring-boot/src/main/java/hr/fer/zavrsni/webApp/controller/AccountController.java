package hr.fer.zavrsni.webApp.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import hr.fer.zavrsni.webApp.dao.AccountRepository;
import hr.fer.zavrsni.webApp.dao.LocationRepository;
import hr.fer.zavrsni.webApp.model.Account;
import hr.fer.zavrsni.webApp.model.SightingRecord;
import net.minidev.json.JSONArray;
import net.minidev.json.JSONObject;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class AccountController {

	@Autowired
	private AccountRepository accountRepository;

	@Autowired
	private LocationRepository locationRepository;

	@GetMapping("/account/getAll")
	public List<Map<String, Object>> getAccounts() {
		List<Map<String, Object>> response = new ArrayList<>();
		for (Account account : accountRepository.findAll()) {
			Map<String, Object> accountMap = new HashMap<>();

			accountMap.put("id", account.getUserId());
			accountMap.put("username", account.getUsername());

			response.add(accountMap);

		}
		response.sort((o1, o2) -> ((String) o2.get("username")).compareTo((String) o2.get("username")));

		return response;
	}

	@GetMapping("/account/getTop3")
	public List<Map<String, Object>> getTop3Accounts() {
		List<Map<String, Object>> response = new ArrayList<>();
		List<Account> accountList = new LinkedList<>();
		for (Account account : accountRepository.findAll()) {
			accountList.add(account);
		}
		accountList.sort((o1, o2) -> o2.getRecords().size() - o1.getRecords().size());
		for (int i = 0; i < 3; i++) {
			Map<String, Object> accountMap = new HashMap<>();
			accountMap.put("username", accountList.get(i).getUsername());
			accountMap.put("recordCount", accountList.get(i).getRecords().size());
			response.add(accountMap);
		}
		return response;
	}

	@PostMapping(value = "/account/getOne")
	public Map<String, Object> getAccount(@RequestBody Map<String, Object> postObj) {
		Map<String, Object> response = new HashMap<String, Object>();
		Account account;

		try {
			account = accountRepository.findByUserId((Integer) postObj.get("id"));
		} catch (NoSuchElementException | IllegalArgumentException e) {
			response.put("message", "Invalid account id.");
			return response;
		}
		response.put("role", account.getRoleAdmin());
		response.put("username", account.getUsername());
		response.put("recordCount", account.getRecords().size());
		JSONArray recordsArr = new JSONArray();
		for (SightingRecord rec : account.getRecords()) {
			JSONObject record = new JSONObject();
			record.put("id", rec.getRecordId());
			record.put("species", rec.getSpecies().getShortenedSpeciesName());
			record.put("location", locationRepository.findByLocationId(rec.getLocationId()).getName());
			recordsArr.add(record);
		}
		response.put("records", recordsArr);
		return response;
	}

	@PostMapping(value = "/account/delete")
	public Map<String, String> deleteAccount(@RequestBody Map<String, Object> postObj) {
		Map<String, String> response = new HashMap<>();
		Account account;

		try {
			account = accountRepository.findByUserId((Integer) postObj.get("id"));
		} catch (NoSuchElementException | IllegalArgumentException e) {
			response.put("message", "Invalid account id.");
			return response;
		}

		accountRepository.delete(account);

		response.put("message", "Account successfully deleted.");
		return response;
	}

	@PostMapping(value = "/account/create")
	public Map<String, String> createAccount(@RequestBody Map<String, Object> postObj) {

		Map<String, String> response = new HashMap<>();
		Account account;

		try {
			account = accountRepository.findByUsername(postObj.get("username").toString());

		} catch (NoSuchElementException | IllegalArgumentException e) {
			response.put("message", "Some error?");
			return response;
		}
		if (account != null)
			throw new IllegalArgumentException("Account with this username already exists. Please choose another one.");
		System.out.println("HERE");
		Integer lastId = accountRepository.findFirstByOrderByUserIdDesc().getUserId();
		Account newAccount = new Account(lastId + 1, postObj.get("username").toString(),
				postObj.get("password").toString(), false);
		accountRepository.save(newAccount);
		response.put("message", "Account successfully created.");
		return response;
	}

	@PostMapping(value = "/account/createAdmin")
	public Map<String, String> createAdminAccount(@RequestBody Map<String, Object> postObj) {

		Map<String, String> response = new HashMap<>();
		Account account;

		try {
			account = accountRepository.findByUsername(postObj.get("username").toString());

		} catch (NoSuchElementException | IllegalArgumentException e) {
			response.put("message", "Some error?");
			return response;
		}
		if (account != null)
			throw new IllegalArgumentException("Account with this username already exists. Please choose another one.");
		System.out.println("HERE");
		Integer lastId = accountRepository.findFirstByOrderByUserIdDesc().getUserId();
		Account newAccount = new Account(lastId + 1, postObj.get("username").toString(),
				postObj.get("password").toString(), true);
		accountRepository.save(newAccount);
		response.put("message", "Account successfully created.");
		return response;
	}
}
