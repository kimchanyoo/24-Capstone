import styled from '@emotion/styled';
import React, { useState } from 'react';
import { Title } from 'component/User/Title';
import { CustomLabel } from 'component/User/Label';
import { Button } from '../Button';
import { Header } from '../Header';
import { ClickLabel } from '../ClickLabel';
import { useNavigate } from 'react-router-dom';
import { InputBox } from "../InputBox";
import { SignInRequestDto } from "apis/request/auth";
import { SignInResponseDto } from "apis/response/auth";
import {signInRequest} from "apis";
import {ResponseDto} from "apis/response";
import {useCookies} from "react-cookie";

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

const Group = styled.div`
  margin-top: 40px;
`;

const RightLabelGroup = styled.div`
  margin-left: 220px;
`;

export const LoginPage = () => {
    const navigate = useNavigate();
    const [ID, setID] = useState('');
    const [PW, setPW] = useState('');
    const [error, setError] = useState(false);
    const [cookies, setCookie] = useCookies();

    const navigator = useNavigate();

    const signInResponse = (responseBody: SignInResponseDto | ResponseDto | null) => {
        console.log('Response Body:', responseBody); // responseBody를 콘솔에 출력
        if (!responseBody) {
            alert("네트워크 이상입니다.");
            return;
        }
        const {code} = responseBody;
        if(code === 'DBE') alert("데이터베이스 오류입니다.");
        if(code === 'SF' || code === 'VF') {
            setError(true);
            alert("아이디 또는 비밀번호가 틀리게 입력되었습니다.");
        }
        if(code !== 'SU') return;

        const { token, expirationTime } = responseBody as SignInResponseDto;
        const now = new Date().getTime();
        const expires = new Date(now + expirationTime * 1000);

        setCookie('accessToken', token, {expires, path: 'http://www.teami.kr:42957'});
        navigate('/MainPage');
    };

    const onSignInButtonClickHandler = () => {
        if (!ID.trim() && !PW.trim()){
            alert('아이디와 비밀번호를 입력해주세요.'); // 필드가 비어있다면 사용자에게 알림
            return;
        }
        if (!ID.trim()){
            alert('아이디를 입력해주세요.'); // 필드가 비어있다면 사용자에게 알림
            return;
        }
        if (!PW.trim()){
            alert('비밀번호를 입력해주세요.'); // 필드가 비어있다면 사용자에게 알림
            return;
        }

        const requestBody: SignInRequestDto = { userId:ID, pwd:PW };
        signInRequest(requestBody).then(signInResponse);
    };

    const handleSignUpClick = () => {
        navigate('/SignUp');
    };

    const handleInputID = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setID(e.target.value);
    };

    const handleInputPW = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setPW(e.target.value);
    };

    const handleFindID = () => {
        navigate('/FindID');
    };

    return (
        <>
            <Header />
            <Container>
                <Content>
                    <Title label="로그인" color="#6868AC" />
                    <Group>
                        <InterGroup>
                            <CustomLabel label="아이디" color="#000000" />
                            <InputBox label="" type="text" value={ID} onChange={handleInputID}/>
                        </InterGroup>
                        <InterGroup>
                            <CustomLabel label="비밀번호" color="#000000" />
                            <InputBox label="" type="password" value={PW} onChange={handleInputPW}/>
                        </InterGroup>
                        <InterGroup>
                            <Group>
                                <Button label="로그인" color="#7C7FD1" onClick={onSignInButtonClickHandler}/>
                            </Group>
                        </InterGroup>
                        <InterGroup>
                            <Button label="회원가입" color="#C3C3C3" onClick={handleSignUpClick}/>
                        </InterGroup>
                        <InterGroup>
                            <RightLabelGroup>
                                <ClickLabel label="아이디/비밀번호 찾기" onClick={handleFindID} />
                            </RightLabelGroup>
                        </InterGroup>
                    </Group>
                </Content>
            </Container>
        </>
    );
};
