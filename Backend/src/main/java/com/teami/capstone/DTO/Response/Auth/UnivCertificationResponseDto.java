package com.teami.capstone.DTO.Response.Auth;

import com.teami.capstone.DTO.Response.ResponseDto;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
public class UnivCertificationResponseDto extends ResponseDto {

	private UnivCertificationResponseDto(){
		super();
	}

	public static ResponseEntity<UnivCertificationResponseDto> success(){
		UnivCertificationResponseDto responsebody = new UnivCertificationResponseDto();
		return ResponseEntity.status(HttpStatus.OK).body(responsebody);
	}

}
