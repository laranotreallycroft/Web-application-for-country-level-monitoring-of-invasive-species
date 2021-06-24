package hr.fer.zavrsni.webApp.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import hr.fer.zavrsni.webApp.dao.AccountRepository;
import hr.fer.zavrsni.webApp.model.Account;

@RestController
@CrossOrigin //(origins = "https://192.168.1.3:19000")
public class LoginController {

	
	@Autowired
	private AccountRepository accountRepository;

	@PostMapping(value = "/login")
	public Map<String, Object> authenticate(@RequestBody Map<String, Object> postObj)
			throws Exception {
		String username=postObj.get("username").toString();
		String password=postObj.get("password").toString();
		Account account=accountRepository.findByUsername(username);
		
		if (account!=null&&account.getPassword().equals(password)) {
			Map<String, Object> map= new HashMap<String, Object>();
			map.put("id", account.getUserId());
			map.put("role", account.getRoleAdmin());
			return map;
		}

		throw new BadCredentialsException ("Wrong password");
		
	}



}