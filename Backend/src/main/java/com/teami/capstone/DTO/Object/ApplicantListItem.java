package com.teami.capstone.DTO.Object;

import com.teami.capstone.Repository.ResultSet.GetApplicantResultSet;
import com.teami.capstone.Repository.ResultSet.GetBoardListResultSet;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ApplicantListItem {

	private Integer postId;
	private String nickName;
	private String email;

	public ApplicantListItem(GetApplicantResultSet applicantResultSet){
		this.postId = applicantResultSet.getPostId();
		this.nickName = applicantResultSet.getNickName();
		this.email = applicantResultSet.getEmail();
	}

	public static List<ApplicantListItem> getList(List<GetApplicantResultSet> applicantResultSets){
		List<ApplicantListItem> list = new ArrayList<>();
		for(GetApplicantResultSet applicant : applicantResultSets){
			ApplicantListItem boardListItem = new ApplicantListItem(applicant);
			list.add(boardListItem);
		}
		return list;
	}
}
