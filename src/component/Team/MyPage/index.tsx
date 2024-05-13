import React from "react";
import {LoginHeader} from "../LoginHeader";
import styled from "@emotion/styled";
import {Button} from "../Button";
import {useNavigate} from "react-router-dom";
import {GoBackBtn} from "../GoBackBtn";
import {EditBtn, handleClick} from "../EditBtn";
import Pt from "../../../../../frontend-typescript/src/stylesheet/Post.module.css";
import Reg from "../../../../../frontend-typescript/src/stylesheet/TeamRegister.module.css";
import My from "../../stylesheet/My.module.css";
import {Header} from "../Header";

const Container=styled.div`
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
const ButtonGroup=styled.div`
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
const Body=styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 30px;
    margin-left: 10%;
    gap: 44px;
    padding: 10px;
`;
const Space=styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 32px;
    margin-left: 50px;
    gap: 41px;
`;
const Space_2=styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 35px;
    margin-left: 50px;
    gap: 38px;
`;
export const MyPage = () => {
    const navigate = useNavigate();
    const CancelButton = () => {
        navigate('/MainPageLogin');
    };
    const Leave = () => {
        if(window.confirm("계정을 탈퇴하시겠습니까?")) {
            alert("탈퇴되었습니다.")
            return window.location.href = "/MainPage"
        }
    }

    return (
        <div>
            <LoginHeader/>
            <GoBackBtn/>
            <Title>
                <h1 className={My.title}>내 정보 😎</h1>
                <div style={{display: "flex"}}>
                    <Button label="탈퇴" onClick={Leave} backgroundColor="#CC0000"/>
                    <Button label="비밀번호 재설정" onClick={handleClick} backgroundColor="#6868AC"/>
                </div>
            </Title>
            <hr className={My.line}/>
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
                    <input className={My.box}/>
                    <input className={My.box}/>
                    <input className={My.box}/>
                    <input className={My.box}/>
                    <input className={My.box}/>
                    <select className={My.box}></select>
                    <select className={My.box}></select>
                    <select className={My.box}></select>
                    <select className={My.box}></select>
                    <textarea className={My.board}/>
                </Space>
                <Space_2>
                <Button label="중복 검사" onClick={() => onclick} backgroundColor="#6868AC"/>
                    <br/><br/><br/>
                    <Button label="중복 검사" onClick={() => onclick} backgroundColor="#6868AC"/>
                    <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                    <Button label="학교 인증" onClick={() => onclick} backgroundColor="#6868AC"/>
                </Space_2>
            </Container>
            <ButtonGroup>
                <Button label="취소" onClick={CancelButton} backgroundColor="#727272"/>
                <Button label="저장" onClick={() => onclick} backgroundColor="#6868AC"/>
            </ButtonGroup>
        </div>
    );
}
