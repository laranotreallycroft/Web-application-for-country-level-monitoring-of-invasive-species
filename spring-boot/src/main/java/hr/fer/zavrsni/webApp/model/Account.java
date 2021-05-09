package hr.fer.zavrsni.webApp.model;

import java.io.Serializable;
import javax.persistence.*;
import java.util.List;


/**
 * The persistent class for the account database table.
 * 
 */
@Entity
@NamedQuery(name="Account.findAll", query="SELECT a FROM Account a")
public class Account implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name="user_id")
	private Integer userId;

	private String password;

	private String username;

	//bi-directional many-to-one association to Record
	@OneToMany(mappedBy="account")
	private List<SightingRecord> records;

	public Account() {
	}

	public Integer getUserId() {
		return this.userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public String getPassword() {
		return this.password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getUsername() {
		return this.username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public List<SightingRecord> getRecords() {
		return this.records;
	}

	public void setRecords(List<SightingRecord> records) {
		this.records = records;
	}



}