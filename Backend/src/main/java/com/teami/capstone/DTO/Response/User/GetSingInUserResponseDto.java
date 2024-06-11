package com.teami.capstone.DTO.Response.User;

import com.teami.capstone.Common.Error.ResponseCode;
import com.teami.capstone.Common.Error.ResponseMessage;
import com.teami.capstone.DTO.Response.ResponseDto;
import com.teami.capstone.Entity.UserEntity;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
public class GetSingInUserResponseDto extends ResponseDto {

	private String userId;
	private String nickname;

	private GetSingInUserResponseDto(UserEntity userEntity){
		super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
		this.nickname = userEntity.getNickName();
		this.userId = userEntity.getUserId();
	}

	public static ResponseEntity<GetSingInUserResponseDto> success(UserEntity userEntity){
		GetSingInUserResponseDto result = new GetSingInUserResponseDto(userEntity);
		return ResponseEntity.status(HttpStatus.OK).body(result);
	}

	public static ResponseEntity<ResponseDto> notExistUser(){
		ResponseDto result = new ResponseDto(ResponseCode.NOT_EXISTED_USER, ResponseMessage.NOT_EXISTED_USER);
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);
	}
}
