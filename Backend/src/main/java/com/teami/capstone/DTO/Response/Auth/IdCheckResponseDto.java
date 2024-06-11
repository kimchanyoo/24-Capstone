package com.teami.capstone.DTO.Response.Auth;

import com.teami.capstone.Common.Error.ResponseCode;
import com.teami.capstone.Common.Error.ResponseMessage;
import com.teami.capstone.DTO.Response.ResponseDto;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
public class IdCheckResponseDto extends ResponseDto {


	private IdCheckResponseDto(){
		super();
	}

	public static ResponseEntity<IdCheckResponseDto> success(){

		IdCheckResponseDto responseBody = new IdCheckResponseDto();
		return ResponseEntity.status(HttpStatus.OK).body(responseBody);

	}

	public static ResponseEntity<ResponseDto> duplicateId(){
		ResponseDto responseBody = new ResponseDto(ResponseCode.DUPLICATE_ID, ResponseMessage.DUPLICATE_ID);
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
	}
}
