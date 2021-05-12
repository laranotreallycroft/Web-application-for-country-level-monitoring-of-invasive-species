package hr.fer.zavrsni.webApp.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import hr.fer.zavrsni.webApp.dao.AccountRepository;
import hr.fer.zavrsni.webApp.model.Account;

@Service
public class AccountService implements UserDetailsService {


	@Autowired
	private AccountRepository accountRepository;


	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		System.out.println("Username is " + username);
		Account account = null;
		String password = null;
		List<String> roleNames = new ArrayList<String>();

		account = this.accountRepository.findByUsername(username);
		if (account == null) {
			
					System.out.println("User not found! ");
					throw new UsernameNotFoundException("User " + username + " was not found in the database");
				}else
				roleNames.add("ROLE_KORISNIK");
			

		

		if (account != null) password = account.getPassword();

		List<GrantedAuthority> grantList = new ArrayList<GrantedAuthority>();
		if (roleNames != null) {
			for (String role : roleNames) {
				// ROLE_USER, ROLE_ADMIN,..
				GrantedAuthority authority = new SimpleGrantedAuthority(role);
				grantList.add(authority);
			}
		}
	
		System.out.println("Set grantList");
		UserDetails userDetails = (UserDetails) new User(username, password, grantList);
		System.out.println("Set userDetails");
		return userDetails;
	}

}