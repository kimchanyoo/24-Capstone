package com.teami.capstone.DTO.Request.Board;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class BoardCreateRequestDto {

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

	private List<Integer> field;

	private List<Integer> tech;
}
