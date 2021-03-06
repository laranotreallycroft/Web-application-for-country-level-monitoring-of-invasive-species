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

	@ManyToOne
	@JoinColumn(name = "county_id")
	private County county;

	private String name;

	//bi-directional many-to-one association to Record
	@OneToMany(mappedBy="location")
	private List<SightingRecord> records;

	public Location() {
	}

	public Location(int locationId,String name, County county) {
		this.locationId=locationId;
		this.name=name;
		this.county=county;
	
	}

	public Integer getLocationId() {
		return this.locationId;
	}

	public void setLocationId(Integer locationId) {
		this.locationId = locationId;
	}

	public County getCounty() {
		return this.county;
	}

	public void setCounty(County county) {
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