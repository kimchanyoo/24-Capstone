package com.teami.capstone.DTO.Response.Auth;

import com.teami.capstone.Common.Error.ResponseCode;
import com.teami.capstone.Common.Error.ResponseMessage;
import com.teami.capstone.DTO.Response.ResponseDto;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
public class SignUpResponseDto extends ResponseDto {

	private SignUpResponseDto(){
		super();
	}

	public static ResponseEntity<SignUpResponseDto> success(){
		SignUpResponseDto responseBody = new SignUpResponseDto();
		return ResponseEntity.status(HttpStatus.OK).body(responseBody);
	}

}
