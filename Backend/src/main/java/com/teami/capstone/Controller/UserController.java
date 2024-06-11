package com.teami.capstone.Controller;

import com.teami.capstone.DTO.Request.Auth.ComparisonPasswordRequestDto;
import com.teami.capstone.DTO.Request.Board.PatchBoardRequestDto;
import com.teami.capstone.DTO.Request.User.PatchUserRequestDto;
import com.teami.capstone.DTO.Response.Auth.ComparisonPasswordResponseDto;
import com.teami.capstone.DTO.Response.Board.PatchBoardResponseDto;
import com.teami.capstone.DTO.Response.User.*;
import com.teami.capstone.Service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/user")
public class UserController {

	private final UserService userService;


	@GetMapping("")
	public ResponseEntity<? super GetSingInUserResponseDto> getSignInUser(
			@AuthenticationPrincipal String userId
	) {
		ResponseEntity<? super GetSingInUserResponseDto> response = userService.getSignInUser(userId);
		return response;
	}

	@GetMapping("/userProfile")
	public ResponseEntity<? super GetUserProfileResponseDto> getUserProfile(
			@AuthenticationPrincipal String userId
	){
		ResponseEntity<? super GetUserProfileResponseDto> response = userService.getUserProfile(userId);
		return response;
	}

	@PatchMapping("/userProfile")
	public ResponseEntity<? super PatchUserResponseDto> patchUser(
			@RequestBody @Valid PatchUserRequestDto requestBody,
			@AuthenticationPrincipal String userId
	){
		ResponseEntity<? super PatchUserResponseDto> response = userService.patchUser(requestBody, userId);
		return response;
	}

	@DeleteMapping("/{userId}")
	public ResponseEntity<? super DeleteUserResponseDto> deleteUser(
			@PathVariable("userId") String userId,
			@AuthenticationPrincipal String loginUser
	){
		ResponseEntity<? super DeleteUserResponseDto> response = userService.deleteUser(userId, loginUser);
		return response;
	}
}
