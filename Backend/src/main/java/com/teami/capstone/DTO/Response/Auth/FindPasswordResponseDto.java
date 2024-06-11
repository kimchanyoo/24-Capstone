package com.teami.capstone.DTO.Response.Auth;

import com.teami.capstone.Common.Error.ResponseCode;
import com.teami.capstone.Common.Error.ResponseMessage;
import com.teami.capstone.DTO.Response.ResponseDto;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
public class FindPasswordResponseDto extends ResponseDto {


	private FindPasswordResponseDto(){
		super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
	}

	public static ResponseEntity<FindPasswordResponseDto> success(){
		FindPasswordResponseDto responseBody = new FindPasswordResponseDto();
		return ResponseEntity.status(HttpStatus.OK).body(responseBody);
	}

	public static ResponseEntity<ResponseDto> noExistUser(){
		ResponseDto responseBody = new ResponseDto(ResponseCode.NOT_EXISTED_USER,
				ResponseMessage.NOT_EXISTED_USER);
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
	}

	public static ResponseEntity<ResponseDto> certificationFail(){
		ResponseDto responseBody = new ResponseDto(ResponseCode.CETIFICATION_FAIL, ResponseMessage.CETIFICATION_FAIL);
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseBody);
	}

	public static ResponseEntity<ResponseDto> mailSendFail(){
		ResponseDto responseBody = new ResponseDto(ResponseCode.MAIL_FAIL, ResponseMessage.MAIL_FAIL);
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseBody);
	}

}
