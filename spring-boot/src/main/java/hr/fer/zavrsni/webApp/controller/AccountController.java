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
import org.springframework.web.bind.annotation.ResponseBody;
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
}
