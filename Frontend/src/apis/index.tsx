import {SignInRequestDto, SignUpRequestDto} from "./request/auth";
import axios from 'axios';
import { SignInResponseDto, SignUpResponseDto } from 'apis/response/auth';
import {ResponseDto} from './response';
import { GetSignInUserResponseDto } from 'apis/response/user'
import { ShowUserInformationResponseDto } from 'apis/response/user'
import {PostApplyBoardRequestDto, PatchBoardRequestDto, PostBoardRequestDto } from "./request/board";
import {DeleteBoardResponseDto,
    GetAllBoardListResponseDto, GetBoardResponseDto,
    GetProjectBoardListResponseDto, GetStudyBoardListResponseDto, PatchBoardResponseDto, PostBoardResponseDto, GetMyBoardListResponseDto, PostApplyBoardResponseDto, GetApplyBoardResponseDto, GetProjectSchoolBoardListResponseDto, GetStudySchoolBoardListResponseDto, GetAllSchoolBoardListResponseDto } from "./response/board";
import React from "react";
import { EmailCertificationRequestDto } from './request/auth';
import { EmailCertificationResponseDto } from 'apis/response/auth';
import { CheckCertificationRequestDto } from './request/auth';
import { CheckCertificationResponseDto } from 'apis/response/auth';
import { IDCheckRequestDto } from './request/auth';
import { IDCheckResponseDto } from './response/auth';
import { NicknameCheckRequestDto } from './request/auth';
import { NicknameCheckResponseDto } from './response/auth';
import { SchoolEmailCertificationRequestDto } from './request/auth';
import { SchoolEmailCertificationResponseDto } from './response/auth';
import { SchoolCheckCertificationRequestDto } from './request/auth';
import { SchoolCheckCertificationResponseDto } from './response/auth';
import { SchoolEmailRecertificationRequestDto } from './request/auth';
import { SchoolEmailRecertificationResponseDto } from './response/auth';
import { UpdateInformationRequestDto } from './request/user';
import { UpdateInformationResponseDto } from './response/user';
import { DeleteInformationResponseDto } from './response/user';
import { FindIdRequestDto } from './request/auth';
import { FindIdResponseDto } from './response/auth';
import { FindPwdRequestDto } from './request/auth';
import { FindPwdResponseDto } from './response/auth';
import { ResetPwdRequestDto } from './request/auth';
import { ResetPwdResponseDto } from './response/auth';
import { CheckPasswordRequestDto } from './request/auth';
import { CheckPasswordResponseDto } from './response/auth';
import { UserClickResponseDto } from './response/auth';
import { UserClickRequestDto } from './request/auth';


const DOMAIN = 'http://www.teami.kr:42957';
const API_DOMAIN =`${DOMAIN}/api/v1`;
const EMAIL_DOMAIN = 'http://130.162.153.228:8080';
const EMAIL_API_DOMAIN = `${EMAIL_DOMAIN}/api/v1`;
const authorization = (accessToken: string) => {
    return { headers: {Authorization: `Bearer ${accessToken}`}}
};


const SIGN_IN_URL = () => `${API_DOMAIN}/auth/sign-in`;
const SIGN_UP_URL = () => `${API_DOMAIN}/auth/sign-up`;
const EMAIL_CERTIFICATION_URL = () => `${EMAIL_API_DOMAIN}/auth/email-certification`;
const CHECK_CERTIFICATION_URL = () => `${API_DOMAIN}/auth/check-certification`;
const ID_CHECK_URL = () => `${API_DOMAIN}/auth/id-check`;
const NICKNAME_CHECK_URL = () => `${API_DOMAIN}/auth/nickname-check`;
const SCHOOL_EMAIL_CERTIFICATION_URL = () => `https://univcert.com/api/v1/certify`;
const SCHOOL_CHECK_CERTIFICATION_URL = () => `https://univcert.com/api/v1/certifycode`;
const SCHOOL_EMAIL_RECERTIFICATION_URL = (email: string) => `https://univcert.com/api/v1/clear/${email}`;
const FIND_ID_URL = () => `${API_DOMAIN}/auth/findId`;
const FIND_PWD_URL = () => `${EMAIL_API_DOMAIN}/auth/findPassword`;
const RESET_PWD_URL = () => `${API_DOMAIN}/auth/resetPassword`;
const CHECK_PASSWORD_URL = ()=> `${API_DOMAIN}/auth/comparisonPassword`;
const USER_CLICK_URL = () => `${API_DOMAIN}/auth/userProfile`;

export const signInRequest = async (requestBody: SignInRequestDto): Promise<SignInResponseDto | ResponseDto | null> => {
    console.log('Request body:', requestBody);
    try {
        const response = await axios.post(SIGN_IN_URL(), requestBody);
        return response.data as SignInResponseDto;
    } catch (error: any) { // error 변수에 any 타입 지정
        if (!error.response || !error.response.data) {
            return null;
        }
        return error.response.data as ResponseDto;
    }
};

export const signUpRequest = async (requestBody: SignUpRequestDto) => {
    try {
        const response = await axios.post(SIGN_UP_URL(), requestBody);
        return response.data as SignUpResponseDto;
    } catch (error: any) {
        if (!error.response || !error.response.data) {
            return null;
        }
        return error.response.data as ResponseDto;
    }
}

export const emailCertificationRequest = async (requestBody: EmailCertificationRequestDto): Promise<EmailCertificationResponseDto | ResponseDto | null> => {
    console.log('Request body:', requestBody);
    try {
        const response = await axios.post(EMAIL_CERTIFICATION_URL(), requestBody);
        return response.data as EmailCertificationResponseDto;
    } catch (error: any) {
        if (!error.response || !error.response.data) {
            return null;
        }
        return error.response.data as ResponseDto;
    }
}

export const checkCertificationRequest = async (requestBody: CheckCertificationRequestDto): Promise<CheckCertificationResponseDto | ResponseDto | null> => {
    console.log('Request body:', requestBody);
    try {
        const response = await axios.post(CHECK_CERTIFICATION_URL(), requestBody);
        return response.data as CheckCertificationResponseDto;
    } catch (error: any) {
        if (!error.response || !error.response.data) {
            return null;
        }
        return error.response.data as ResponseDto;
    }
}

export const schoolEmailCertificationRequest = async (requestBody: SchoolEmailCertificationRequestDto): Promise<SchoolEmailCertificationResponseDto | ResponseDto | null> => {
    console.log('Request body:', requestBody);
    try {
        const response = await axios.post(SCHOOL_EMAIL_CERTIFICATION_URL(), requestBody);
        return response.data as SchoolEmailCertificationResponseDto;
    } catch (error: any) {
        if (!error.response || !error.response.data) {
            return null;
        }
        return error.response.data as ResponseDto;
    }
}


export const schoolCheckCertificationRequest = async (requestBody: SchoolCheckCertificationRequestDto): Promise<SchoolCheckCertificationResponseDto | ResponseDto | null> => {
    console.log('Request body:', requestBody);
    try {
        const response = await axios.post(SCHOOL_CHECK_CERTIFICATION_URL(), requestBody);
        return response.data as SchoolCheckCertificationResponseDto;
    } catch (error: any) {
        if (!error.response || !error.response.data) {
            return null;
        }
        return error.response.data as ResponseDto;
    }
}

export const schoolEmailRecertificationRequest = async (email: string, requestBody: SchoolEmailRecertificationRequestDto): Promise<SchoolEmailRecertificationResponseDto | ResponseDto | null> => {
    console.log('Request body:', requestBody);
    try {
        const response = await axios.post(SCHOOL_EMAIL_RECERTIFICATION_URL(email), requestBody);
        return response.data as SchoolEmailRecertificationResponseDto;
    } catch (error: any) {
        if (!error.response || !error.response.data) {
            return null;
        }
        return error.response.data as ResponseDto;
    }
}

export const idCheckRequest = async (requestBody: IDCheckRequestDto): Promise<IDCheckResponseDto | ResponseDto | null> => {
    console.log('Request body:', requestBody);
    try {
        const response = await axios.post(ID_CHECK_URL(), requestBody);
        return response.data as IDCheckResponseDto;
    } catch (error: any) {
        if (!error.response || !error.response.data) {
            return null;
        }
        return error.response.data as ResponseDto;
    }
}

export const nicknameCheckRequest = async (requestBody: NicknameCheckRequestDto): Promise<NicknameCheckResponseDto | ResponseDto | null> => {
    console.log('Request body:', requestBody);
    try {
        const response = await axios.post(NICKNAME_CHECK_URL(), requestBody);
        return response.data as NicknameCheckResponseDto;
    } catch (error: any) {
        if (!error.response || !error.response.data) {
            return null;
        }
        return error.response.data as ResponseDto;
    }
}

export const findIdRequest = async (requestBody: FindIdRequestDto): Promise<FindIdResponseDto | ResponseDto | null> => {
    console.log('Request body:', requestBody);
    try {
        const response = await axios.post(FIND_ID_URL(), requestBody);
        return response.data as FindIdResponseDto;
    } catch (error: any) {
        if (!error.response || !error.response.data) {
            return null;
        }
        return error.response.data as ResponseDto;
    }
}

export const findPwdRequest = async (requestBody: FindPwdRequestDto): Promise<FindPwdResponseDto | ResponseDto | null> => {
    console.log('Request body:', requestBody);
    try {
        const response = await axios.post(FIND_PWD_URL(), requestBody);
        return response.data as FindPwdResponseDto;
    } catch (error: any) {
        if (!error.response || !error.response.data) {
            return null;
        }
        return error.response.data as ResponseDto;
    }
}

export const resetPwdRequest = async (requestBody: ResetPwdRequestDto, accessToken: string)=> {
    const result = await axios.patch(RESET_PWD_URL(), requestBody, authorization(accessToken))
        .then(response => {
            const responseBody: ResetPwdResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            if (!error.response) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        })
    return result;
}

export const checkPasswordRequest = async (requestBody: CheckPasswordRequestDto, accessToken: string)=> {
    const result = await axios.post(CHECK_PASSWORD_URL(), requestBody, authorization(accessToken))
        .then(response => {
            const responseBody: CheckPasswordResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            if (!error.response) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        })
    return result;
}

export const userClickRequest = async (requestBody: UserClickRequestDto): Promise<UserClickResponseDto | ResponseDto | null> => {
    console.log('Request body:', requestBody);
    try {
        const response = await axios.post(USER_CLICK_URL(), requestBody);
        return response.data as UserClickResponseDto;
    } catch (error: any) {
        if (!error.response || !error.response.data) {
            return null;
        }
        return error.response.data as ResponseDto;
    }
}

// Header 로그인 조건부 렌더링
const GET_SIGN_IN_USER_URL = () => `${API_DOMAIN}/user`;
const SHOW_USER_INFORMATION_URL = () => `${API_DOMAIN}/user/userProfile`;
const UPDATE_INFORMATION_URL = () => `${API_DOMAIN}/user/userProfile`;
const DELETE_INFORMATION_URL = (userId: string) => `${API_DOMAIN}/user/${userId}`;


export const getSignInUserRequest = async (accessToken: string) => {
    const result = await  axios.get(GET_SIGN_IN_USER_URL(), authorization(accessToken))
        .then(response => {
            const responseBody: GetSignInUserResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            if (!error.response) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        });
    return result;
}

export const showUserInformationRequest = async (accessToken: string) => {
    const result = await  axios.get(SHOW_USER_INFORMATION_URL(), authorization(accessToken))
        .then(response => {
            const responseBody: ShowUserInformationResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            if (!error.response) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        });
    return result;
}

export const updateInformationRequest = async (requestBody: UpdateInformationRequestDto, accessToken: string)=> {
    const result = await axios.patch(UPDATE_INFORMATION_URL(), requestBody, authorization(accessToken))
        .then(response => {
            const responseBody: UpdateInformationResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            if (!error.response) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        })
    return result;
}

export const deleteInformationRequest = async (userId: string, accessToken: string) => {
    const result = await axios.delete(DELETE_INFORMATION_URL(userId), authorization(accessToken))
        .then(response => {
            const responseBody: DeleteInformationResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            if (!error.response) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        });
    return result;
}

// 게시물 등록
const POST_DOMAIN = `${DOMAIN}/api/v1/board`;
const POST_BOARD_URL = () => `${POST_DOMAIN}/boardInsert`

export const postBoardRequest = async (requestBody: PostBoardRequestDto, accessToken: string) => {
    const result = await axios.post(POST_BOARD_URL(), requestBody, authorization(accessToken))
        .then(response => {
            const responseBody: PostBoardResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            if (!error.response) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        })
    return result;
}

// 게시물 정보 받아오기
const GET_BOARD_URL = (postId: number | string) => `${POST_DOMAIN}/${postId}`;

export const getBoardRequest = async (postId: number | string) => {
    const result = await axios.get(GET_BOARD_URL(postId))
        .then(response=> {
            const responseBody: GetBoardResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            if (!error.response) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        })
    return result;
}

//게시물 삭제
const DELETE_BOARD_URL = (postId: number | string) => `${POST_DOMAIN}/${postId}`;

export const deleteBoardRequest = async (postId: number | string, accessToken: string) => {
    const result = await axios.delete(DELETE_BOARD_URL(postId), authorization(accessToken))
        .then(response=> {
            const responseBody: DeleteBoardResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            if (!error.response) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        })
    return result;
}

// 게시물 수정
const PATCH_BOARD_URL = (postId: number | string) => `${POST_DOMAIN}/${postId}`;

export const patchBoardRequest = async (postId: number | string, requestBody:PatchBoardRequestDto, accessToken: string)=> {
    const result = await axios.patch(PATCH_BOARD_URL(postId), requestBody, authorization(accessToken))
        .then(response => {
            const responseBody: PatchBoardResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            if (!error.response) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        })
    return result;
}

// 메인 게시물 불러오기 (비로그인)
const GET_ALL_BOARD_LIST_URL = () => `${POST_DOMAIN}/latest-list`;
const GET_PROJECT_BOARD_LIST_URL = () => `${POST_DOMAIN}/latest-projectList`;
const GET_STUDY_BOARD_LIST_URL = () => `${POST_DOMAIN}/latest-studyList`;

export const getAllBoardListRequest = async () => {
    const result = await axios.get(GET_ALL_BOARD_LIST_URL())
        .then(response => {
            const responseBody: GetAllBoardListResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            if (!error.response) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        })
    return result;
}
export const getProjcetBoardListRequest = async () => {
    const result = await axios.get(GET_PROJECT_BOARD_LIST_URL())
        .then(response => {
            const responseBody: GetProjectBoardListResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            if (!error.response) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        })
    return result;
}
export const getStudyBoardListRequest = async () => {
    const result = await axios.get(GET_STUDY_BOARD_LIST_URL())
        .then(response => {
            const responseBody: GetStudyBoardListResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            if (!error.response) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        })
    return result;
}

// 내가 쓴 글 확인
const GET_MY_BOARD_LIST_URL = () => `${POST_DOMAIN}/upload-list`;

export const getMyBoardListRequest = async (accessToken: string) => {
    const result = await axios.get(GET_MY_BOARD_LIST_URL(), authorization(accessToken))
        .then(response => {
            const responseBody: GetMyBoardListResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            if (!error.response) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        })
    return result;
}

// 글 지원하기
const POST_APPLY_BOARD_URL = () => `${POST_DOMAIN}/application`;

export const postApplyBoardRequest = async (requestBody:PostApplyBoardRequestDto, accessToken: string) => {
    const result = await axios.post(POST_APPLY_BOARD_URL(), requestBody, authorization(accessToken))
        .then(response => {
            const responseBody: PostApplyBoardResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            if (!error.response) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        })
    return result;
}

// 글 지원자 확인하기
const GET_APPLY_BOARD_URL = (postId: number | string) => `${POST_DOMAIN}/applicant/${postId}`

export const getApplyBoardRequest = async (postId: number | string) => {
    const result = await axios.get(GET_APPLY_BOARD_URL(postId))
        .then(response=> {
            const responseBody: GetApplyBoardResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            if (!error.response) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        })
    return result;
}

// 메인 게시물 불러오기 (로그인)
const GET_ALL_SCHOOL_BOARD_LIST_URL = () => `${POST_DOMAIN}/latestListBySchool`;
const GET_PROJECT_SCHOOL_BOARD_LIST_URL = () => `${POST_DOMAIN}/latestListBySchoolProject`;
const GET_STUDY_SCHOOL_BOARD_LIST_URL = () => `${POST_DOMAIN}/latestListBySchoolStudy`;

export const getAllSchoolBoardListRequest = async (accessToken: string) => {
    const result = await axios.get(GET_ALL_SCHOOL_BOARD_LIST_URL(), authorization(accessToken))
        .then(response => {
            const responseBody: GetAllSchoolBoardListResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            if (!error.response) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        })
    return result;
}
export const getProjcetSchoolBoardListRequest = async (accessToken: string) => {
    const result = await axios.get(GET_PROJECT_SCHOOL_BOARD_LIST_URL(), authorization(accessToken))
        .then(response => {
            const responseBody: GetProjectSchoolBoardListResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            if (!error.response) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        })
    return result;
}
export const getStudySchoolBoardListRequest = async (accessToken: string) => {
    const result = await axios.get(GET_STUDY_SCHOOL_BOARD_LIST_URL(), authorization(accessToken))
        .then(response => {
            const responseBody: GetStudySchoolBoardListResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            if (!error.response) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        })
    return result;
}