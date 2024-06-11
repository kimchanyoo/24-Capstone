package com.teami.capstone.DTO.Request.Auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CheckCertificationRequestDto {

	@Email
	@NotBlank
	private String email;

	@NotBlank
	private String certificationNumber;

}
