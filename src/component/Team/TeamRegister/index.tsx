import styled from "@emotion/styled";
import React, {useState} from 'react';
import {LoginHeader} from "../LoginHeader";
import {Button} from "../Button";
import {useNavigate} from "react-router-dom";
import Reg from "../../stylesheet/TeamRegister.module.css"
import drop from "../../stylesheet/DropDown.module.css";
import {DatePick} from "../DatePick";


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
const ButtonGroup=styled.div`
    display: flex;
    justify-content: right;
    margin-right: 9%;
    margin-top: 20px;
`;
const DropGroup=styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(100px, 300px));
    gap: 40px;
    column-gap: 10%;
    margin-left: 25px;
    margin-top: 30px;
    
`;
const TextGroup=styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 30px;
    margin-left: 25px;
    font-weight: bold;
    font-size: 16px;
    margin-right: 25px;
`;

export const TeamRegister : React.FC = () => {
    const [endDate, setEndDate] = useState(new Date());
    const [isDropDownVisible, setIsDropDownVisible] = useState(false);
    const navigate = useNavigate();
    const CancelButton = () => {
        navigate('/MainPageLogin');
    };

    return (
        <div>
            <LoginHeader/>
            <Container>
                <h1 className={Reg.title}>새 팀 구성</h1>
                <hr className={Reg.line}/>
                <DropGroup>
                    <div>
                    모집 구분
                    <br/>
                        <select className={drop.DropBtn}>
                            <option value="" disabled selected>프로젝트/스터디</option>
                            <option value="0">프로젝트</option>
                            <option value="1">스터디</option>
                        </select>
                    </div>

                    <div>
                    모집 인원
                        <br/>
                        <select className={drop.DropBtn}>
                            <option value="" disabled selected>인원 미정~5명 이상</option>
                            <option value="0">인원 미정</option>
                            <option value="1">1명</option>
                            <option value="2">2명</option>
                            <option value="3">3명</option>
                            <option value="4">4명</option>
                            <option value="5">5명 이상</option>
                        </select>
                    </div>

                    <div>
                        진행 방식
                        <br/>
                        <select className={drop.DropBtn}>
                            <option value="" disabled selected>온라인/오프라인</option>
                            <option value="0">온라인</option>
                            <option value="1">오프라인</option>
                        </select>
                    </div>

                    <div>
                        진행 기간
                        <br/>
                        <select className={drop.DropBtn}>
                            <option value="" disabled selected>기간 미정~6개월 이상</option>
                            <option value="-1">기간 미정</option>
                            <option value="0">1개월</option>
                            <option value="1">2개월</option>
                            <option value="2">3개월</option>
                            <option value="3">4개월</option>
                            <option value="4">5개월</option>
                            <option value="5">6개월 이상</option>
                        </select>
                    </div>

                    <div>
                    기술 스택
                        <br/>
                        <select className={drop.DropBtn}>
                            <option value="" disabled selected>프로젝트 사용 스택</option>
                            <option value="0">C</option>
                            <option value="1">C++</option>
                            <option value="2">C#</option>
                            <option value="3">JAVA</option>
                            <option value="4">Python</option>
                            <option value="5">Kotlin</option>
                            <option value="6">SQL</option>
                            <option value="7">Figma</option>
                            <option value="8">Swift</option>
                            <option value="9">React Native</option>
                            <option value="10">React</option>
                            <option value="11">Unity</option>
                            <option value="12">Unreal</option>
                            <option value="13">Flutter</option>
                            <option value="14">JavaScript</option>
                            <option value="15">TypeScript</option>
                            <option value="16">Spring</option>
                            <option value="17">PHP</option>
                            <option value="18">Node.js</option>
                            <option value="19">Next.js</option>
                            <option value="20">Vue.js</option>
                        </select>
                    </div>

                    <div>
                    모집 마감일
                        <br/>
                        <DatePick/>
                    </div>

                    <div>
                        모집 포지션
                        <br/>
                        <select className={drop.DropBtn}>
                            <option value="" disabled selected>프론트엔드, 백엔드, ...</option>
                            <option value="0">프론트엔드</option>
                            <option value="1">백엔드</option>
                            <option value="2">디자이너</option>
                            <option value="3">앱 개발자</option>
                            <option value="4">PM</option>
                            <option value="5">기획자</option>
                            <option value="6">게임 개발자</option>
                        </select>
                    </div>
                </DropGroup>
            </Container>
            <br/>
            <Container>
                <h1 className={Reg.title}>프로젝트 소개</h1>
                <hr className={Reg.line}/>
                <TextGroup>
                    소개 제목
                    <input className={Reg.boardTitle} placeholder="글 제목"/>
                    <textarea className={Reg.boardContents} placeholder="글 내용"/>
                </TextGroup>
            </Container>
            <ButtonGroup>
                <Button label="취소" onClick={CancelButton} backgroundColor="#727272"/>
                <Button label="등록" onClick={()=>onclick} backgroundColor="#6868AC"/>
            </ButtonGroup>
        </div>
    );
}
