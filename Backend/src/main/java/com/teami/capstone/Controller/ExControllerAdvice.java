package com.teami.capstone.Controller;

import com.teami.capstone.DTO.EmailErrorResult;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class ExControllerAdvice {
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ExceptionHandler(NullPointerException.class)
	public ResponseEntity<EmailErrorResult> testing(NullPointerException e){
		EmailErrorResult errorResult=new EmailErrorResult("EMAIL",e.getMessage());
		return new ResponseEntity<>(errorResult,HttpStatus.BAD_REQUEST);
	}
}
