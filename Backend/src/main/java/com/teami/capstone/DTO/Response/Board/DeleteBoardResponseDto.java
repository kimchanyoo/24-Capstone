package com.teami.capstone.DTO.Response.Board;

import com.teami.capstone.Common.Error.ResponseCode;
import com.teami.capstone.Common.Error.ResponseMessage;
import com.teami.capstone.DTO.Response.ResponseDto;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
public class DeleteBoardResponseDto extends ResponseDto {

	private DeleteBoardResponseDto(){
		super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
	}

	public static ResponseEntity<DeleteBoardResponseDto> success(){
		DeleteBoardResponseDto responseBody = new DeleteBoardResponseDto();
		return ResponseEntity.status(HttpStatus.OK).body(responseBody);
	}

	public static ResponseEntity<ResponseDto> noExistedUser(){
		ResponseDto responseBody = new ResponseDto(
				ResponseCode.NOT_EXISTED_USER, ResponseMessage.NOT_EXISTED_USER);
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
	}

	public static ResponseEntity<ResponseDto> noExistedBoard(){
		ResponseDto responseBody = new ResponseDto(
				ResponseCode.NOT_EXISTED_BOARD, ResponseMessage.NOT_EXISTED_BOARD);
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
	}

	public static ResponseEntity<ResponseDto> noPermission(){
		ResponseDto responseBody = new ResponseDto(
				ResponseCode.NO_PERMISSION, ResponseMessage.NO_PERMISSION);
		return ResponseEntity.status(HttpStatus.FORBIDDEN).body(responseBody);
	}
}
