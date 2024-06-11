package com.teami.capstone.Repository.ResultSet;

import java.time.LocalDate;
import java.util.List;

public interface GetBoardResultSet {

	Integer getPostId();
	String getUserId();
	String getNickName();
	Integer getRecruitmentClassification();
	Integer getRecruitmentPerson();
	Integer getProcessing();
	Integer getProcessingDuration();
	LocalDate getDeadLine();
	String getTitle();
	String getBody();
}
