package com.teami.capstone.DTO.Response.Board;

import com.teami.capstone.DTO.Request.Board.BoardCreateRequestDto;
import com.teami.capstone.DTO.Response.Auth.SignUpResponseDto;
import com.teami.capstone.DTO.Response.ResponseDto;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
public class BoardCreateResponseDto extends ResponseDto {

	private BoardCreateResponseDto(){
		super();
	}

	public static ResponseEntity<BoardCreateResponseDto> success(){
		BoardCreateResponseDto responseBody = new BoardCreateResponseDto();
		return ResponseEntity.status(HttpStatus.OK).body(responseBody);
	}
}
