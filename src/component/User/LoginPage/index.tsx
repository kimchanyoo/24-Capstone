import styled from '@emotion/styled';
import React, { useState } from 'react';
import { Title } from 'component/User/Title';
import { CustomLabel } from 'component/User/Label';
import { Button } from '../Button';
import { ClickLabel } from '../ClickLabel';
import { LogoImage } from '../Logo';
import { useNavigate } from 'react-router-dom';
import { InputBox } from "../InputBox";
// import { SignInResponseDto } from "../../apis/response/auth";
// import { signInRequest } from "../../apis";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #6868ac;
    height: 100vh;
    width: 100%;
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
    const navigate = useNavigate(); // useHistory 훅을 사용하여 history 인스턴스를 생성합니다.

    const [ID, setID] = useState('');
    const [PW, setPW] = useState('');
    const handleSignUpClick = () => {
        navigate('/SignUp'); // '/SignUp'으로 페이지를 리다이렉트합니다.
    };
/*
    const signInResponse = (responseBody: SignInResponseDto | ResponseDto | null) => {
        if(!responseBody) {
            alert('네트워크 이상입니다.');
            return;
        }
        const { code } = responseBody;
        if (code === 'DBE') alert('데이터베이스 오류입니다.');
        if (code === 'SF' || code === 'VF') setError(true);
        if (code !== 'SU') return;

        const { token, expirationTime } = responseBody as SignInResponseDto;
    }

    const onSignInButtonClickHandler = () => {
        const requestBody: SignInResponseDto = {ID, PW};
        signInRequest(requestBody).then(signInResponse);
    }

 */

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
        <Container>
            <header>
                <LogoImage />
            </header>
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
                            <Button label="로그인" color="#7C7FD1" />
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
    );
};
