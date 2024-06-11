package com.teami.capstone.DTO.Response.Board;

import com.teami.capstone.Common.Error.ResponseCode;
import com.teami.capstone.Common.Error.ResponseMessage;
import com.teami.capstone.DTO.Object.BoardListItem;
import com.teami.capstone.DTO.Response.ResponseDto;
import com.teami.capstone.Repository.ResultSet.GetBoardListResultSet;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;

@Getter
public class GetLatestBoardResponseDto extends ResponseDto {

	private List<BoardListItem> latestList;

	private GetLatestBoardResponseDto(List<GetBoardListResultSet> boardEntities){
		super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
		this.latestList = BoardListItem.getList(boardEntities);
	}

	public static ResponseEntity<GetLatestBoardResponseDto> success(List<GetBoardListResultSet> boardEntities){
		GetLatestBoardResponseDto responseBody = new GetLatestBoardResponseDto(boardEntities);
		return ResponseEntity.status(HttpStatus.OK).body(responseBody);
	}
}
