package com.teami.capstone.DTO.Response.Auth;

import com.teami.capstone.Common.Error.ResponseCode;
import com.teami.capstone.Common.Error.ResponseMessage;
import com.teami.capstone.DTO.Request.Auth.FindIdRequestDto;
import com.teami.capstone.DTO.Response.ResponseDto;
import com.teami.capstone.Repository.ResultSet.GetIdResultSet;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;


@Getter
public class FindIdResponseDto extends ResponseDto {

	private String userId;

	private FindIdResponseDto(GetIdResultSet idResultSet){
		super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);

		userId = idResultSet.getUserId();
	}

	public static ResponseEntity<FindIdResponseDto> success(GetIdResultSet idResultSet){
		FindIdResponseDto responseBody = new FindIdResponseDto(idResultSet);
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

}
