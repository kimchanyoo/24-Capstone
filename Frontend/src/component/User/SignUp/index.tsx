import styled from '@emotion/styled';
import React, {useState} from 'react';
import { Title } from 'component/User/Title';
import { CustomLabel } from 'component/User/Label';
import { Button } from '../Button';
import { Header } from '../Header';
import {useNavigate} from "react-router-dom";
import { TextField, Autocomplete } from '@mui/material';
import schoolList from "./schools";
import { EducationStatusSelectBox } from "../EducationStatusSelectBox";
import {ResponseDto} from "../../../apis/response";
import { CheckButton } from "../CheckButton";
import { SchoolCheckCertificationResponseDto } from "apis/response/auth";
import { SchoolCheckCertificationRequestDto } from "apis/request/auth";
import { schoolCheckCertificationRequest } from "apis";
import { SchoolEmailCertificationResponseDto } from "apis/response/auth";
import { SchoolEmailCertificationRequestDto } from "apis/request/auth";
import { schoolEmailCertificationRequest } from "apis";
import { SchoolEmailRecertificationResponseDto } from "apis/response/auth";
import { SchoolEmailRecertificationRequestDto } from "apis/request/auth";
import { schoolEmailRecertificationRequest } from "apis";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #6868ac;
  height: 100vh;
  width: 100vw;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  width: 400px;
  height: 550px;
  border-radius: 30px;
  margin-bottom: 30px;
`;

const InterGroup = styled.div`
  margin-bottom: 12px;
`;

const Group2 = styled.div`
  margin-right: 270px;
`;
const Group = styled.div`
  margin-top: 40px;
`;

export const SignUpPage = () => {
    const navigate = useNavigate();
    const [schoolEmail, setSchoolEmail] = useState(''); // 학교 이메일을 위한 상태
    const [certification, setCertification] = useState<boolean>(false);
    const [educationStatus, setEducationStatus] = useState<number>(0);
    const [school, setSchool] = useState<string>('');
    const [certificationCode, setCertifiactionCode] = useState<number | undefined>(undefined);
    const [buttonColor, setButtonColor] = useState<boolean>(false);

    const handleChangeEducationStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = parseInt(e.target.value, 10); // 문자열을 숫자로 변환
        setEducationStatus(value);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCertifiactionCode(parseInt(e.target.value, 10));
    };

    const onSchoolEmailCertificationButtonClickHandler = () => {
        const requestBody: SchoolEmailCertificationRequestDto = {
            key: "62d9ebdf-1f84-4523-b19e-4960fd06651a",
            univName: school,
            email: schoolEmail,
            univ_check: true
        };
        schoolEmailCertificationRequest(requestBody).then(schoolEmailCertificationResponse);
    };

    const schoolEmailCertificationResponse = (responseBody: SchoolEmailCertificationResponseDto | ResponseDto | null) => {
        console.log('Response Body:', responseBody); // responseBody를 콘솔에 출력
        if (!responseBody) {
            alert("네트워크 이상입니다.");
            return;
        }
        const { success } = responseBody;
        if (success === false) {
            alert("메일 전송을 실패하였습니다.");
            return; // 인증 실패 시 즉시 함수 종료
        }
        else {
            setCertification(true); // 인증이 성공했을 경우 certification 상태를 true로 설정
            alert("메일이 전송되었습니다.");
        }
    }

    const onSchoolEmailRecertificationButtonClickHandler = (email: string) => {
        if (!schoolEmail.trim()) {
            alert('학교 이메일을 입력한 후 초기화 버튼을 클릭해주세요.'); // 필드가 비어있다면 사용자에게 알림
            return;
        }
        const requestBody: SchoolEmailRecertificationRequestDto = {
            key: "62d9ebdf-1f84-4523-b19e-4960fd06651a",
        };
        schoolEmailRecertificationRequest(email, requestBody).then(schoolEmailRecertificationResponse);
    };

    const schoolEmailRecertificationResponse = (responseBody: SchoolEmailRecertificationResponseDto | ResponseDto | null) => {
        console.log('Response Body:', responseBody); // responseBody를 콘솔에 출력
        if (!responseBody) {
            alert("네트워크 이상입니다.");
            return;
        }
        const { success } = responseBody;
        if (success === false) {
            alert("메일 인증 초기화에 실패하였습니다.");
            return; // 인증 실패 시 즉시 함수 종료
        }
        else {
            alert("메일 인증이 초기화 되었습니다. 다시 이메일을 인증해주세요");
        }
    }

    const onSchoolCheckCertificationButtonClickHandler = () => {
        const requestBody: SchoolCheckCertificationRequestDto = {
            key: "62d9ebdf-1f84-4523-b19e-4960fd06651a",
            univName: school,
            email: schoolEmail,
            code: certificationCode
        };
        schoolCheckCertificationRequest(requestBody).then(schoolCheckCertificationResponse);
    };

    const schoolCheckCertificationResponse = (responseBody: SchoolCheckCertificationResponseDto | ResponseDto | null) => {
        console.log('Response Body:', responseBody); // responseBody를 콘솔에 출력
        if (!responseBody) {
            alert("네트워크 이상입니다.");
            return;
        }
        const { success } = responseBody;
        if (success === false) {
            alert("인증에 실패하셨습니다.");
            return; // 인증 실패 시 즉시 함수 종료
        }
        else {
            setCertification(true); // 인증이 성공했을 경우 certification 상태를 true로 설정
            setButtonColor(true);
            alert("인증에 성공하셨습니다.");
        }
    };


    const handleNextClick = () => {
        // 모든 입력 필드가 채워졌는지 검사
        if (!school?.trim() || !schoolEmail.trim()) {
            alert('회원 가입 양식을 모두 채워주세요.'); // 필드가 비어있다면 사용자에게 알림
            return; // 리다이렉션을 방지
        }
        if(!certification) {
            alert('학교 인증을 해주세요.');
            return;
        }
        navigate('/SignUp2', {
            state: {
                school: school,
                educationStatus: educationStatus
            }
        });
    };

    return (
        <>
            <Header />
            <Container>
                <Content>
                    <Title label="회원가입" color="#6868AC"/>
                    <Group>
                        <Group2>
                            <Title label="학교 선택" color="#000000"/>
                        </Group2>
                        <InterGroup>
                            <CustomLabel label="학교" color="#727272"/>
                            <Autocomplete
                                options={schoolList}
                                getOptionLabel={(option) => option} // 옵션을 어떻게 표시할지 정의합니다.
                                value={school} // 선택된 학교 이름
                                onChange={(event, newValue) => {
                                    setSchool(newValue || ''); // 선택된 학교 이름을 업데이트
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        variant="outlined"
                                        InputProps={{
                                            ...params.InputProps,
                                            style: {
                                                height: '40px', // 텍스트 박스의 전체 높이
                                                borderRadius: '0px',
                                                paddingBottom: '40px', // 아래쪽 패딩
                                                paddingTop: '0px', // 아래쪽 패딩
                                                paddingLeft: '0px', // 아래쪽 패딩
                                            },
                                        }}
                                    />
                                )}
                            />
                        </InterGroup>
                        <InterGroup>
                            <CustomLabel label="학교 이메일" color="#727272"/>
                            <CheckButton
                                label="이메일"
                                type="text"
                                value={schoolEmail}
                                buttonLabel="인증"
                                color="#7C7FD1"
                                onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setSchoolEmail(e.target.value)}
                                onClick={onSchoolEmailCertificationButtonClickHandler}
                            />
                        </InterGroup>
                        <InterGroup>
                            <CustomLabel label="인증 번호" color="#727272"/>
                            <CheckButton
                                label="인증번호"
                                type="text"
                                value={certificationCode}
                                buttonLabel="확인"
                                color="#7C7FD1"
                                onChange={handleChange}
                                onClick={onSchoolCheckCertificationButtonClickHandler}
                            />
                        </InterGroup>
                        <InterGroup>
                            <CustomLabel label="학적 종류" color="#727272"/>
                            <EducationStatusSelectBox value={educationStatus} name="educationStatus" onChange={handleChangeEducationStatus}/>
                        </InterGroup>
                    </Group>
                    <InterGroup />
                    <Button label="메일 인증 초기화" color={buttonColor ? "#C9C9C9" : "#7C7FD1"} onClickHandler={onSchoolEmailRecertificationButtonClickHandler} />
                    <InterGroup />
                    <Button label="다음" color={buttonColor ? "#7C7FD1" : "#C9C9C9"} onClick={handleNextClick} />
                </Content>
            </Container>
        </>
    );
};
