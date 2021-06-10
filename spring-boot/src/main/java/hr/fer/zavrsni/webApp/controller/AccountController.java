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
import hr.fer.zavrsni.webApp.model.Account;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class AccountController {

	@Autowired
	private AccountRepository accountRepository;

	@GetMapping("/account/getAll")
	public List<Map<String, String>> getAccounts() {
		List<Map<String, String>> response = new ArrayList<>();
		for (Account account : accountRepository.findAll()) {
			Map<String, String> accountMap = new HashMap<>();

			accountMap.put("id", Integer.toString(account.getUserId()));
			accountMap.put("username", account.getUsername());
			accountMap.put("recordCount", Integer.toString(account.getRecords().size()));

			response.add(accountMap);

		}

		return response;
	}

	@GetMapping("/account/getTop3")
	public List<Map<String, String>> getTop3Accounts() {
		List<Map<String, String>> response = new ArrayList<>();
		List<Account> accountList = new LinkedList<>();
		for (Account account : accountRepository.findAll()) {
			accountList.add(account);
		}
		accountList.sort((o1, o2) ->  o2.getRecords().size()-o1.getRecords().size());
		for (int i = 0; i < 3; i++) {
			Map<String, String> accountMap = new HashMap<>();
			accountMap.put("username", accountList.get(i).getUsername());
			accountMap.put("recordCount", Integer.toString(accountList.get(i).getRecords().size()));
			response.add(accountMap);
		}
		return response;
	}

	@PostMapping(value = "/account/getOne")
	public Map<String, String> getAccount(@RequestBody Map<String, Object> postObj) {
		Map<String, String> response = new HashMap<String, String>();
		Account account;

		try {
			account = accountRepository.findByUserId(Integer.parseInt(postObj.get("id").toString()));
		} catch (NoSuchElementException | IllegalArgumentException e) {
			response.put("message", "Invalid account id.");
			return response;
		}

		response.put("id", Integer.toString(account.getUserId()));
		response.put("username", account.getUsername());
		response.put("recordCount", Integer.toString(account.getRecords().size()));

		return response;
	}

	@PostMapping(value = "/account/delete")
	public Map<String, String> deleteAccount(@RequestBody Map<String, Object> postObj) {
		Map<String, String> response = new HashMap<>();
		Account account;

		try {
			account = accountRepository.findByUserId(Integer.parseInt(postObj.get("id").toString()));
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
				postObj.get("password").toString());
		accountRepository.save(newAccount);
		response.put("message", "Account successfully created.");
		return response;
	}
}
