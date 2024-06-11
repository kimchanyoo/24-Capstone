import styled from '@emotion/styled';
import React, { useState, useEffect } from 'react';
import { Title } from 'component/User/Title';
import { Header } from "../Header";
import { Button } from '../Button';
import { useNavigate } from "react-router-dom";
import { InputBox } from "../InputBox";
import { CheckButton } from "../CheckButton";
import { useLocation } from "react-router-dom";
import { EmailCertificationResponseDto } from "apis/response/auth";
import { EmailCertificationRequestDto } from "apis/request/auth";
import { emailCertificationRequest } from "apis";
import {ResponseDto} from "../../../apis/response";
import { CheckCertificationResponseDto } from "apis/response/auth";
import { CheckCertificationRequestDto } from "apis/request/auth";
import { checkCertificationRequest } from "apis";
import { IDCheckRequestDto } from "apis/request/auth";
import { IDCheckResponseDto } from "apis/response/auth";
import { idCheckRequest } from "apis";
import { NicknameCheckRequestDto } from "apis/request/auth";
import { NicknameCheckResponseDto } from "apis/response/auth";
import { nicknameCheckRequest } from "apis";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #6868ac;
  height: 100vh;
  width: 100vw;
`;

const StyledHeader = styled.header`
  margin-top: 32px; /* 원하는 값으로 조정 */
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  width: 400px;
  height: 600px;
  border-radius: 30px;
  overflow-y: scroll;
`;

const InterGroup = styled.div`
  margin-bottom: 17px;
`;

const Group = styled.div`
  margin-top: 35px;
  margin-bottom: 20px;
`;

export const SignUpPage4 = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [nickname, setNickname] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [emailCertification, setEmailCertification] = useState('');
    const [certificationCheck, setCertificationCheck] = useState<boolean>(false);
    const [ID, setID] = useState('');
    const [PW, setPW] = useState('');
    const [PWCheck, setPWCheck] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [showCertificationInput, setShowCertificationInput] = useState(false);

    const [nameError, setNameError] = useState<boolean>(false);
    const [nicknameError, setNicknameError] = useState<boolean>(false);
    const [emailError, setEmailError] = useState<boolean>(false);
    const [emailCertificaitonError, setEmailCertificationError] = useState<boolean>(false);
    const [passwordError, setPasswordError] = useState<boolean>(false);
    const [passwordCheckError, setPasswordCheckError] = useState<boolean>(false);
    const [phoneNumberError, setPhoneNumberError] = useState<boolean>(false);
    const [idError, setIDError] = useState<boolean>(false);

    const [school, setSchool] = useState(location.state?.school || '');
    const [schoolEmail, setSchoolEmail] = useState(location.state?.schoolEmail || '');
    const [educationStatus, setEducationStatus] = useState<number>(location.state?.educationStatus);
    const [department, setDepartment] = useState(location.state?.department || '');

    const onIDCheckButtonClickHandler = () => {
        const isIDPattern = ID.trim().length >= 4 && ID.trim().length <= 20;
        if(!isIDPattern) {
            setIDError(true);
            alert('아이디는 4자 이상 20자 이하로 설정해주세요');
            return;
        }
        const requestBody: IDCheckRequestDto= {
            userId: ID
        };
        idCheckRequest(requestBody).then(idCheckResponse);
    }
    const idCheckResponse = (responseBody: IDCheckResponseDto | ResponseDto | null) => {
        console.log('Response Body:', responseBody); // responseBody를 콘솔에 출력
        if (!responseBody) {
            alert("네트워크 이상입니다.");
            return;
        }
        const {code} = responseBody;
        if (code === 'DBE') alert("데이터베이스 오류입니다.");
        if (code === 'VF') alert("이메일을 양식에 맞게 입력해주세요.");
        if (code === 'DI') alert("중복된 아이디입니다.");
        if (code !== 'SU') return;


        alert("사용가능한 아이디입니다.")
    }

    const onNicknameCheckButtonClickHandler = () => {
        const isNicknamePattern = nickname.trim().length >= 2 && nickname.trim().length <= 10;
        if(!isNicknamePattern) {
            setNicknameError(true);
            alert('닉네임은 2자 이상 10자 이하로 설정해주세요');
            return;
        }
        const requestBody: NicknameCheckRequestDto= {
            nickName: nickname
        };
        nicknameCheckRequest(requestBody).then(nicknameCheckResponse);
    }
    const nicknameCheckResponse = (responseBody: NicknameCheckResponseDto | ResponseDto | null) => {
        console.log('Response Body:', responseBody); // responseBody를 콘솔에 출력
        if (!responseBody) {
            alert("네트워크 이상입니다.");
            return;
        }
        const {code} = responseBody;
        if (code === 'DBE') alert("데이터베이스 오류입니다.");
        if (code === 'VF') alert("이메일을 양식에 맞게 입력해주세요.");
        if (code === 'DN') alert("중복된 닉네임입니다.");
        if (code !== 'SU') return;

        alert("사용가능한 닉네임입니다.")
    }

    const onEmailCertificationButtonClickHandler = () => {
        const emailPattern = /^[a-zA-Z0-9]*@([-.]?[a-zA-Z0-9])*\.[a-zA-Z]{2,4}$/;
        const isEmailPattern = emailPattern.test(email);

        if (!isEmailPattern) {
            setEmailError(true);
            alert('이메일 형식이 맞지 않습니다.');
            return;
        }
        const requestBody: EmailCertificationRequestDto = {
            email: email
        };
        emailCertificationRequest(requestBody).then(emailCertificationResponse);
    };

    const emailCertificationResponse = (responseBody: EmailCertificationResponseDto | ResponseDto | null) => {
        console.log('Response Body:', responseBody); // responseBody를 콘솔에 출력
        if (!responseBody) {
            alert("네트워크 이상입니다.");
            return;
        }
        const {code} = responseBody;
        if (code === 'DBE') alert("데이터베이스 오류입니다.");
        if (code === 'VF') alert("이메일을 양식에 맞게 입력해주세요.");
        if (code === 'MF') alert("메일 전송을 실패하였습니다");
        if (code !== 'SU') return;

        setCertificationCheck(true);
        setShowCertificationInput(true);
        alert("메일이 전송되었습니다.")
    }


    const onCheckCertificationButtonClickHandler = () => {
        const isEmailCertification = emailCertification.trim().length == 6;
        if(!isEmailCertification) {
            setEmailCertificationError(true);
            alert('인증번호 6자리가 일치하지 않습니다.');
            return;
        }
        const requestBody: CheckCertificationRequestDto = {
            email: email,
            certificationNumber: emailCertification
        };
        checkCertificationRequest(requestBody).then(checkCertificationResponse);
    };
    const checkCertificationResponse = (responseBody: CheckCertificationResponseDto | ResponseDto | null) => {
        console.log('Response Body:', responseBody); // responseBody를 콘솔에 출력
        if (!responseBody) {
            alert("네트워크 이상입니다.");
            return;
        }
        const {code} = responseBody;
        if (code === 'DBE') alert("데이터베이스 오류입니다.");
        if (code === 'VF') alert("이메일을 양식에 맞게 입력해주세요.");
        if (code === 'CF') alert("인증에 실패하였습니다");
        if (code !== 'SU') return;

        alert("인증되었습니다.")
    }

    const onNextButtonClickHandler = () => {

        const isNamePattern = name.trim().length >= 2 && name.trim().length <= 10;
        if(!isNamePattern) {
            setNameError(true);
            alert('이름은 2자 이상 10자 이하입니다.')
        }

        const isCheckedPassword = PW.trim().length >= 8 && PW.trim.length <= 20;
        if(!isCheckedPassword) {
            setPasswordError(true);
            alert('비밀번호는 8자 이상 20자 이하로 설정해주세요.');
        }

        const isEqualPassword = PW === PWCheck;
        if(!isEqualPassword) {
            setPasswordCheckError(true);
            alert('비밀번호가 일치하지 않습니다.');
        }
        const isPhoneNumber = /^01[0-9]-[0-9]{3,4}-[0-9]{4}$/;
        const isPhoneNumberPattern = isPhoneNumber.test(phoneNumber);
        if(!isPhoneNumberPattern) {
            setPhoneNumberError(true);
            alert('휴대폰 번호 11자리를 입력해주세요');
        }

        if (!nickname.trim() || !name.trim() || !email.trim() || !ID.trim() || !PW.trim() || !PWCheck.trim() || !phoneNumber.trim() || !emailCertification.trim()) {
            alert('회원 가입 양식을 모두 채워주세요.'); // 필드가 비어있다면 사용자에게 알림
            return;
        }
        if(!certificationCheck) {
            alert('이메일 인증을 해주세요.');
            return;
        }
        if (!isNamePattern || !isCheckedPassword || !isEqualPassword || isPhoneNumberPattern) return;

        navigate('/SignUp5', {
            state: {
                school: school,
                educationStatus: educationStatus,
                department: department,
                nickname: nickname,
                name: name,
                ID: ID,
                PW: PW,
                email: email,
                phoneNumber: phoneNumber
            }
        });
    }

    const formatPhoneNumber = (input: string): string => {
        // Remove any non-numeric characters
        const cleaned = input.replace(/\D/g, '');
        // Apply the format
        const formatted = cleaned.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
        // Return the formatted number
        return formatted;
    }


    return (
        <>
            <Header />
            <Container>
                <Content>
                    <Group>
                        <Title label="회원가입" color="#6868AC"/>
                    </Group>
                    <InterGroup>
                        <CheckButton
                            label="닉네임"
                            type="text"
                            value={nickname}
                            buttonLabel="확인"
                            color="#7C7FD1"
                            onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setNickname(e.target.value)}
                            onClick={onNicknameCheckButtonClickHandler}
                        />
                    </InterGroup>
                    <InterGroup>
                        <InputBox label="이름" type="text" value={name} onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setName(e.target.value)}/>
                    </InterGroup>
                    <InterGroup>
                        <CheckButton
                            label="이메일"
                            type="text"
                            value={email}
                            buttonLabel="인증"
                            color="#7C7FD1"
                            onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setEmail(e.target.value)}
                            onClick={onEmailCertificationButtonClickHandler}
                        />
                    </InterGroup>
                    {showCertificationInput && (
                        <InterGroup>
                            <CheckButton label="인증번호" type="text" value={emailCertification} onClick={onCheckCertificationButtonClickHandler} buttonLabel="확인" color="#7C7FD1" onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setEmailCertification(e.target.value)}/>
                        </InterGroup>
                    )}
                    <InterGroup>
                        <CheckButton
                            label="아이디"
                            type="text"
                            value={ID}
                            buttonLabel="확인"
                            color="#7C7FD1"
                            onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setID(e.target.value)}
                            onClick={onIDCheckButtonClickHandler}
                        />
                    </InterGroup>
                    <InterGroup>
                        <InputBox label="비밀번호" type="password" value={PW} onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setPW(e.target.value)}/>
                    </InterGroup>
                    <InterGroup>
                        <InputBox label="비밀번호 확인" type="password" value={PWCheck} onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setPWCheck(e.target.value)}/>
                    </InterGroup>
                    <InterGroup>
                        <InputBox
                            label="휴대폰 번호 입력('-'제와 11자리 입력)"
                            type="text"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(formatPhoneNumber(e.target.value))}
                        />
                    </InterGroup>
                    <InterGroup>
                        <Button label="다음" color="#7C7FD1" onClick={onNextButtonClickHandler}/>
                    </InterGroup>
                </Content>
            </Container>
        </>
    );
};
