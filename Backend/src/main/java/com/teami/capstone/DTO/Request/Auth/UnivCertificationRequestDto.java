package com.teami.capstone.DTO.Request.Auth;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UnivCertificationRequestDto {

	@NotBlank
	private String key;

	@NotBlank
	private String univName;

	@NotBlank
	private String email;

	private boolean univ_check;
}
