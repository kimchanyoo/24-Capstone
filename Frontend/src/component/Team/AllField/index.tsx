import styled from "@emotion/styled";
import React, { useState } from "react";
import guest from "../../img/guest.png";
import Pst from "../../stylesheet/Post.module.css";
import { BoardListItem } from "types/interface";
import { useNavigate } from "react-router-dom";

interface Props {
    latestList: BoardListItem
}
interface ContainerProps {
    expired?: boolean;
}

const Container = styled.div<ContainerProps>`
    box-sizing: border-box;
    display: flex;
    top: 0;
    width: 313px;
    height: 192px;
    background: ${({ expired }) => (expired ? "rgba(0, 0, 0, 0.25)" : "#FFFFFF")};
    border: 0.5px solid rgba(0, 0, 0, 0.2);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 30px;
    margin-top: 30px ;
    margin-right: 1%;

    justify-content: center;
    align-items: center;
    font-weight: bolder;

    &:hover {
        background: ${({ expired }) => (expired ? "rgba(0, 0, 0, 0.25)" : "rgba(0, 0, 0, 0.05)")};
        cursor: ${({ expired }) => (expired ? "default" : "pointer")};
    }
`;


export default function AllField ({ latestList }: Props) {
    const onClickHandler = () => {
        navigate('/PostIn/${postId}');
    }
    // function: 네비게이트 함수
    const navigate = useNavigate();
    // state: 게시물 아이템
    const { postId,
        title,
        nickName,
        deadLine,
        recruitmentPerson,
        recruitmentClassification,
        termination} = latestList;
    // event handler: 게시물 아이템 클릭 이벤트 처리 함수

    return (
        <Container onClick={onClickHandler}>
            <div className={Pst.Body}>
                <div className={Pst.a}>
                    <img src={guest} className={Pst.UImg}/>
                    <label>{nickName}</label>
                </div>

                <div className={Pst.b}>
                    모집인원ㅣ{recruitmentPerson} 명
                </div>

                <div className={Pst.c}>
                    {recruitmentClassification}
                </div>

                <div className={Pst.d}>
                    {title}
                </div>

                <div className={Pst.e}>
                    {deadLine} 마감
                </div>
            </div>
        </Container>
    )
}
