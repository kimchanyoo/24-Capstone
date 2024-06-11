package com.teami.capstone.Handler;

import com.teami.capstone.DTO.Response.ResponseDto;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ValidationExceptionHandler {

	@ExceptionHandler({MethodArgumentNotValidException.class, HttpMessageNotReadableException.class})
	public ResponseEntity<ResponseDto> validationExceptionHandler(Exception exception){
		return ResponseDto.validationFail();
	}
}
