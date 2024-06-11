package com.teami.capstone.Service;

import com.teami.capstone.DTO.Request.Auth.ComparisonPasswordRequestDto;
import com.teami.capstone.DTO.Request.User.GetUserRequestDto;
import com.teami.capstone.DTO.Request.User.PatchUserRequestDto;
import com.teami.capstone.DTO.Response.Auth.ComparisonPasswordResponseDto;
import com.teami.capstone.DTO.Response.User.*;
import org.springframework.http.ResponseEntity;

public interface UserService {

	ResponseEntity<? super GetSingInUserResponseDto> getSignInUser(String userId);
	ResponseEntity<? super GetUserProfileResponseDto> getUserProfile(String userId);
	ResponseEntity<? super GetUserResponseDto> getUser(GetUserRequestDto dto);
	ResponseEntity<? super PatchUserResponseDto> patchUser(PatchUserRequestDto dto, String userId);
	ResponseEntity<? super DeleteUserResponseDto> deleteUser(String userId, String loginUser);
}
