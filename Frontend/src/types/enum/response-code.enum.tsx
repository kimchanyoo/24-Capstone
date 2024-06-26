enum ResponseCode {
    // HTTP Status 200
    SUCCESS = "SU",

    // HTTP Status 400
    VALIDATION_FAILED = "VF",
    DUPLICATE_EMAIL = "DE",
    DUPLICATE_NICKNAME = "DN",
    DUPLICATE_TEL_NUMBER = "DI",
    NOT_EXISTED_USER = "NU",
    NOT_EXISTED_BOARD = "NB",
    DUPLICATE_APPLICATION = "DA",

    // HTTP Status 401
    SIGN_IN_FAIL = "SF",
    AUTHORIZATION_FAIL = "AF",
    CERTIFICATION_FAILED = "CF",
    UNMATCHED_PASSWORD = "UP",

    // HTTP Status 403
    NO_PERMISSION = "NP",

    // HTTP Status 500
    DATABASE_ERROR = "DBE",

    // HTTP status 500
    MATIL_SEND_FAILED = "MF"
}

export default ResponseCode;