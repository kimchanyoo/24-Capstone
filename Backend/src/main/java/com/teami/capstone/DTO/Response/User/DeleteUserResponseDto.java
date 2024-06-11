package com.teami.capstone.DTO.Response.User;

import com.teami.capstone.Common.Error.ResponseCode;
import com.teami.capstone.Common.Error.ResponseMessage;
import com.teami.capstone.DTO.Response.ResponseDto;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
public class DeleteUserResponseDto extends ResponseDto {

	private DeleteUserResponseDto(){
		super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
	}

	public static ResponseEntity<DeleteUserResponseDto> success(){
		DeleteUserResponseDto responseBody = new DeleteUserResponseDto();
		return ResponseEntity.status(HttpStatus.OK).body(responseBody);
	}

	public static ResponseEntity<ResponseDto> noExistedUser(){
		ResponseDto responseBody = new ResponseDto(
				ResponseCode.NOT_EXISTED_USER, ResponseMessage.NOT_EXISTED_USER);
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
	}

	public static ResponseEntity<ResponseDto> noPermission(){
		ResponseDto responseBody = new ResponseDto(
				ResponseCode.NO_PERMISSION, ResponseMessage.NO_PERMISSION);
		return ResponseEntity.status(HttpStatus.FORBIDDEN).body(responseBody);
	}

}
