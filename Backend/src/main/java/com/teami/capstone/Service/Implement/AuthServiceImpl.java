package com.teami.capstone.Service.Implement;

import com.teami.capstone.Common.CertificationNumber;
import com.teami.capstone.Common.TemporaryPassword;
import com.teami.capstone.DTO.Request.Auth.*;
import com.teami.capstone.DTO.Response.Auth.*;
import com.teami.capstone.DTO.Response.ResponseDto;
import com.teami.capstone.Entity.CertificationEntity;
import com.teami.capstone.Entity.UserEntity;
import com.teami.capstone.Provider.EmailProvider;
import com.teami.capstone.Provider.JwtProvider;
import com.teami.capstone.Repository.CertificationRepository;
import com.teami.capstone.Repository.ResultSet.GetIdResultSet;
import com.teami.capstone.Repository.UserRepository;
import com.teami.capstone.Service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

	private final UserRepository userRepository;

	private final CertificationRepository certificationRepository;

	private final JwtProvider jwtProvider;

	private final EmailProvider emailProvider;

	private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

	@Override
	public ResponseEntity<? super IdCheckResponseDto> idCheck(IdCheckRequestDto dto) {

		try {

			String userId = dto.getUserId();
			boolean isExistId = userRepository.existsById(userId);
			if (isExistId) return IdCheckResponseDto.duplicateId();

		} catch (Exception exception) {
			exception.printStackTrace();
			return ResponseDto.databaseError();
		}

		return IdCheckResponseDto.success();
	}

	@Override
	public ResponseEntity<? super EmailCertificationResponseDto> emailCertification(EmailCertificationRequestsDto dto) {

		try {

			String email = dto.getEmail();
			String certificationNumber = CertificationNumber.getCertificationNumber();

			boolean isSuccessed = emailProvider.sendCertificationMail(email, certificationNumber);
			if (!isSuccessed) return EmailCertificationResponseDto.mailSendFail();

			CertificationEntity certificationEntity = new CertificationEntity(email, certificationNumber);
			certificationRepository.save(certificationEntity);
		} catch (Exception exception) {
			exception.printStackTrace();
			return ResponseDto.databaseError();
		}

		return EmailCertificationResponseDto.success();

	}

	@Override
	public ResponseEntity<? super CheckCertificationResponseDto> checkCertification(CheckCertificationRequestDto dto) {

		try{

			String email = dto.getEmail();
			String certificationNumber = dto.getCertificationNumber();

			CertificationEntity certificationEntitiy = certificationRepository.findByEmail(email);
			if(certificationEntitiy == null) return CheckCertificationResponseDto.certificationFail();

			boolean isMatched = certificationEntitiy.getEmail().equals(email)
					&& certificationEntitiy.getCertificationNumber().equals(certificationNumber);
			if(!isMatched) return CheckCertificationResponseDto.certificationFail();

		}catch (Exception exception){
			exception.printStackTrace();
			return ResponseDto.databaseError();
		}

		return CheckCertificationResponseDto.success();
	}

	@Override
	public ResponseEntity<? super SignUpResponseDto> signUp(SignUpRequestDto dto) {

		try{

			String pwd = dto.getPwd();
			String encodedPassword = passwordEncoder.encode(pwd);
			dto.setPwd(encodedPassword);

			UserEntity userEntity = new UserEntity(dto);
			userRepository.save(userEntity);

		}catch (Exception exception){
			exception.printStackTrace();
			return ResponseDto.databaseError();
		}

		return SignUpResponseDto.success();
	}

	@Override
	public ResponseEntity<? super SignInResponseDto> signIn(SignInRequestDto dto) {

		String token = null;

		try{

			String userId = dto.getUserId();
			UserEntity userEntity = userRepository.findByUserId(userId);
			if(userEntity == null) return SignInResponseDto.signInFail();

			String pwd = dto.getPwd();
			String encodedPassword = userEntity.getPwd();
			boolean isMatched = passwordEncoder.matches(pwd, encodedPassword);
			if(!isMatched) return SignInResponseDto.signInFail();

			token = jwtProvider.create(userId);

		}catch (Exception exception){
			exception.printStackTrace();
			return ResponseDto.databaseError();
		}

		return SignInResponseDto.success(token);
	}

	@Override
	public ResponseEntity<? super NickNameCheckResponseDto> nickNameCheck(NickNameCheckRequestDto dto) {

		try{

			String nickName = dto.getNickName();
			boolean isExistNickName = userRepository.existsByNickName(nickName);
			if(isExistNickName) return NickNameCheckResponseDto.duplicateNickName();

		}catch(Exception exception){
			exception.printStackTrace();
			return ResponseDto.databaseError();
		}

		return NickNameCheckResponseDto.success();
	}

	@Override
	public ResponseEntity<? super FindIdResponseDto> findId(FindIdRequestDto dto) {

		GetIdResultSet idResultSet = null;

		try{

			String name = dto.getName();
			String email = dto.getEmail();
			String certificationNumber = dto.getCertificationNumber();

			boolean isUser = userRepository.existsByNameAndEmail(name, email);
			if(!isUser) return FindIdResponseDto.noExistUser();

			CertificationEntity certification = certificationRepository.findByEmail(email);
			boolean isMatched = certification.getEmail().equals(email) &&
					certification.getCertificationNumber().equals(certificationNumber);
			if(!isMatched) return FindIdResponseDto.certificationFail();

			idResultSet = userRepository.findByNameAndEmail(name, email);

		}catch (Exception exception){
			exception.printStackTrace();
			return ResponseDto.databaseError();
		}

		return FindIdResponseDto.success(idResultSet);
	}

	@Override
	public ResponseEntity<? super FindPasswordResponseDto> findPassword(FindPasswordRequestDto dto) {


		try{

			String userId = dto.getUserId();
			String email = dto.getEmail();
			String certificationNumber = dto.getCertificationNumber();

			boolean isUser = userRepository.existsByUserId(userId);
			if(!isUser) return FindPasswordResponseDto.noExistUser();

			CertificationEntity certification = certificationRepository.findByEmail(email);
			boolean isMatched = certification.getEmail().equals(email) &&
					certification.getCertificationNumber().equals(certificationNumber);
			if(!isMatched) return FindPasswordResponseDto.certificationFail();

			String temporaryPassword = TemporaryPassword.getTemporaryPassword();

			boolean isSuccessed = emailProvider.sendTemporaryPassword(email, temporaryPassword);
			if (!isSuccessed) return EmailCertificationResponseDto.mailSendFail();

			UserEntity userEntity = userRepository.findByUserId(userId);
			String encodedPassword = passwordEncoder.encode(temporaryPassword);
			userEntity.patchPassword(encodedPassword);

			userRepository.save(userEntity);

		}catch (Exception exception){
			exception.printStackTrace();
			return ResponseDto.databaseError();
		}


		return FindPasswordResponseDto.success();
	}

	@Override
	public ResponseEntity<? super PatchPasswordResponseDto> patchPassword(PatchPasswordRequestDto dto, String userId) {

		try{

			UserEntity userEntity = userRepository.findByUserId(userId);
			if(userEntity == null) return PatchPasswordResponseDto.noExistUser();

			String pwd = dto.getPwd();
			String encodedPassword = passwordEncoder.encode(pwd);
			userEntity.patchPassword(encodedPassword);

			userRepository.save(userEntity);

		}catch (Exception exception){
			exception.printStackTrace();
			return ResponseDto.databaseError();
		}

		return PatchPasswordResponseDto.success();
	}

	@Override
	public ResponseEntity<? super ComparisonPasswordResponseDto> comparePassword(ComparisonPasswordRequestDto dto, String userId) {

		try{

			UserEntity userEntity = userRepository.findByUserId(userId);
			if(userEntity == null) return ComparisonPasswordResponseDto.noExistUser();

			String pwd = dto.getPwd();
			String encodedPassword = userEntity.getPwd();
			boolean isPwd = passwordEncoder.matches(pwd, encodedPassword);
			if(!isPwd) return ComparisonPasswordResponseDto.unmatchedPassword();

		}catch (Exception exception){
			exception.printStackTrace();
			return ResponseDto.databaseError();
		}

		return ComparisonPasswordResponseDto.success();
	}

}


