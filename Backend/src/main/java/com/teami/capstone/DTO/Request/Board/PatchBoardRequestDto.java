package com.teami.capstone.DTO.Request.Board;

import com.teami.capstone.DTO.Response.ResponseDto;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class PatchBoardRequestDto {

	private Integer recruitmentClassification;

	private Integer recruitmentPerson;

	private Integer processing;

	private Integer processingDuration;

	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private LocalDate deadLine;

	@NotBlank
	private String title;

	@NotBlank
	private String body;

	@NotNull
	private List<Integer> field;

	@NotNull
	private List<Integer> tech;

}
