package com.teami.capstone.DTO.Request.User;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class GetUserRequestDto {

	@NotBlank
	private String nickName;

}
