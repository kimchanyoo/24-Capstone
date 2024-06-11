package com.teami.capstone.DTO.Request.Auth;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ComparisonPasswordRequestDto {

	@NotBlank
	private String pwd;

}
