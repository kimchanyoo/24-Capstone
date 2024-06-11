package com.teami.capstone.DTO.Response.Auth;

import com.teami.capstone.Common.Error.ResponseCode;
import com.teami.capstone.Common.Error.ResponseMessage;
import com.teami.capstone.DTO.Response.ResponseDto;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
public class SignInResponseDto extends ResponseDto {

	private String token;
	private int expirationTime;

	private SignInResponseDto(String token){
		super();
		this.token = token;
		this.expirationTime = 3600;
	}

	public static ResponseEntity<SignInResponseDto> success(String token){
		SignInResponseDto responseBody = new SignInResponseDto(token);
		return ResponseEntity.status(HttpStatus.OK).body(responseBody);

	}

	public static ResponseEntity<ResponseDto> signInFail(){
		ResponseDto responseBody = new ResponseDto(ResponseCode.SIGN_IN_FAIL, ResponseMessage.SIGN_IN_FAIL);
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseBody);
	}

}
