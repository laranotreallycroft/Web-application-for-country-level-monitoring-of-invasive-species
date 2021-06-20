package hr.fer.zavrsni.webApp.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import hr.fer.zavrsni.webApp.dao.AccountRepository;
import hr.fer.zavrsni.webApp.dao.LoginRequest;
import hr.fer.zavrsni.webApp.model.Account;
import hr.fer.zavrsni.webApp.service.AccountService;

@RestController
@CrossOrigin //(origins = "https://192.168.1.3:19000")
public class LoginController {

	@Autowired
	private AccountService accountService;
	
	@Autowired
	private AccountRepository accountRepository;

	@PostMapping(value = "/login")
	public Map<String, Object> authenticate(@RequestBody LoginRequest authenticationRequest)
			throws Exception {
		final UserDetails userDetails = accountService.loadUserByUsername(authenticationRequest.getUsername());
		if (userDetails.getPassword().equals(authenticationRequest.getPassword())) {
			Map<String, Object> map= new HashMap<String, Object>();
			Account account= accountRepository.findByUsername(authenticationRequest.getUsername());
			map.put("id", account.getUserId());
			map.put("role", account.getRoleAdmin());
			return map;
		}

		throw new BadCredentialsException ("Wrong password");
		
	}



}