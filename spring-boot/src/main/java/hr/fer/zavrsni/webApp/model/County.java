package hr.fer.zavrsni.webApp.model;

import java.io.Serializable;
import javax.persistence.*;
import java.util.List;

/**
 * The persistent class for the county database table.
 * 
 */
@Entity
@NamedQuery(name = "County.findAll", query = "SELECT c FROM County c")
public class County implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name = "county_id")
	private Integer countyId;

	private String name;

	// bi-directional many-to-one association to Location
	@OneToMany(mappedBy = "county")
	private List<Location> locations;

	public County() {
	}

	public County(Integer countyId, String name) {
		this.countyId = countyId;
		this.name = name;
	}

	public Integer getCountyId() {
		return this.countyId;
	}

	public void setCountyId(Integer countyId) {
		this.countyId = countyId;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public List<Location> getLocations() {
		return this.locations;
	}

	public void setLocations(List<Location> locations) {
		this.locations = locations;
	}

}