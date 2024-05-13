import styled from '@emotion/styled';
import React, { useState } from 'react';
import { Title } from 'component/User/Title';
import { Button } from '../Button';
import { LogoImage } from '../Logo';
import { useNavigate } from "react-router-dom";
import { InputBox } from "../InputBox";
import { CheckButton } from "../CheckButton";


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
    height: 700px;
    border-radius: 30px;
    overflow-y: scroll;
`;

const InterGroup = styled.div`
    margin-bottom: 17px;
`;

const Group = styled.div`
    margin-top: 90px;
    margin-bottom: 20px;
`;

export const SignUpPage4 = () => {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [emailCertification, setEmailCertification] = useState('');
    const [certificationCheck, setCertificationCheck] = useState(false);
    const [ID, setID] = useState('');
    const [PW, setPW] = useState('');
    const [PWCheck, setPWCheck] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [showCertificationInput, setShowCertificationInput] = useState(false);

    const handleEmailCertification = () => {
        setCertificationCheck(true);
        alert("인증되었습니다.");
    }

    const handleNextClick = () => {
        // 모든 입력 필드가 채워졌는지 검사
        if (!name.trim() || !email.trim() || !ID.trim() || !PW.trim() || !PWCheck.trim() || !phoneNumber.trim() || !emailCertification.trim()) {
            alert('회원 가입 양식을 모두 채워주세요.'); // 필드가 비어있다면 사용자에게 알림
            return;
        }
        if(!certificationCheck) {
            alert('이메일 인증을 해주세요.');
            return;
        }
        navigate('/SignUp5'); // 모든 조건이 충족되면 페이지 리다이렉트
    };

    const handleCertificationClick = () => {
        setShowCertificationInput(true);
    }

    return (
        <Container>
            <StyledHeader>
                <LogoImage />
            </StyledHeader>
            <Content>
                <Group>
                    <Title label="회원가입" color="#6868AC"/>
                </Group>
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
                        onClick={handleCertificationClick}
                    />
                </InterGroup>
                {showCertificationInput && (
                    <InterGroup>
                        <CheckButton label="인증번호" type="text" value={emailCertification} onClick={handleEmailCertification} buttonLabel="확인" color="#7C7FD1" onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setEmailCertification(e.target.value)}/>
                    </InterGroup>
                )}
                <InterGroup>
                    <InputBox label="아이디" type="text" value={ID} onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setID(e.target.value)}/>
                </InterGroup>
                <InterGroup>
                    <InputBox label="비밀번호" type="password" value={PW} onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setPW(e.target.value)}/>
                </InterGroup>
                <InterGroup>
                    <InputBox label="비밀번호 확인" type="password" value={PWCheck} onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setPWCheck(e.target.value)}/>
                </InterGroup>
                <InterGroup>
                    <InputBox label="휴대폰 번호 입력('-'제와 11자리 입력)" type="text" value={phoneNumber} onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setPhoneNumber(e.target.value)}/>
                </InterGroup>
                <InterGroup>
                    <Button label="다음" color="#7C7FD1" onClick={handleNextClick}/>
                </InterGroup>
            </Content>
        </Container>
    );
};
