package com.teami.capstone.Common.Error;

public interface ResponseMessage {

	String SUCCESS = "Success.";

	String VALIDATION_FAIL = "Validation failed.";
	String DUPLICATE_ID = "Duplicate Id.";
	String DUPLICATE_APPLICANT = "Duplicate Applicant.";
	String DUPLICATE_NICKNAME = "Duplicate NickName.";

	String SIGN_IN_FAIL = "Login information mismatch.";
	String CETIFICATION_FAIL = "Certification failed.";
	String AUTHORIZATION_FAIL = "Authorization failed.";

	String UNMATCHEDPASSWORD = "Unmatched Password.";

	String NO_PERMISSION = "No Permission";

	String MAIL_FAIL = "Mail send failed";
	String DATABASE_ERROR = "DataBase error";

	String NOT_EXISTED_USER = "This User is not exist.";
	String NOT_EXISTED_BOARD = "This Board is not exist.";
}
