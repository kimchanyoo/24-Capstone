package com.teami.capstone.DTO.Response.Board;

import com.teami.capstone.Common.Error.ResponseCode;
import com.teami.capstone.Common.Error.ResponseMessage;
import com.teami.capstone.DTO.Object.ApplicantListItem;
import com.teami.capstone.DTO.Response.ResponseDto;
import com.teami.capstone.Repository.ResultSet.GetApplicantResultSet;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;

@Getter
public class GetApplicantsResponseDto extends ResponseDto {

	private List<ApplicantListItem> applicantList;

	private GetApplicantsResponseDto(List<GetApplicantResultSet> applicantEntities){
		super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
		this.applicantList = ApplicantListItem.getList(applicantEntities);
	}

	public static ResponseEntity<GetApplicantsResponseDto> success(List<GetApplicantResultSet> applicantEntities){
		GetApplicantsResponseDto responseBody = new GetApplicantsResponseDto(applicantEntities);
		return ResponseEntity.status(HttpStatus.OK).body(responseBody);
	}

}
