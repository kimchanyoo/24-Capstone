package com.teami.capstone.DTO.Request.Auth;

import jakarta.persistence.Column;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class SignUpRequestDto {

	@NotBlank
	private String userId;

	@NotBlank
	private String nickName;

	@NotBlank
	@Pattern(regexp = "^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{8,20}$")
	private String pwd;

	@NotBlank
	@Pattern(regexp = "^\\d{3}-\\d{4}-\\d{4}$")
	private String phoneNumber;

	@NotBlank
	private String name;

	@Email
	@NotBlank
	private String email;

	@NotBlank
	private String schoolName;

	@NotBlank
	private String department;

	@NotNull
	private Integer attendanceStatus;

	private Integer field;

	private String career;

	private List<Integer> tech;

}
