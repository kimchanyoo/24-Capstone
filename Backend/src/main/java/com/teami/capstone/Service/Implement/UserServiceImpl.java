package com.teami.capstone.Service.Implement;

import com.teami.capstone.DTO.Request.Auth.ComparisonPasswordRequestDto;
import com.teami.capstone.DTO.Request.User.GetUserRequestDto;
import com.teami.capstone.DTO.Request.User.PatchUserRequestDto;
import com.teami.capstone.DTO.Response.Auth.ComparisonPasswordResponseDto;
import com.teami.capstone.DTO.Response.ResponseDto;
import com.teami.capstone.DTO.Response.User.*;
import com.teami.capstone.Entity.UserEntity;
import com.teami.capstone.Entity.UserTechEntity;
import com.teami.capstone.Repository.ResultSet.GetUserProfileResultSet;
import com.teami.capstone.Repository.ResultSet.GetUserResultSet;
import com.teami.capstone.Repository.UserRepository;
import com.teami.capstone.Repository.UserTechRepository;
import com.teami.capstone.Service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

	private final UserRepository userRepository;
	private final UserTechRepository userTechRepository;

	@Override
	public ResponseEntity<? super GetSingInUserResponseDto> getSignInUser(String userId) {

		UserEntity userEntity = null;

		try{

			userEntity = userRepository.findByUserId(userId);
			if(userEntity == null) return GetSingInUserResponseDto.notExistUser();

		}catch(Exception exception){
			exception.printStackTrace();
			return ResponseDto.databaseError();
		}

		return GetSingInUserResponseDto.success(userEntity);
	}

	@Override
	public ResponseEntity<? super GetUserProfileResponseDto> getUserProfile(String userId) {

		GetUserProfileResultSet result = null;
		List<Integer> techEntities = new ArrayList<>();

		try{

			result = userRepository.findUserProfile(userId);
			if(result == null) return GetUserProfileResponseDto.noExistUser();

			techEntities = userTechRepository.findByUserId(userId);

		} catch(Exception exception){
			exception.printStackTrace();
			return ResponseDto.databaseError();
		}

		return GetUserProfileResponseDto.success(result, techEntities);

	}

	@Override
	public ResponseEntity<? super GetUserResponseDto> getUser(GetUserRequestDto dto) {

		GetUserResultSet result = null;
		List<Integer> techEntities = new ArrayList<>();

		try{

			String nickName = dto.getNickName();
			result = userRepository.findUserByNickName(nickName);
			if(result == null) return GetUserResponseDto.noExistUser();

			techEntities = userTechRepository.findByNickName(nickName);

		}catch(Exception exception){
			exception.printStackTrace();
			return ResponseDto.databaseError();
		}

		return GetUserResponseDto.success(result, techEntities);
	}

	@Override
	public ResponseEntity<? super PatchUserResponseDto> patchUser(PatchUserRequestDto dto, String userId) {

		try{

			UserEntity userEntity = userRepository.findByUserId(userId);
			if(userEntity == null) return PatchUserResponseDto.noExistUser();

			userEntity.patchUser(dto);
			userRepository.save(userEntity);

			userTechRepository.deleteByUserId(userId);

			List<Integer> userTechList = dto.getTech();
			List<UserTechEntity> techEntities = new ArrayList<>();

			for(Integer tech : userTechList){
				UserTechEntity techEntity = new UserTechEntity(userId, tech);
				techEntities.add(techEntity);
			}

			userTechRepository.saveAll(techEntities);

		}catch (Exception exception){
			exception.printStackTrace();
			return ResponseDto.databaseError();
		}

		return PatchUserResponseDto.success();
	}

	@Override
	public ResponseEntity<? super DeleteUserResponseDto> deleteUser(String userId,  String loginUser) {

		try{

			boolean existedUser = userRepository.existsByUserId(userId);
			if(!existedUser) return DeleteUserResponseDto.noExistedUser();

			boolean isRightUser = userId.equals(loginUser);
			if(!isRightUser) return DeleteUserResponseDto.noPermission();

			userRepository.delete(userId);


		}catch (Exception exception){
			exception.printStackTrace();
			return ResponseDto.databaseError();
		}

		return DeleteUserResponseDto.success();
	}


}
