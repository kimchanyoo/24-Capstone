package com.teami.capstone.Service;

import com.teami.capstone.DTO.Request.Auth.*;
import com.teami.capstone.DTO.Request.Board.BoardCreateRequestDto;
import com.teami.capstone.DTO.Response.Auth.*;
import com.teami.capstone.DTO.Response.Board.BoardCreateResponseDto;
import org.springframework.http.ResponseEntity;

public interface AuthService {
	ResponseEntity<? super IdCheckResponseDto> idCheck(IdCheckRequestDto dto);
	ResponseEntity<? super EmailCertificationResponseDto> emailCertification(EmailCertificationRequestsDto dto);
	ResponseEntity<? super CheckCertificationResponseDto> checkCertification(CheckCertificationRequestDto dto);
	ResponseEntity<? super SignUpResponseDto> signUp(SignUpRequestDto dto);
	ResponseEntity<? super SignInResponseDto> signIn(SignInRequestDto dto);
	ResponseEntity<? super NickNameCheckResponseDto> nickNameCheck(NickNameCheckRequestDto dto);
	ResponseEntity<? super FindIdResponseDto> findId(FindIdRequestDto dto);
	ResponseEntity<? super FindPasswordResponseDto> findPassword(FindPasswordRequestDto dto);
	ResponseEntity<? super PatchPasswordResponseDto> patchPassword(PatchPasswordRequestDto dto, String userId);
	ResponseEntity<? super ComparisonPasswordResponseDto> comparePassword(ComparisonPasswordRequestDto dto, String userId);
}
