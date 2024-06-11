package com.teami.capstone.DTO.Request.Auth;

import com.teami.capstone.DTO.Response.ResponseDto;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class FindIdRequestDto extends ResponseDto {

	@NotBlank
	private String name;

	@NotBlank
	private String email;

	@NotBlank
	private String certificationNumber;

}
