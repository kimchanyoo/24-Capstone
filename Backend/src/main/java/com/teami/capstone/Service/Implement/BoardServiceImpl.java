package com.teami.capstone.Service.Implement;

import com.teami.capstone.DTO.Request.Board.BoardApplicantRequestDto;
import com.teami.capstone.DTO.Request.Board.BoardCreateRequestDto;
import com.teami.capstone.DTO.Request.Board.PatchBoardRequestDto;
import com.teami.capstone.DTO.Response.Board.*;
//import com.teami.capstone.DTO.Response.Board.GetLatestBoardResponseDto;
import com.teami.capstone.DTO.Response.ResponseDto;
import com.teami.capstone.Entity.BoardApplicantEntity;
import com.teami.capstone.Entity.BoardEntity;
import com.teami.capstone.Entity.BoardFieldEntity;
import com.teami.capstone.Entity.BoardTechEntity;
import com.teami.capstone.Repository.*;
import com.teami.capstone.Repository.ResultSet.GetApplicantResultSet;
import com.teami.capstone.Repository.ResultSet.GetBoardListResultSet;
import com.teami.capstone.Repository.ResultSet.GetBoardResultSet;
import com.teami.capstone.Repository.ResultSet.GetUploadListResultSet;
import com.teami.capstone.Service.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService {

	private final BoardRepository boardRepository;
	private final BoardTechRepository boardTechRepository;
	private final BoardFieldRepository boardFieldRepository;
	private final BoardApplicantRepository boardApplicantRepository;
	private final UserRepository userRepository;

	@Override
	public ResponseEntity<? super BoardCreateResponseDto> boardCreate(BoardCreateRequestDto dto, String userId) {

		try{

			String id = userId;
			BoardEntity boardEntity = new BoardEntity(dto);
			boardEntity.setUserId(id);
			boardRepository.save(boardEntity);

		} catch(Exception exception){

			exception.printStackTrace();
			return ResponseDto.databaseError();

		}

		return BoardCreateResponseDto.success();
	}

	@Override
	public ResponseEntity<? super GetBoardResponseDto> getBoard(Integer boardNumber) {

		GetBoardResultSet result = null;
		List<Integer> techEntities = new ArrayList<>();
		List<Integer> fieldEntities = new ArrayList<>();

		try{

			result = boardRepository.getBoard(boardNumber);
			if(result == null) return GetBoardResponseDto.noExistBoard();

			techEntities = boardTechRepository.findByPostId(boardNumber);
			fieldEntities = boardFieldRepository.findByPostId(boardNumber);

		}catch (Exception exception){
			exception.printStackTrace();
			return ResponseDto.databaseError();
		}

		return GetBoardResponseDto.success(result, techEntities, fieldEntities);
	}

	@Override
	public ResponseEntity<? super GetLatestBoardResponseDto> getLatestBoardList() {

		List<GetBoardListResultSet> boardResultSetList = new ArrayList<>();

		try{

			boardResultSetList = boardRepository.getBoardList();

		} catch(Exception exception){
			exception.printStackTrace();
			return ResponseDto.databaseError();
		}

		return GetLatestBoardResponseDto.success(boardResultSetList);
	}

	@Override
	public ResponseEntity<? super GetLatestBoardResponseDto> getLatestProjectBoardList() {

		List<GetBoardListResultSet> boardResultSetList = new ArrayList<>();

		try{

			boardResultSetList = boardRepository.getBoardListByProject();

		} catch(Exception exception){
			exception.printStackTrace();
			return ResponseDto.databaseError();
		}

		return GetLatestBoardResponseDto.success(boardResultSetList);
	}

	@Override
	public ResponseEntity<? super GetLatestBoardResponseDto> getLatestStudyBoardList() {

		List<GetBoardListResultSet> boardResultSetList = new ArrayList<>();

		try{

			boardResultSetList = boardRepository.getBoardListByStudy();

		} catch(Exception exception){
			exception.printStackTrace();
			return ResponseDto.databaseError();
		}

		return GetLatestBoardResponseDto.success(boardResultSetList);
	}

	@Override
	public ResponseEntity<? super GetLatestSchoolBoardResponseDto> getLatestSchoolBoardList(String userId) {

		List<GetBoardListResultSet> boardResultSetList = new ArrayList<>();

		try{

			boardResultSetList = boardRepository.getBoardListBySchool(userId);

		}catch(Exception exception){
			exception.printStackTrace();
			return ResponseDto.databaseError();
		}

		return GetLatestSchoolBoardResponseDto.success(boardResultSetList);
	}

	@Override
	public ResponseEntity<? super GetUploadListResponseDto> getUploadList(String userId) {

		List<GetUploadListResultSet> uploadList = new ArrayList<>();

		try{

			uploadList = boardRepository.getUploadList(userId);

		}catch(Exception exception){
			exception.printStackTrace();
			return ResponseDto.databaseError();
		}
		return GetUploadListResponseDto.success(uploadList);
	}

	@Override
	public ResponseEntity<? super GetLatestSchoolBoardResponseDto> getLatestSchoolProjectBoardList(String userId) {

		List<GetBoardListResultSet> boardResultSetList = new ArrayList<>();

		try{

			boardResultSetList = boardRepository.getBoardListBySchoolProject(userId);

		}catch(Exception exception){
			exception.printStackTrace();
			return ResponseDto.databaseError();
		}

		return GetLatestSchoolBoardResponseDto.success(boardResultSetList);
	}

	@Override
	public ResponseEntity<? super GetLatestSchoolBoardResponseDto> getLatestSchoolStudyBoardList(String userId) {

		List<GetBoardListResultSet> boardResultSetList = new ArrayList<>();

		try{

			boardResultSetList = boardRepository.getBoardListBySchoolStudy(userId);

		}catch(Exception exception){
			exception.printStackTrace();
			return ResponseDto.databaseError();
		}

		return GetLatestSchoolBoardResponseDto.success(boardResultSetList);
	}

	@Override
	public ResponseEntity<? super BoardApplicantResponseDto> applicantCreate(BoardApplicantRequestDto dto, String userId) {

		try{

			boolean isExist = boardApplicantRepository.existsApplicant(dto.getPostId(), userId);
			if(isExist) return BoardApplicantResponseDto.duplicateApplicant();

			String nickName = userRepository.findNickName(userId);
			String email = userRepository.findEmail(userId);
			BoardApplicantEntity boardApplicant = new BoardApplicantEntity(dto, userId, nickName, email);
			boardApplicantRepository.save(boardApplicant);

		} catch(Exception exception){

			exception.printStackTrace();
			return ResponseDto.databaseError();

		}

		return BoardApplicantResponseDto.success();
	}

	@Override
	public ResponseEntity<? super GetApplicantsResponseDto> getApplicants(Integer postId) {

		List<GetApplicantResultSet> result = new ArrayList<>();

		try{

			result = boardApplicantRepository.getApplicants(postId);

		}catch (Exception exception){
			exception.printStackTrace();
			return ResponseDto.databaseError();
		}

		return GetApplicantsResponseDto.success(result);
	}

	@Override
	public ResponseEntity<? super DeleteBoardResponseDto> deleteBoard(Integer postId, String userId) {

		try{

			boolean existedUser = userRepository.existsByUserId(userId);
			if(!existedUser) return DeleteBoardResponseDto.noExistedUser();

			boolean existedPost = boardRepository.existsByPostId(postId);
			if(!existedPost) return DeleteBoardResponseDto.noExistedBoard();

			String writerId = boardRepository.getWriterUserId(postId);
			boolean isWriter = writerId.equals(userId);
			if(!isWriter) return DeleteBoardResponseDto.noPermission();

			boardRepository.delete(postId);

		}catch(Exception exception){
			exception.printStackTrace();
			return ResponseDto.databaseError();
		}

		return DeleteBoardResponseDto.success();
	}

	@Override
	public ResponseEntity<? super PatchBoardResponseDto> patchBoard(PatchBoardRequestDto dto, Integer postId, String userId) {

		try{

			BoardEntity boardEntity = boardRepository.findByPostId(postId);
			if(boardEntity == null) return PatchBoardResponseDto.noExistBoard();

			boolean existedUser = userRepository.existsByUserId(userId);
			if(!existedUser) return PatchBoardResponseDto.noExistUser();

			String writerId = boardEntity.getUserId();
			boolean isWriter = writerId.equals(userId);
			if(!isWriter) return PatchBoardResponseDto.noPermission();

			boardEntity.patchBoard(dto);
			boardRepository.save(boardEntity);

			boardTechRepository.deleteByPostId(postId);
			boardFieldRepository.deleteByPostId(postId);

			List<Integer> boardTechList = dto.getTech();
			List<BoardTechEntity> techEntities = new ArrayList<>();

			for(Integer tech : boardTechList){
				BoardTechEntity techEntity = new BoardTechEntity(postId, tech);
				techEntities.add(techEntity);
			}

			boardTechRepository.saveAll(techEntities);

			List<Integer> boardFieldList = dto.getField();
			List<BoardFieldEntity> fieldEntities = new ArrayList<>();

			for(Integer field : boardFieldList){
				BoardFieldEntity fieldEntity = new BoardFieldEntity(postId, field);
				fieldEntities.add(fieldEntity);
			}

			boardFieldRepository.saveAll(fieldEntities);

		}catch (Exception exception){
			exception.printStackTrace();
			return ResponseDto.databaseError();
		}

		return PatchBoardResponseDto.success();
	}

	@Override
	public ResponseEntity<? super ExpireBoardResponseDto> expireBoard(Integer postId, String userId) {

		try{

			BoardEntity boardEntity = boardRepository.findByPostId(postId);
			if(boardEntity == null) return ExpireBoardResponseDto.noExistBoard();

			boolean existedUser = userRepository.existsByUserId(userId);
			if(!existedUser) return ExpireBoardResponseDto.noExistUser();

			String writerId = boardEntity.getUserId();
			boolean isWriter = writerId.equals(userId);
			if(!isWriter) return ExpireBoardResponseDto.noPermission();

			boardEntity.expireBoard();
			boardRepository.save(boardEntity);

		}catch (Exception exception){
			exception.printStackTrace();
			return ResponseDto.databaseError();
		}

		return ExpireBoardResponseDto.success();
	}
}
