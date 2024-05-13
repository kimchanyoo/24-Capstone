import styled from "@emotion/styled";
import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {Title} from "../Title";
import {CustomLabel} from "../Label";
import {InputBox} from "../InputBox";
import {Button} from "../Button";
import {ClickLabel} from "../ClickLabel";
import {LogoImage} from "../Logo";

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
    const [name, setName] = useState('');
    const [Email, setEmail] = useState('');

    const handleInputID = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setID(e.target.value);
    };
    const handleInputName = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setName(e.target.value);
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
        <Container>
            <header>
                <LogoImage/>
            </header>
            <Content>
                <Title label="비밀번호 찾기" color="#6868AC"/>
                <Group>
                    <InterGroup>
                        <CustomLabel label="아이디" color="#000000"/>
                        <InputBox label="" type="text" value={ID} onChange={handleInputID}/>
                    </InterGroup>
                    <InterGroup>
                        <CustomLabel label="이름" color="#000000"/>
                        <InputBox label="" type="text" value={name} onChange={handleInputName}/>
                    </InterGroup>
                    <InterGroup>
                        <CustomLabel label="이메일" color="#000000"/>
                        <InputBox label="" type="text" value={Email} onChange={handleInputEmail}/>
                    </InterGroup>
                    <InterGroup>
                        <Group>
                            <Button label="비밀번호 찾기" color="#7C7FD1"/>
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
    )
}
