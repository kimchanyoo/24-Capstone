package com.teami.capstone.DTO.Response.Board;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.teami.capstone.Common.Error.ResponseCode;
import com.teami.capstone.Common.Error.ResponseMessage;
import com.teami.capstone.DTO.Response.ResponseDto;
import com.teami.capstone.Entity.BoardEntity;
import com.teami.capstone.Entity.BoardFieldEntity;
import com.teami.capstone.Entity.BoardTechEntity;
import com.teami.capstone.Repository.ResultSet.GetBoardResultSet;
import jakarta.persistence.*;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Getter
public class GetBoardResponseDto extends ResponseDto {

	private Integer postId;
	private String userId;
	private String nickName;
	private Integer recruitmentClassification;
	private Integer recruitmentPerson;
	private Integer processing;
	private Integer processingDuration;
	@JsonFormat(shape= JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
	private LocalDate deadLine;
	private String title;
	private String body;
	private List<Integer> field;
	private List<Integer> tech;

	private GetBoardResponseDto(GetBoardResultSet resultEntity,
	                            List<Integer> techEntities, List<Integer> fieldEntities){
		super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);

		this.postId = resultEntity.getPostId();
		this.userId = resultEntity.getUserId();
		this.nickName = resultEntity.getNickName();
		this.recruitmentClassification = resultEntity.getRecruitmentClassification();
		this.recruitmentPerson = resultEntity.getRecruitmentPerson();
		this.processing = resultEntity.getProcessing();
		this.processingDuration = resultEntity.getProcessingDuration();
		this.deadLine = resultEntity.getDeadLine();
		this.title = resultEntity.getTitle();
		this.body = resultEntity.getBody();
		this.tech = techEntities;
		this.field = fieldEntities;

	}

	public static ResponseEntity<GetBoardResponseDto> success(GetBoardResultSet resultEntity,
	                                                          List<Integer> techEntities, List<Integer> fieldEntities){
		GetBoardResponseDto result = new GetBoardResponseDto(resultEntity, techEntities, fieldEntities);
		return ResponseEntity.status(HttpStatus.OK).body(result);
	}

	public static ResponseEntity<ResponseDto> noExistBoard(){
		ResponseDto result = new ResponseDto(ResponseCode.NOT_EXISTED_BOARD, ResponseMessage.NOT_EXISTED_BOARD);
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);
	}
}
