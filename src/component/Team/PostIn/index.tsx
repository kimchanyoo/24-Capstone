import styled from "@emotion/styled";
import React, {useState} from 'react';
import {LoginHeader} from "../LoginHeader";
import {Button} from "../Button";
import {EditBtn, handleClick} from "../EditBtn";
import Reg from "../../stylesheet/TeamRegister.module.css"
import {GoBackBtn} from "../GoBackBtn";
import Profil from "../../img/profil.png"
import Pst from "../../stylesheet/Post.module.css";
import {Post} from "../Post";


const Container=styled.div`
    width: auto;
    height: auto;
    overflow: auto;
    border: 1px solid #D9D9D9;
    border-radius: 30px;
    margin-right: 10%;
    margin-left: 10%;
    padding-bottom: 30px;
    font-weight: bold;
`;
const Title = styled.div`
    display: flex;
    font-family: 'Inter';
    font-weight: 600;
    font-size: 32px;
    margin-left: 25px;
    margin-right: 25px;
    margin-top: 30px;
    justify-content: space-between;
`;
const NickName = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;
const InformationGroup=styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(100px, 300px));
    gap: 40px;
    column-gap: 10%;
    margin-left: 25px;
    margin-top: 30px;
`;
const BtnGroup = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-right: 10%;
    margin-left: 10%;
`;
export const PostIn  = () => {

    const isMine = true; // 내글 확인 여부 로직
    const Remove = () => {
        if(window.confirm("해당 게시물을 삭제하시겠습니까?")) {
            alert("게시물이 삭제되었습니다.")
            return window.location.href = "/MainPageLogin"
        }
    }
    const DeadLine = () => {
        if(window.confirm("해당 게시물을 마감하시겠습니까?")) {
            alert("게시물이 마감되었습니다.")
            return window.location.href = "/MainPageLogin"
        }
    }


    return (
        <div>
            <LoginHeader/>
            <BtnGroup>
                <GoBackBtn/>
                <div style={{display : "flex"}}>
                    {isMine && (
                        <Button label="글 삭제" onClick={Remove} backgroundColor="#CC0000"/>
                    )}
                    {isMine && (
                        <Button label="모집 마감" onClick={DeadLine} backgroundColor="#4caf50"/>
                    )}
                    <EditBtn label="지원" onClick={handleClick} backgroundColor="#6868AC" isEditable={true}/>
                </div>
            </BtnGroup>
            <Container>
                <Title>
                    <label>Title</label>
                    <NickName>
                        <img src={Profil} className={Pst.pfImg}/>
                        <label className={Pst.pfName}>NickName</label>
                    </NickName>
                </Title>
                <hr className={Reg.line}/>
                <InformationGroup>
                    <div className={Pst.content}>
                        모집 구분
                        <label>Null</label>
                    </div>
                    <div className={Pst.content}>
                        모집 인원
                        <label>Null</label>
                    </div>
                    <div className={Pst.content}>
                        진행 방식
                        <label>Null</label>
                    </div>
                    <div className={Pst.content}>
                        진행 기간
                        <label>Null</label>
                    </div>
                    <div className={Pst.content}>
                        기술 스택
                        <label>Null</label>
                    </div>
                    <div className={Pst.content}>
                        모집 마감일
                        <label>Null</label>
                    </div>
                    <div className={Pst.content}>
                        모집 포지션
                        <label>Null</label>
                    </div>
                </InformationGroup>
            </Container>
            <br/>
            <Container>
                <h1 className={Pst.title}>프로젝트 소개</h1>
                <hr className={Reg.line}/>
                <div className={Pst.body}>
                    <label>여기는 내용이 들어갈 부분입니다.</label>
                </div>
            </Container>
        </div>
    );
}
