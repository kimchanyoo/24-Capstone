package com.teami.capstone.Service;

import com.teami.capstone.DTO.Request.Board.BoardApplicantRequestDto;
import com.teami.capstone.DTO.Request.Board.BoardCreateRequestDto;
import com.teami.capstone.DTO.Request.Board.PatchBoardRequestDto;
import com.teami.capstone.DTO.Response.Board.*;
//import com.teami.capstone.DTO.Response.Board.GetLatestBoardResponseDto;
import org.springframework.http.ResponseEntity;

public interface BoardService {

	ResponseEntity<? super BoardCreateResponseDto> boardCreate(BoardCreateRequestDto dto, String userId);
	ResponseEntity<? super GetBoardResponseDto> getBoard(Integer postId);
	ResponseEntity<? super GetLatestBoardResponseDto> getLatestBoardList();
	ResponseEntity<? super GetLatestBoardResponseDto> getLatestProjectBoardList();
	ResponseEntity<? super GetLatestBoardResponseDto> getLatestStudyBoardList();
	ResponseEntity<? super GetLatestSchoolBoardResponseDto> getLatestSchoolBoardList(String userId);
	ResponseEntity<? super GetUploadListResponseDto> getUploadList(String userId);
	ResponseEntity<? super GetLatestSchoolBoardResponseDto> getLatestSchoolProjectBoardList(String userId);
	ResponseEntity<? super GetLatestSchoolBoardResponseDto> getLatestSchoolStudyBoardList(String userId);
	ResponseEntity<? super BoardApplicantResponseDto> applicantCreate(BoardApplicantRequestDto dto, String userId);
	ResponseEntity<? super GetApplicantsResponseDto> getApplicants(Integer postId);
	ResponseEntity<? super DeleteBoardResponseDto> deleteBoard(Integer postId, String userId);
	ResponseEntity<? super PatchBoardResponseDto> patchBoard(PatchBoardRequestDto dto, Integer postId, String userId);
	ResponseEntity<? super ExpireBoardResponseDto> expireBoard(Integer postId, String userId);
}
