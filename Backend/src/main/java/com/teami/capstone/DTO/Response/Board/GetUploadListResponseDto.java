package com.teami.capstone.DTO.Response.Board;

import com.teami.capstone.Common.Error.ResponseCode;
import com.teami.capstone.Common.Error.ResponseMessage;
import com.teami.capstone.DTO.Object.UploadListItem;
import com.teami.capstone.DTO.Response.ResponseDto;
import com.teami.capstone.Repository.ResultSet.GetBoardListResultSet;
import com.teami.capstone.Repository.ResultSet.GetUploadListResultSet;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;

@Getter
public class GetUploadListResponseDto extends ResponseDto {

	private List<UploadListItem> uploadListItem;

	private GetUploadListResponseDto(List<GetUploadListResultSet> uploadList){
		super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
		this.uploadListItem = UploadListItem.getList(uploadList);
	}

	public static ResponseEntity<GetUploadListResponseDto> success(List<GetUploadListResultSet> uploadList){
		GetUploadListResponseDto responseBody = new GetUploadListResponseDto(uploadList);
		return ResponseEntity.status(HttpStatus.OK).body(responseBody);
	}
}
