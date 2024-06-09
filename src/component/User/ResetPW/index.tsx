import styled from "@emotion/styled";
import { useCookies } from "react-cookie";
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Title } from "../Title";
import { CustomLabel } from "../Label";
import { InputBox } from "../InputBox";
import { Button } from "../Button";
import { Header } from "../Header";
import { useLoginUserStore } from "stores";
import { ResponseDto } from "../../../apis/response";
import { CheckPasswordRequestDto } from "apis/request/auth";
import { CheckPasswordResponseDto } from "apis/response/auth";
import { checkPasswordRequest } from "apis";

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
  margin-top: 80px;
`;

const Group2 = styled.div`
  margin-top: 120px;
`;

export const ResetPWPage = () => {
    const navigate = useNavigate();
    const { resetLoginUser } = useLoginUserStore();
    const [cookies, setCookie] = useCookies();
    const [oldPwd, setOldPwd] = useState<string>('');
    const [passwordError, setPasswordError] = useState<boolean>(false);

    const handleOldPwd = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOldPwd(e.target.value);
    };

    const passwordCheckButtonClickHandler = () => {
        const accessToken = cookies.accessToken;
        if (!accessToken) {
            console.error("No accessToken found");
            return;
        }
        const isCheckedPassword = oldPwd.trim().length >= 8 && oldPwd.trim().length <= 20;
        if (!isCheckedPassword) {
            setPasswordError(true);
            alert('비밀번호는 8자 이상 20자 이하로 입력해주세요.');
            return;
        }

        const requestBody: CheckPasswordRequestDto = {
            pwd: oldPwd
        };

        checkPasswordRequest(requestBody, accessToken).then(checkPasswordResponse);
    };

    const checkPasswordResponse = (responseBody: CheckPasswordResponseDto | ResponseDto | null) => {
        if (!responseBody) {
            alert("네트워크 이상입니다.");
            return;
        }

        const { code } = responseBody;
        if (code === 'VF') {
            alert("비밀번호를 정확하게 입력해주세요");
        } else if (code === 'NU') {
            alert("존재하지 않는 유저입니다.");
        } else if (code === 'UP') {
            alert("비밀번호가 일치하지 않습니다.");
        } else if (code === 'DBE') {
            alert("데이터베이스 오류.");
        }
        if (code !== 'SU') {
            return;
        }

        navigate('/ResetPW2', {
            state: { oldPwd }
        });
    };

    return (
        <>
            <Header />
            <Container>
                <Content>
                    <Title label="비밀번호 재설정" color="#6868AC" />
                    <Group>
                        <InterGroup>
                            <CustomLabel label="현재 비밀번호" color="#000000" />
                            <InputBox label="" type="password" value={oldPwd} onChange={handleOldPwd} />
                        </InterGroup>
                        <InterGroup>
                            <Group2>
                                <Button label="비밀번호 재설정" color="#7C7FD1" onClick={passwordCheckButtonClickHandler} />
                            </Group2>
                        </InterGroup>
                    </Group>
                </Content>
            </Container>
        </>
    );
};
