package com.teami.capstone.DTO.Request.Board;

import com.teami.capstone.Entity.BoardApplicantEntity;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class BoardApplicantRequestDto {

	private Integer postId;
}
