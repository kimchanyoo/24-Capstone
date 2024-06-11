import React from "react";
import styled from "@emotion/styled";
import { useState, useEffect } from 'react';
import My from "../../stylesheet/My.module.css";
import guest from "../../img/guest.png";
import UserInfoListInterface from "types/interface/user-info-list.interface";
import { PostListItem } from "types/interface";
import { ResponseDto } from "apis/response";
import { UserClickResponseDto } from "apis/response/auth";
import { UserClickRequestDto } from "apis/request/auth";
import { userClickRequest } from "apis";
import { ApplicationUser } from "types/interface";

const Overlay = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.2);
  z-index: 9999;
`;

const ModalWrap = styled.div`
  width: auto;
  height: auto;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 600px;
  height: 600px;
  margin-left: 10%;
  margin-right: 10%;
  margin-bottom: 5%;
  font-weight: bold;
`;

const Head=styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Body = styled.div`
  display: flex;
  align-content: center;
  justify-content: center;
  flex-direction: column;
  margin-right: 5%;
  margin-top: 30%;
  gap: 35px;
  padding: 10px;
`;

const Value=styled.div`
  color: black;
  display: flex;
  font-size: 15px;
`;
const Career = styled.div`
  font-size: 15px;
  display: flex;
  flex-wrap: wrap;
  height: 50px;
  overflow: auto;
  width: 350px;
`;

const Group = styled.div`
  margin-bottom: -300px;
`;

const Group2 = styled.div`
    align-content: center;
    justify-content: center;
    margin-right: 20px;
    margin-bottom: 10px;
    margin-top: -430px;
`;

interface ModalProps {
    open: boolean;
    onClose: () => void;
    board: PostListItem | null; // board prop 추가
    user: UserInfoListInterface | null;
    applicationUser: ApplicationUser | null;
}

const techOptions: { [key: number]: string } = {
    0: "C",
    1: "C++",
    2: "C#",
    3: "JAVA",
    4: "Python",
    5: "Kotlin",
    6: "SQL",
    7: "Figma",
    8: "Swift",
    9: "React Native",
    10: "React",
    11: "Unity",
    12: "Unreal",
    13: "Flutter",
    14: "JavaScript",
    15: "TypeScript",
    16: "Spring",
    17: "PHP",
    18: "Node.js",
    19: "Next.js",
    20: "Vue.js"
};

const fieldOptions: { [key: number]: string } = {
    0: "프론트엔드",
    1: "백엔드",
    2: "디자이너",
    3: "앱 개발자",
    4: "PM",
    5: "기획자",
    6: "게임 개발자"
};

export const UserClick: React.FC<ModalProps> = ({ open, onClose, board, user }) => {
    const [userInfo, setUserInfo] = useState<UserInfoListInterface | null>(null);

    const handleClose = () => {
        onClose?.();
    };

    const userClickResponse = (responseBody: UserClickResponseDto | ResponseDto | null) => {
        console.log('responseBody:', responseBody); // responseBody 값 확인
        if (!responseBody) {
            console.log('응답 없음');
            return;
        }
        const { code } = responseBody;
        if (code === 'NU') alert('존재하지 않는 유저입니다.');
        if (code === 'DBE') alert('데이터베이스 오류입니다.');
        if (code !== 'SU') {
            return;
        }
        const userInfo: UserInfoListInterface = { ...responseBody as UserInfoListInterface };
        setUserInfo(userInfo);
    }

    useEffect(() => {
        if (open && user) {
            const nicknameToSend = user.nickName || ""; // 닉네임이 없을 경우 빈 문자열로 대체
            console.log("보낼 닉네임:", nicknameToSend); // 닉네임 값 확인
            const requestBody: UserClickRequestDto = {
                nickName: nicknameToSend
            };
            userClickRequest(requestBody).then(userClickResponse);
        }
    }, [open, user]);

    const getTechNames = (techIds: number[]) => {
        return techIds.map(id => techOptions[id]).join(', ');
    };

    return (
        <Overlay>
            <ModalWrap>
                <Container>
                    <button className={My.Close} onClick={handleClose}>X</button>
                    <Head>
                        <img src={guest} className={My.UserImg}/>
                        <Group2>
                            <label className={My.UserNickname}>{user?.nickName}</label>
                        </Group2>
                    </Head>
                    <Group/>
                    <Body>
                        <div className={My.infoItem}>
                            <div className={My.info}>학교</div>
                            <Value>{userInfo?.schoolName}</Value>
                        </div>
                        <div className={My.infoItem}>
                            <div className={My.info}>학과</div>
                            <Value>{userInfo?.department}</Value>
                        </div>
                        <div className={My.infoItem}>
                            <div className={My.info}>이메일</div>
                            <Value>{userInfo?.email}</Value>
                        </div>
                        <div className={My.infoItem}>
                            <div className={My.info}>분야</div>
                            <Value>{userInfo?.field !== undefined ? fieldOptions[userInfo.field] : ''}</Value>
                        </div>
                        <div className={My.infoItem}>
                            <div className={My.info}>기술 스택</div>
                            <Value>{userInfo?.tech ? getTechNames(userInfo.tech) : ''}</Value>
                        </div>
                        <div className={My.infoItem}>
                            <div className={My.info}>경력</div>
                            <Career>{userInfo?.career}</Career>
                        </div>
                    </Body>
                </Container>
            </ModalWrap>
        </Overlay>
    );
}