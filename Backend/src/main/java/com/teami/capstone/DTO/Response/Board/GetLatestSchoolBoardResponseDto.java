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
public class GetLatestSchoolBoardResponseDto extends ResponseDto {

	private List<BoardListItem> boardListItem;

	private GetLatestSchoolBoardResponseDto(List<GetBoardListResultSet> getBoardResultSetList){
		super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
		this.boardListItem = BoardListItem.getList(getBoardResultSetList);
	}

	public static ResponseEntity<GetLatestSchoolBoardResponseDto> success(List<GetBoardListResultSet> boardEntities) {
		GetLatestSchoolBoardResponseDto responseBody = new GetLatestSchoolBoardResponseDto(boardEntities);
		return ResponseEntity.status(HttpStatus.OK).body(responseBody);
	}

}
