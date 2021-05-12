package hr.fer.zavrsni.webApp.dao;

import java.util.UUID;

import org.springframework.data.repository.CrudRepository;

import hr.fer.zavrsni.webApp.model.Account;

public interface AccountRepository extends CrudRepository<Account, UUID> {
	public Account findByUsername(String username);
	public Account findByUserId(Integer userId);
	public Account findFirstByOrderByUserIdDesc();
}