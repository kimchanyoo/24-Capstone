import styled from "@emotion/styled";
import { useCookies } from "react-cookie";
import React, { useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { Title } from "../Title";
import { CustomLabel } from "../Label";
import { InputBox } from "../InputBox";
import { Button } from "../Button";
import { Header } from "../Header";
import { User } from 'types/interface';
import { useLoginUserStore } from "stores";
import { ResponseDto } from "../../../apis/response";
import { ResetPwdRequestDto } from "apis/request/auth";
import { ResetPwdResponseDto } from "apis/response/auth";
import { resetPwdRequest } from "apis";

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
  margin-left: 30px;
`;

const Group = styled.div`
  margin-top: 66px;
`;

const Group2 = styled.div`
  margin-top: 62px;
`;

export const ResetPWPage2 = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { resetLoginUser } = useLoginUserStore();
    const [cookies, setCookie] = useCookies();
    const [newPwd, setNewPwd] = useState<string>('');
    const [newPwdCheck, setNewPwdCheck] = useState<string>('');

    const [oldPwd] = useState(location.state?.oldPwd || '');
    const [passwordError, setPasswordError] = useState<boolean>(false);
    const [passwordCheckError, setPasswordCheckError] = useState<boolean>(false);
    const [oldNewPwdError, setOldNewPwdError] = useState<boolean>(false);

    const handleNewPwd = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewPwd(e.target.value);
    };

    const handleNewPwdCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewPwdCheck(e.target.value);
    };

    const resetPWDButtonClickHandler = () => {

        console.log("Old Password:", oldPwd);
        console.log("New Password:", newPwd);

        const isCheckedPassword = newPwd.trim().length >= 8 && newPwd.trim().length <= 20;
        if (!isCheckedPassword) {
            setPasswordError(true);
            alert('비밀번호는 8자 이상 20자 이하로 설정해주세요.');
            return;
        }

        const isEqualPassword = newPwd === newPwdCheck;
        if (!isEqualPassword) {
            setPasswordCheckError(true);
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }

        const isEqualOldNewPassword = oldPwd === newPwd;
        if (isEqualOldNewPassword) {
            setOldNewPwdError(true);
            alert('새로운 비밀번호를 현재 비밀번호와 다르게 설정해주세요.')
            return;
        }

        const accessToken = cookies.accessToken;
        if (!accessToken) {
            console.error("No accessToken found");
            return;
        }

        const requestBody: ResetPwdRequestDto = {
            pwd: newPwd
        }

        resetPwdRequest(requestBody, accessToken).then(resetPwdResponse);
    }

    const resetPwdResponse = (responseBody: ResetPwdResponseDto | ResponseDto | null) => {
        if (!responseBody) {
            alert("네트워크 이상입니다.");
            return;
        }

        const { code } = responseBody;
        if (code === 'DBE') {
            alert("데이터베이스 오류입니다.");
        } else if (code === 'NU') {
            alert("존재하지 않는 유저입니다.");
        } else if (code === 'VF') {
            alert("새로운 비밀번호를 확인하세요.");
        } else if (code !== 'SU') {
            return;
        }

        alert("수정되었습니다.");
        resetLoginUser();
        setCookie('accessToken', '', { path: '/', expires: new Date() });
        navigate('/');
    }

    return (
        <>
            <Header />
            <Container>
                <Content>
                    <Title label="비밀번호 재설정" color="#6868AC" />
                    <Group>
                        <InterGroup>
                            <CustomLabel label="새로운 비밀번호" color="#000000" />
                            <InputBox label="" type="password" value={newPwd} onChange={handleNewPwd} />
                        </InterGroup>
                        <InterGroup>
                            <CustomLabel label="새로운 비밀번호 확인" color="#000000" />
                            <InputBox label="" type="password" value={newPwdCheck} onChange={handleNewPwdCheck} />
                        </InterGroup>
                        <InterGroup>
                            <Group2>
                                <Button label="비밀번호 재설정" color="#7C7FD1" onClick={resetPWDButtonClickHandler} />
                            </Group2>
                        </InterGroup>
                    </Group>
                </Content>
            </Container>
        </>
    )
}
