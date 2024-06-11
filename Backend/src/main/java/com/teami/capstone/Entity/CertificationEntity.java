package com.teami.capstone.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity(name="certification")
@Table(name="certification")
public class CertificationEntity {

	@Id
	@Column(name="email")
	private String email;

	@Column(name="certification_number")
	private String certificationNumber;
}
