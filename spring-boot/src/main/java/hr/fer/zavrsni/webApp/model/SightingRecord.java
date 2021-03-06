package hr.fer.zavrsni.webApp.model;

import java.io.IOException;
import java.io.Serializable;
import java.util.Base64;

import javax.persistence.*;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.locationtech.jts.geom.Point;

/**
 * The persistent class for the record database table.
 * 
 */
@Entity
@Table(name = "sighting_record")
@NamedQuery(name = "SightingRecord.findAll", query = "SELECT r FROM SightingRecord r")
public class SightingRecord implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name = "record_id")
	private Integer recordId;

	private String description;

	@Column(name = "location_coordinates", columnDefinition = "Point")
	private Point locationCoordinates;

	@Column(name = "location_description")
	private String locationDescription;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "location_id")
	@OnDelete(action = OnDeleteAction.CASCADE)
	private Location location;

	private byte[] photograph;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "species_id")
	@OnDelete(action = OnDeleteAction.CASCADE)
	private Species species;

	@ManyToOne
	@JoinColumn(name = "user_id")
	@OnDelete(action = OnDeleteAction.CASCADE)
	private Account account;

	public SightingRecord() {
	}

	public SightingRecord(int recordId, String description, Point locationCoordinates, String locationDescription,
			Location location, Object photograph, Species species,Account account) {
		this.recordId=recordId;
		this.description=description;
		this.locationCoordinates=locationCoordinates;
		this.locationDescription=locationDescription;
		this.location=location;
		this.species=species;
		this.account=account;
		
		if(photograph!=null)
		try {
			this.photograph = Base64.getDecoder().decode(photograph.toString().getBytes("UTF-8"));

		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	public Integer getRecordId() {
		return this.recordId;
	}

	public void setRecordId(Integer recordId) {
		this.recordId = recordId;
	}

	public String getDescription() {
		return this.description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Point getLocationCoordinates() {
		return this.locationCoordinates;
	}

	public void setLocationCoordinates(Point locationCoordinates) {
		this.locationCoordinates = locationCoordinates;
	}

	public String getLocationDescription() {
		return this.locationDescription;
	}

	public void setLocationDescription(String locationDescription) {
		this.locationDescription = locationDescription;
	}

	public Integer getLocationId() {
		return this.location.getLocationId();
	}

	public void setLocationId(Integer locationId) {
		this.location.setLocationId(locationId);
	}

	public byte[] getPhotograph() {
		return this.photograph;
	}

	public void setPhotograph(byte[] photograph) {
		this.photograph = photograph;
	}

	public Species getSpecies() {
		return this.species;
	}

	public void setSpecies(Species species) {
		this.species = species;
	}

	public Account getUser() {
		return this.account;
	}

	public void setAccount(Account account) {
		this.account = account;
	}

}