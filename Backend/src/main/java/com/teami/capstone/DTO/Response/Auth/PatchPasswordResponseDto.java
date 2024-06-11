package com.teami.capstone.DTO.Response.Auth;

import com.teami.capstone.Common.Error.ResponseCode;
import com.teami.capstone.Common.Error.ResponseMessage;
import com.teami.capstone.DTO.Response.ResponseDto;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
public class PatchPasswordResponseDto extends ResponseDto {

	private PatchPasswordResponseDto(){
		super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
	}

	public static ResponseEntity<PatchPasswordResponseDto> success(){
		PatchPasswordResponseDto responseBody = new PatchPasswordResponseDto();
		return ResponseEntity.status(HttpStatus.OK).body(responseBody);
	}

	public static ResponseEntity<ResponseDto> noExistUser(){
		ResponseDto responseBody = new ResponseDto(ResponseCode.NOT_EXISTED_USER,
				ResponseMessage.NOT_EXISTED_USER);
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
	}

}
