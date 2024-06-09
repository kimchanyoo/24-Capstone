import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Button } from "../Button";
import { useNavigate } from "react-router-dom";
import { GoBackBtn } from "../GoBackBtn";
import Pt from "../../../../../frontend-typescript/src/stylesheet/Post.module.css";
import Reg from "../../../../../frontend-typescript/src/stylesheet/TeamRegister.module.css";
import My from "../../stylesheet/My.module.css";
import { useLoginUserStore } from "stores";
import { useCookies } from "react-cookie";
import { showUserInformationRequest } from 'apis';
import { ShowUserInformationResponseDto } from 'apis/response/user';
import { ResponseDto } from 'apis/response';
import { User } from 'types/interface';

const Container = styled.div`
  display: grid;
  grid-template-columns: 150px 480px 200px;
  width: auto;
  height: auto;
  overflow: auto;
  margin-right: 10%;
  margin-left: 10%;
  padding-bottom: 30px;
  font-weight: bold;
  font-size: 20px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: right;
  margin-right: 10%;
  margin-top: 20px;
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 10%;
  margin-left: 10%;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  margin-left: 10%;
  gap: 44px;
  padding: 10px;
`;

const Space = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 32px;
  margin-left: 50px;
  gap: 41px;
`;

export const MyPage = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null); // 사용자 정보를 저장할 상태 정의
    const { setLoginUser, resetLoginUser } = useLoginUserStore();
    const [cookies, setCookie] = useCookies();

    const UpdatePageHandler = () => {
        navigate('/MyPageUpdate', { state: { userId: user?.userId } });
    };

    const showUserInformationResponse = (responseBody: ShowUserInformationResponseDto | ResponseDto | null) => {
        if (!responseBody) return;
        const { code } = responseBody;
        if (code === "AF" || code === "NU" || code === "DBE") {
            resetLoginUser();
            return;
        }
        const loginUser: User = { ...responseBody as ShowUserInformationResponseDto };
        setLoginUser(loginUser);
        setUser(loginUser); // 사용자 정보를 상태에 저장
    }

    const resetPwdHandler = () => {
        navigate('/ResetPW')
    }

    useEffect(() => {
        if (!cookies.accessToken) {
            resetLoginUser();
            return;
        }
        showUserInformationRequest(cookies.accessToken).then(showUserInformationResponse);
    }, [cookies.accessToken]);

    const mapTechValueToString = (tech: number): string => {
        const techOptions = [
            "C", "C++", "C#", "Java", "Python", "Kotlin", "SQL",
            "Figma", "Swift", "React Native", "React", "Unity",
            "Unreal", "Flutter", "JavaScript", "TypeScript",
            "Spring", "PHP", "Node.js", "Next.js", "Vue.js"
        ];
        // 기술 값이 배열 범위를 벗어나면 빈 문자열 반환
        if (tech < 0 || tech >= techOptions.length) {
            return "";
        }
        return techOptions[tech];
    };

    const fieldOptions: {[key: number]: string} = {
        0: "프론트엔드",
        1: "백엔드",
        2: "디자이너",
        3: "앱 개발자",
        4: "PM",
        5: "기획자",
        6: "게임 개발자"
    };

    return (
        <div>
            <GoBackBtn />
            <Title>
                <h1 className={My.title}>내 정보 😎</h1>
                <div style={{ display: "flex" }}>
                    <Button label="내 정보 수정" onClick={UpdatePageHandler} backgroundColor="#A0A0A0" />
                    <Button label="비밀번호 재설정" onClick={resetPwdHandler} backgroundColor="#6868AC" />
                </div>
            </Title>
            <hr className={My.line} />
            <Container>
                <Body>
                    <div className={My.tle}>닉네임</div>
                    <div className={My.tle}>이름</div>
                    <div className={My.tle}>아이디</div>
                    <div className={My.tle}>휴대폰 번호</div>
                    <div className={My.tle}>이메일</div>
                    <div className={My.tle}>학교</div>
                    <div className={My.tle}>학과</div>
                    <div className={My.tle}>분야</div>
                    <div className={My.tle}>기술</div>
                    <div className={My.tle}>경력</div>
                </Body>
                <Space>
                    <input className={My.box} value={user?.nickName || ''} readOnly/>
                    <input className={My.box} value={user?.name || ''} readOnly/>
                    <input className={My.box} value={user?.userId || ''} readOnly/>
                    <input className={My.box} value={user?.phoneNumber || ''} readOnly/>
                    <input className={My.box} value={user?.email || ''} readOnly/>
                    <input className={My.box} value={user?.schoolName || ''} readOnly></input>
                    <input className={My.box} value={user?.department || ''} readOnly></input>
                    <input className={My.box} value={fieldOptions[user?.field || 0] || ''} readOnly></input>
                    <input className={My.box} value={user?.tech.map(mapTechValueToString).join(', ') || ''}
                           readOnly></input>
                    <textarea className={My.board} value={user?.career || ''} readOnly></textarea>
                </Space>
            </Container>
        </div>
    );
}
