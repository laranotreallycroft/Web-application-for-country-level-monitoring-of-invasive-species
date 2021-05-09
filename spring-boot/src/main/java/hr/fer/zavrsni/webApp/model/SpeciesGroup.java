package hr.fer.zavrsni.webApp.model;

import java.io.Serializable;
import javax.persistence.*;
import java.util.List;


/**
 * The persistent class for the species_group database table.
 * 
 */
@Entity
@Table(name="species_group")
@NamedQuery(name="SpeciesGroup.findAll", query="SELECT s FROM SpeciesGroup s")
public class SpeciesGroup implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name="species_group_id")
	private Integer speciesGroupId;

	@Column(name="species_group_name")
	private String speciesGroupName;

	//bi-directional many-to-one association to Species
	@OneToMany(mappedBy="speciesGroup")
	private List<Species> species;

	public SpeciesGroup() {
	}

	public Integer getSpeciesGroupId() {
		return this.speciesGroupId;
	}

	public void setSpeciesGroupId(Integer speciesGroupId) {
		this.speciesGroupId = speciesGroupId;
	}

	public String getSpeciesGroupName() {
		return this.speciesGroupName;
	}

	public void setSpeciesGroupName(String speciesGroupName) {
		this.speciesGroupName = speciesGroupName;
	}

	public List<Species> getSpecies() {
		return this.species;
	}

	

}