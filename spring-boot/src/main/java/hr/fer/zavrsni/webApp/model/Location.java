package hr.fer.zavrsni.webApp.model;

import java.io.Serializable;
import javax.persistence.*;
import java.util.List;


/**
 * The persistent class for the location database table.
 * 
 */
@Entity
@NamedQuery(name="Location.findAll", query="SELECT l FROM Location l")
public class Location implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name="location_id")
	private Integer locationId;

	private String county;

	private String name;

	//bi-directional many-to-one association to Record
	@OneToMany(mappedBy="location")
	private List<SightingRecord> records;

	public Location() {
	}

	public Location(String name, String county) {
		this.name=name;
		this.county=county;
	//	this.locationId=;
	}

	public Integer getLocationId() {
		return this.locationId;
	}

	public void setLocationId(Integer locationId) {
		this.locationId = locationId;
	}

	public String getCounty() {
		return this.county;
	}

	public void setCounty(String county) {
		this.county = county;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public List<SightingRecord> getRecords() {
		return this.records;
	}


}