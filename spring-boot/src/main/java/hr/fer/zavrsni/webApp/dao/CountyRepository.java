package hr.fer.zavrsni.webApp.dao;

import java.util.UUID;

import org.springframework.data.repository.CrudRepository;

import hr.fer.zavrsni.webApp.model.County;

public interface CountyRepository extends CrudRepository<County, UUID> {
	public County findByName(String name);
	public County findByCountyId(Integer countyID);
	public County findFirstByOrderByCountyIdDesc();
}