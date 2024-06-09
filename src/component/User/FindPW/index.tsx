import styled from "@emotion/styled";
import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {Title} from "../Title";
import {CustomLabel} from "../Label";
import {InputBox} from "../InputBox";
import {Button} from "../Button";
import {ClickLabel} from "../ClickLabel";
import {Header} from "../Header";
import {CheckButton} from "../CheckButton";
import { FindPwdRequestDto } from "apis/request/auth";
import { FindPwdResponseDto } from "apis/response/auth";
import { findPwdRequest } from "apis";
import { EmailCertificationResponseDto } from "apis/response/auth";
import { EmailCertificationRequestDto } from "apis/request/auth";
import { emailCertificationRequest } from "apis";
import { CheckCertificationResponseDto } from "apis/response/auth";
import { CheckCertificationRequestDto } from "apis/request/auth";
import { checkCertificationRequest } from "apis";
import {ResponseDto} from "../../../apis/response";

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

const RightLabelGroup = styled.div`
  margin-left: 265px;
`;

const Group = styled.div`
  margin-top: 40px;
`;

export const FindPWPage = () => {
    const navigate = useNavigate();

    const [ID, setID] = useState('')
    const [email, setEmail] = useState('');
    const [certificationNumber, setCertificationNumber] = useState('')
    const [certificationCheck, setCertificationCheck] = useState<boolean>(false);

    const [emailError, setEmailError] = useState<boolean>(false);
    const [certificationNumberError, setCertificationNumberError] = useState<boolean>(false);

    const FindPwdButtonClickHandler = () => {
        const requestBody: FindPwdRequestDto = {
            userId: ID,
            email: email,
            certificationNumber: certificationNumber
        };
        findPwdRequest(requestBody).then(findPwdResponse);
    };

    const findPwdResponse = (responseBody: FindPwdResponseDto | ResponseDto | null) => {
        console.log('Response Body:', responseBody); // responseBody를 콘솔에 출력
        if (!responseBody) {
            alert("네트워크 이상입니다.");
            return;
        }
        const {code, userId } = responseBody;
        if (code === 'DBE') alert("데이터베이스 오류입니다.");
        if (code === 'VF') alert("이메일을 양식에 맞게 입력해주세요.");
        if (code === 'CF') alert("인증번호가 일치하지 않습니다.");
        if (code === 'NU') alert("존재하지 않는 회원입니다.");
        if (code === 'MF') alert("메일 전송을 실패하였습니다.");
        if (code !== 'SU') return;

        alert(`임시 비밀번호가 메일로 전송되었습니다!`);
        navigate('/login');
    }

    const onEmailCertificationButtonClickHandler = () => {
        const emailPattern = /^[a-zA-Z0-9]*@([-.]?[a-zA-Z0-9])*\.[a-zA-Z]{2,4}$/;
        const isEmailPattern = emailPattern.test(email);

        if (!isEmailPattern) {
            setEmailError(true);
            alert('이메일 형식이 맞지 않습니다.');
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
        alert("메일이 전송되었습니다.")
    }

    const onCheckCertificationButtonClickHandler = () => {
        const isEmailCertification = certificationNumber.trim().length == 6;
        if(!isEmailCertification) {
            setCertificationNumberError(true);
            alert('인증번호 6자리가 일치하지 않습니다.');
        }
        if (!ID.trim()){
            alert('아이디를 입력해주세요.'); // 필드가 비어있다면 사용자에게 알림
            return;
        }
        const requestBody: CheckCertificationRequestDto = {
            email: email,
            certificationNumber: certificationNumber
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

    const handleInputID = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setID(e.target.value);
    };

    const handleInputEmail = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setEmail(e.target.value);
    };

    const handleLoginPage = () => {
        navigate('/login');
    };
    const handleSignUpPage = () => {
        navigate('/SignUp');
    };

    return (
        <>
            <Header />
            <Container>
                <Content>
                    <Title label="비밀번호 찾기" color="#6868AC"/>
                    <Group>
                        <InterGroup>
                            <CustomLabel label="아이디" color="#000000"/>
                            <InputBox label="" type="text" value={ID} onChange={handleInputID}/>
                        </InterGroup>
                        <InterGroup>
                            <CustomLabel label="이메일" color="#000000"/>
                            <CheckButton
                                label=""
                                type="text"
                                value={email}
                                buttonLabel="인증"
                                color="#7C7FD1"
                                onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setEmail(e.target.value)}
                                onClick={onEmailCertificationButtonClickHandler}
                            />
                        </InterGroup>
                        <InterGroup>
                            <CustomLabel label="인증번호" color="#000000"/>
                            <CheckButton label="" type="text" value={certificationNumber} onClick={onCheckCertificationButtonClickHandler}
                                         buttonLabel="확인" color="#7C7FD1" onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setCertificationNumber(e.target.value)}/>
                        </InterGroup>
                        <InterGroup>
                            <Group>
                                <Button label="비밀번호 재설정" color="#7C7FD1" onClick={FindPwdButtonClickHandler}/>
                            </Group>
                        </InterGroup>
                        <ClickLabel label="회원가입하기" onClick={handleSignUpPage}/>
                        <InterGroup>
                            <RightLabelGroup>
                                <ClickLabel label="로그인하기" onClick={handleLoginPage}/>
                            </RightLabelGroup>
                        </InterGroup>
                    </Group>
                </Content>
            </Container>
        </>
    )
}
