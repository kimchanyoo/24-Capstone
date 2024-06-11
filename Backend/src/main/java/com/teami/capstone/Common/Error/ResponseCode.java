package com.teami.capstone.Common.Error;

public interface ResponseCode {
	String SUCCESS = "SU";

	String VALIDATION_FAIL = "VF";
	String DUPLICATE_ID = "DI";

	String DUPLICATE_APPLICANT = "DA";

	String DUPLICATE_NICKNAME = "DN";
	String NO_PERMISSION = "NP";

	String SIGN_IN_FAIL = "SF";
	String CETIFICATION_FAIL = "CF";
	String AUTHORIZATION_FAIL = "AF";
	String UNMATCHEDPASSWORD = "UP";

	String MAIL_FAIL = "MF";
	String DATABASE_ERROR = "DBE";

	String NOT_EXISTED_USER = "NU";
	String NOT_EXISTED_BOARD = "NB";
}
