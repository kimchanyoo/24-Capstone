package com.teami.capstone.DTO.Response.User;

import com.teami.capstone.Common.Error.ResponseCode;
import com.teami.capstone.Common.Error.ResponseMessage;
import com.teami.capstone.DTO.Response.ResponseDto;
import com.teami.capstone.Repository.ResultSet.GetUserResultSet;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;

@Getter
public class GetUserResponseDto extends ResponseDto {

	private String nickName;
	private String email;
	private String schoolName;
	private String department;
	private Integer field;
	private String career;
	private List<Integer> tech;

	private GetUserResponseDto(GetUserResultSet user, List<Integer> techEntities){
		super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);

		this.nickName = user.getNickName();
		this.email = user.getEmail();
		this.schoolName = user.getSchoolName();
		this.department = user.getDepartment();
		this.field = user.getField();
		this.career = user.getCareer();
		tech = techEntities;
	}

	public static ResponseEntity<GetUserResponseDto> success(GetUserResultSet user
			, List<Integer> techEntities){
		GetUserResponseDto response = new GetUserResponseDto(user, techEntities);
		return ResponseEntity.status(HttpStatus.OK).body(response);
	}

	public static ResponseEntity<ResponseDto> noExistUser(){
		ResponseDto result = new ResponseDto(ResponseCode.NOT_EXISTED_USER, ResponseMessage.NOT_EXISTED_USER);
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);
	}
}
