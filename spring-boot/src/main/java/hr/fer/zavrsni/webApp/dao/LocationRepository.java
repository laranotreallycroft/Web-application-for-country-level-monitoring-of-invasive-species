package hr.fer.zavrsni.webApp.dao;

import java.util.UUID;

import org.springframework.data.repository.CrudRepository;

import hr.fer.zavrsni.webApp.model.Location;

public interface LocationRepository extends CrudRepository<Location, UUID> {
	public Location findByName(String username);
	public Location findByLocationId(Integer locationID);
}