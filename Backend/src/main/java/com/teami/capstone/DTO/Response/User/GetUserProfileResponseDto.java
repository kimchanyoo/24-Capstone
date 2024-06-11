package com.teami.capstone.DTO.Response.User;

import com.teami.capstone.Common.Error.ResponseCode;
import com.teami.capstone.Common.Error.ResponseMessage;
import com.teami.capstone.DTO.Response.ResponseDto;
import com.teami.capstone.Repository.ResultSet.GetUserProfileResultSet;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;

@Getter
public class GetUserProfileResponseDto extends ResponseDto {

	private String nickName;
	private String name;
	private String userId;
	private String phoneNumber;
	private String email;
	private String schoolName;
	private String department;
	private Integer field;
	private String career;
	private List<Integer> tech;

	private GetUserProfileResponseDto(GetUserProfileResultSet resultSet,
	                                  List<Integer> techEntities){

		super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);

		this.nickName = resultSet.getNickName();
		this.name = resultSet.getName();
		this.userId = resultSet.getUserId();
		this.phoneNumber = resultSet.getPhoneNumber();
		this.email = resultSet.getEmail();
		this.schoolName = resultSet.getSchoolName();
		this.department = resultSet.getDepartment();
		this.field = resultSet.getField();
		this.career = resultSet.getCareer();
		this.tech = techEntities;

	}

	public static ResponseEntity<GetUserProfileResponseDto> success(GetUserProfileResultSet resultSet,
	                                                                List<Integer> techEntities){
		GetUserProfileResponseDto result = new GetUserProfileResponseDto(resultSet, techEntities);
		return ResponseEntity.status(HttpStatus.OK).body(result);
	}

	public static ResponseEntity<ResponseDto> noExistUser(){
		ResponseDto result = new ResponseDto(ResponseCode.NOT_EXISTED_USER, ResponseMessage.NOT_EXISTED_USER);
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);
	}

}
