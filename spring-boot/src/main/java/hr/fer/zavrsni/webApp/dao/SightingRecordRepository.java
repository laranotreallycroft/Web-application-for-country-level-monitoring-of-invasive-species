package hr.fer.zavrsni.webApp.dao;

import java.util.UUID;

import org.springframework.data.repository.CrudRepository;

import hr.fer.zavrsni.webApp.model.SightingRecord;

public interface SightingRecordRepository extends CrudRepository<SightingRecord, UUID> {
	public SightingRecord findByRecordId(String recordId);
}