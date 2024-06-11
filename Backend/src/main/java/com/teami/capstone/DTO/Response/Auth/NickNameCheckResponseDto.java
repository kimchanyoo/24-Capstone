package com.teami.capstone.DTO.Response.Auth;

import com.teami.capstone.Common.Error.ResponseCode;
import com.teami.capstone.Common.Error.ResponseMessage;
import com.teami.capstone.DTO.Response.ResponseDto;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
public class NickNameCheckResponseDto extends ResponseDto {

	private NickNameCheckResponseDto(){
		super();
	}

	public static ResponseEntity<NickNameCheckResponseDto> success(){
		NickNameCheckResponseDto response = new NickNameCheckResponseDto();
		return ResponseEntity.status(HttpStatus.OK).body(response);
	}

	public static ResponseEntity<ResponseDto> duplicateNickName(){
		ResponseDto response = new ResponseDto(ResponseCode.DUPLICATE_NICKNAME, ResponseMessage.DUPLICATE_NICKNAME);
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
	}

}
