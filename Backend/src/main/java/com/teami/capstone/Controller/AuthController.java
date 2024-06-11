package com.teami.capstone.Controller;

import com.teami.capstone.DTO.Request.Auth.*;
import com.teami.capstone.DTO.Request.User.GetUserRequestDto;
import com.teami.capstone.DTO.Response.Auth.*;
import com.teami.capstone.DTO.Response.User.GetUserResponseDto;
import com.teami.capstone.Service.AuthService;
import com.teami.capstone.Service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/auth")
public class AuthController {

	private final AuthService authService;
	private final UserService userService;

	@PostMapping("/id-check")
	public ResponseEntity<? super IdCheckResponseDto> idCheck(
			@RequestBody @Valid IdCheckRequestDto requestBody
			){
		ResponseEntity<? super IdCheckResponseDto> response = authService.idCheck(requestBody);
		return response;
	}

	@PostMapping("/email-certification")
	public ResponseEntity<? super EmailCertificationResponseDto> emailCertification(
			@RequestBody @Valid EmailCertificationRequestsDto requestBody
	){
		ResponseEntity<? super EmailCertificationResponseDto> response = authService.emailCertification(requestBody);
		return response;
	}

	@PostMapping("/check-certification")
	public ResponseEntity<? super CheckCertificationResponseDto> checkCertification(
			@RequestBody @Valid CheckCertificationRequestDto requestBody
	){
		ResponseEntity<? super CheckCertificationResponseDto> response = authService.checkCertification(requestBody);
		return response;
	}

	@PostMapping("/sign-up")
	public ResponseEntity<? super SignUpResponseDto> signUp(
			@RequestBody @Valid SignUpRequestDto requestBody
	){
		ResponseEntity<? super SignUpResponseDto> response = authService.signUp(requestBody);
		return response;
	}

	@PostMapping("/sign-in")
	public ResponseEntity<? super SignInResponseDto> signIn(
			@RequestBody @Valid SignInRequestDto requestBody
	){
		ResponseEntity<? super SignInResponseDto> response = authService.signIn(requestBody);
		return response;
	}

	@PostMapping("/nickname-check")
	public ResponseEntity<? super NickNameCheckResponseDto> nickNameCheck(
			@RequestBody @Valid NickNameCheckRequestDto requestBody
	){
		ResponseEntity<? super NickNameCheckResponseDto> response = authService.nickNameCheck(requestBody);
		return response;
	}

	@PostMapping("/findId")
	public ResponseEntity<? super FindIdResponseDto> findId(
			@RequestBody @Valid FindIdRequestDto requestbody
	){
		ResponseEntity<? super FindIdResponseDto> response = authService.findId(requestbody);
		return response;
	}

	@PostMapping("/findPassword")
	public ResponseEntity<? super FindPasswordResponseDto> findPassword(
			@RequestBody @Valid FindPasswordRequestDto requestbody
	){
		ResponseEntity<? super FindPasswordResponseDto> response = authService.findPassword(requestbody);
		return response;
	}

	@PostMapping("/comparisonPassword")
	public ResponseEntity<? super ComparisonPasswordResponseDto> comparePassword(
			@RequestBody @Valid ComparisonPasswordRequestDto requestbody,
			@AuthenticationPrincipal String userId
	){
		ResponseEntity<? super ComparisonPasswordResponseDto> response = authService.comparePassword(requestbody, userId);
		return response;
	}

	@PostMapping("/userProfile")
	public ResponseEntity<? super GetUserResponseDto> GetUser(
			@RequestBody @Valid GetUserRequestDto requestbody
			){
		ResponseEntity<? super GetUserResponseDto> response = userService.getUser(requestbody);
		return response;
	}

	@PatchMapping("/resetPassword")
	public ResponseEntity<? super PatchPasswordResponseDto> patchPassword(
			@RequestBody @Valid PatchPasswordRequestDto requestbody,
			@AuthenticationPrincipal String userId
	){
		ResponseEntity<? super PatchPasswordResponseDto> response = authService.patchPassword(requestbody, userId);
		return response;
	}

}
