package hr.fer.zavrsni.webApp.dao;

import java.util.UUID;

import org.springframework.data.repository.CrudRepository;

import hr.fer.zavrsni.webApp.model.Species;

public interface SpeciesRepository extends CrudRepository<Species, UUID> {
	public Species findBySpeciesName(String speciesName);
	public Species findBySpeciesId(Integer speciesId);
	public Species findFirstByOrderBySpeciesIdDesc();
}