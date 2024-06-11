package com.teami.capstone.Controller;

import com.teami.capstone.DTO.Request.Board.BoardApplicantRequestDto;
import com.teami.capstone.DTO.Request.Board.BoardCreateRequestDto;
import com.teami.capstone.DTO.Request.Board.PatchBoardRequestDto;
import com.teami.capstone.DTO.Response.Board.*;
import com.teami.capstone.Service.BoardService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/board")
public class BoardController {

	private final BoardService boardService;

	@PostMapping("/boardInsert")
	public ResponseEntity<? super BoardCreateResponseDto> boardInsert(
			@RequestBody @Valid BoardCreateRequestDto requestBody, @AuthenticationPrincipal String userId
	){
		ResponseEntity<? super BoardCreateResponseDto> response = boardService.boardCreate(requestBody, userId);
		return response;
	}

	@PostMapping("/application")
	public ResponseEntity<? super BoardApplicantResponseDto> boardApply(
			@RequestBody @Valid BoardApplicantRequestDto dto, @AuthenticationPrincipal String userId
	){
		ResponseEntity<? super BoardApplicantResponseDto> response = boardService.applicantCreate(dto, userId);
		return response;
	}

	@GetMapping("/{postId}")
	public ResponseEntity<? super GetBoardResponseDto> getBoard(
			@PathVariable("postId") Integer postId
	){
		ResponseEntity<? super GetBoardResponseDto> response = boardService.getBoard(postId);
		return response;
	}

	@GetMapping("/latest-list")
	public ResponseEntity<? super GetLatestBoardResponseDto> getBoardList(){
		ResponseEntity<? super GetLatestBoardResponseDto> response = boardService.getLatestBoardList();
		return response;
	}

	@GetMapping("/latest-projectList")
	public ResponseEntity<? super GetLatestBoardResponseDto> getProjectBoardList(){
		ResponseEntity<? super GetLatestBoardResponseDto> response = boardService.getLatestProjectBoardList();
		return response;
	}

	@GetMapping("/latest-studyList")
	public ResponseEntity<? super GetLatestBoardResponseDto> getSchoolBoardList(){
		ResponseEntity<? super GetLatestBoardResponseDto> response = boardService.getLatestStudyBoardList();
		return response;
	}

	@GetMapping("/latestListBySchool")
	public ResponseEntity<? super GetLatestSchoolBoardResponseDto> getBoardListBySchool(
			@AuthenticationPrincipal String userId
	){
		ResponseEntity<? super GetLatestSchoolBoardResponseDto> response =
				boardService.getLatestSchoolBoardList(userId);
		return response;
	}

	@GetMapping("/latestListBySchoolProject")
	public ResponseEntity<? super GetLatestSchoolBoardResponseDto> getBoardListBySchoolProject(
			@AuthenticationPrincipal String userId
	){
		ResponseEntity<? super GetLatestSchoolBoardResponseDto> response =
				boardService.getLatestSchoolProjectBoardList(userId);
		return response;
	}

	@GetMapping("/latestListBySchoolStudy")
	public ResponseEntity<? super GetLatestSchoolBoardResponseDto> getBoardListBySchoolStudy(
			@AuthenticationPrincipal String userId
	){
		ResponseEntity<? super GetLatestSchoolBoardResponseDto> response =
				boardService.getLatestSchoolStudyBoardList(userId);
		return response;
	}

	@GetMapping("/upload-list")
	public ResponseEntity<? super GetUploadListResponseDto> getUploadList(
			@AuthenticationPrincipal String userId
	){
		ResponseEntity<? super GetUploadListResponseDto> response =
				boardService.getUploadList(userId);
		return response;
	}

	@GetMapping("/applicant/{postId}")
	public ResponseEntity<? super GetApplicantsResponseDto> getApplicants(
			@PathVariable("postId") Integer postId
	){
		ResponseEntity<? super GetApplicantsResponseDto> response = boardService.getApplicants(postId);
		return response;
	}

	@PatchMapping("/{postId}")
	public ResponseEntity<? super PatchBoardResponseDto> patchBoard(
			@RequestBody @Valid PatchBoardRequestDto requestBody,
			@PathVariable("postId") Integer postId,
			@AuthenticationPrincipal String userId
	){
		ResponseEntity<? super PatchBoardResponseDto> response = boardService.patchBoard(requestBody, postId, userId);
		return response;
	}

	@PatchMapping("/expire/{postId}")
	public ResponseEntity<? super ExpireBoardResponseDto> expireBoard(
			@PathVariable("postId") Integer postId,
			@AuthenticationPrincipal String userId
	){
		ResponseEntity<? super ExpireBoardResponseDto> response = boardService.expireBoard(postId, userId);
		return response;
	}

	@DeleteMapping("/{postId}")
	public ResponseEntity<? super DeleteBoardResponseDto> deleteBoard(
		@PathVariable("postId") Integer postId,
		@AuthenticationPrincipal String userId
	){
		ResponseEntity<? super DeleteBoardResponseDto> response = boardService.deleteBoard(postId, userId);
		return response;
	}


}
