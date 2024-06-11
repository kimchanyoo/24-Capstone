package com.teami.capstone.Repository;

import com.teami.capstone.Entity.CertificationEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface CertificationRepository extends JpaRepository<CertificationEntity, String> {

	CertificationEntity findByEmail(String email);

	@Transactional
	void deleteByEmail(String email);

}
