package hr.fer.zavrsni.webApp.model;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.ObjectOutputStream;
import java.io.Serializable;
import javax.persistence.*;

import java.util.Base64;
import java.util.List;

/**
 * The persistent class for the species database table.
 * 
 */
@Entity
@Table(name = "species")
@NamedQuery(name = "Species.findAll", query = "SELECT s FROM Species s")
public class Species implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name = "species_id")
	private Integer speciesId;

	@Column(name = "species_name")
	private String speciesName;

	// bi-directional many-to-one association to SpeciesGroup
	@ManyToOne
	@JoinColumn(name = "species_group_id")
	private SpeciesGroup speciesGroup;

	private String description;

	private byte[] photograph;

	// bi-directional many-to-one association to Record
	@OneToMany(mappedBy = "species")
	private List<SightingRecord> records;

	public Species() {

	}

	public Species(Integer speciesId, String speciesName, SpeciesGroup speciesGroup, String description,
			Object photograph) {
		this.speciesId = speciesId;
		this.speciesName = speciesName;
		this.speciesGroup = speciesGroup;
		this.description = description;

		try {
			this.photograph = Base64.getDecoder().decode(photograph.toString().getBytes("UTF-8"));

		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}

	public Integer getSpeciesId() {
		return this.speciesId;
	}

	public void setSpeciesId(Integer speciesId) {
		this.speciesId = speciesId;
	}

	public String getDescription() {
		return this.description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public byte[] getPhotograph() {
		return this.photograph;
	}

	public void setPhotograph(byte[] photograph) {
		this.photograph = photograph;
	}

	public String getSpeciesName() {
		return this.speciesName;
	}

	public String getShortenedSpeciesName() {
		return this.speciesName.split(" ")[0] + " " + this.speciesName.split(" ")[1];
	}

	public void setSpeciesName(String speciesName) {
		this.speciesName = speciesName;
	}

	public List<SightingRecord> getRecords() {
		return this.records;
	}

	public SpeciesGroup getSpeciesGroup() {
		return this.speciesGroup;
	}

	public void setSpeciesGroup(SpeciesGroup speciesGroup) {
		this.speciesGroup = speciesGroup;
	}

}