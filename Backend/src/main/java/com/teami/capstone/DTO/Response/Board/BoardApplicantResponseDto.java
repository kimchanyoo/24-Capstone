package com.teami.capstone.DTO.Response.Board;

import com.teami.capstone.Common.Error.ResponseCode;
import com.teami.capstone.Common.Error.ResponseMessage;
import com.teami.capstone.DTO.Response.ResponseDto;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
public class BoardApplicantResponseDto extends ResponseDto {

	private BoardApplicantResponseDto(){
		super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
	}

	public static ResponseEntity<BoardApplicantResponseDto> success(){
		BoardApplicantResponseDto responseBody = new BoardApplicantResponseDto();
		return ResponseEntity.status(HttpStatus.OK).body(responseBody);
	}

	public static ResponseEntity<ResponseDto> duplicateApplicant(){
		ResponseDto responseBody = new ResponseDto(ResponseCode.DUPLICATE_APPLICANT, ResponseMessage.DUPLICATE_APPLICANT);
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
	}
}
