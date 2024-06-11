import styled from "@emotion/styled";
import React from "react";
import guest from "../../img/guest.png";
import Pst from "../../stylesheet/Post.module.css";
import { BoardListItem, SchoolBoardListItem } from "types/interface";

interface ContainerProps {
    expired?: boolean;
}

const Container = styled.div<ContainerProps>`
    position: relative;
    box-sizing: border-box;
    display: flex;
    top: 0;
    width: 313px;
    height: 192px;
    background: ${({ expired }) => (expired ? "rgba(0, 0, 0, 0.25)" : "#FFFFFF")};
    border: 0.5px solid rgba(0, 0, 0, 0.2);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 30px;
    margin-top: 30px;
    margin-right: 1%;

    justify-content: center;
    align-items: center;
    font-weight: bolder;

    &:hover {
        background: ${({ expired }) => (expired ? "rgba(0, 0, 0, 0.25)" : "rgba(0, 0, 0, 0.05)")};
        cursor: pointer};
    }
`;
const Dead = styled.div`
    position: absolute;
    display: flex;
    background-color: gray;
    font-size: 20px;
    padding: 10px 30px 10px 30px;
    border-radius: 20px;
    color: white;
`;

interface Props {
    onClick: () => void;
    label: string;
    boardListItem: BoardListItem | SchoolBoardListItem;
    expired?: boolean;
    onExpiration: (postId: number) => void; // 만료 처리 함수 추가
}

const Post: React.FC<Props> = ({ boardListItem, onClick, label, expired, onExpiration }) => {
    // 만료 처리 로직
    const handleExpiration = () => {
        if (expired) {
            // 만료된 경우, 해당 게시물의 postId를 인자로 전달하여 onUpdateExpiration 함수 호출
            onExpiration(boardListItem.postId);
        }
    };

    return (
        <Container onClick={onClick} expired={expired} onMouseEnter={handleExpiration}>
            <div className={Pst.Body}>
                <div className={Pst.a}>
                    <img src={guest} className={Pst.UImg} />
                    <label>{boardListItem.nickName}</label>
                </div>

                <div className={Pst.b}>
                    모집인원ㅣ{boardListItem.recruitmentPerson} 명
                </div>

                <div className={Pst.c}>
                    {recruitmentClassificationOption[boardListItem.recruitmentClassification]}
                </div>

                <div className={Pst.d}>
                    {boardListItem.title}
                </div>

                <div className={Pst.e}>
                    {boardListItem.deadLine} 마감
                </div>
            </div>
            {expired && <Dead>모집 완료</Dead>}
        </Container>
    );
};

const recruitmentClassificationOption: { [key: number]: string } = {
    0: "프로젝트",
    1: "스터디"
};

export default Post;
