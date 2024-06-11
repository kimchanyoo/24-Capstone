package com.teami.capstone.Repository.ResultSet;

import java.time.LocalDate;

public interface GetBoardListResultSet {

	Integer getPostId();
	String getNickName();
	Integer getRecruitmentClassification();
	Integer getRecruitmentPerson();
	LocalDate getDeadLine();
	String getTitle();

	boolean getTermination();

}
