package com.teami.capstone.DTO.Request.User;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class PatchUserRequestDto {

	@NotBlank
	private String nickName;

	@NotBlank
	private String phoneNumber;

	@NotNull
	private Integer field;

	@NotBlank
	private String career;

	@NotNull
	private List<Integer> tech;

}
