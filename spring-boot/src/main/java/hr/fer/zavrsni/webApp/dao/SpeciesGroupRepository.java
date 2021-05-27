package hr.fer.zavrsni.webApp.dao;

import java.util.UUID;

import org.springframework.data.repository.CrudRepository;

import hr.fer.zavrsni.webApp.model.Species;
import hr.fer.zavrsni.webApp.model.SpeciesGroup;

public interface SpeciesGroupRepository extends CrudRepository<SpeciesGroup, UUID> {
	public SpeciesGroup findBySpeciesGroupName(String speciesGroupName);
	public SpeciesGroup findBySpeciesGroupId(Integer speciesGroupId);
	public SpeciesGroup findFirstByOrderBySpeciesGroupIdDesc();
}