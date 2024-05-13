import styled from "@emotion/styled";
import React, {useState} from 'react';
import main from "../../stylesheet/MainPage.module.css";
import {Post, PostList} from "../Post";
import {Header} from "../Header";
import {Link, useNavigate} from 'react-router-dom';
import img1 from "../../img/board.png";
import {PostIn} from "../PostIn";
import {LoginHeader} from "../LoginHeader";
import Tap from "../../stylesheet/Btn.module.css";


const PostGroup=styled.div`
    display: flex;
    align-items: center;
    justify-content: left;
    flex-wrap: wrap;
    gap: 13px
`;
const TextGroup=styled.div`
    display: flex;
    flex-direction: column;
    margin-right: 10%;
    margin-left: 10%;
`;

export const MainPage: React.FC = () => {

    const navigate = useNavigate();
    const [isExpired, setIsExpired] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const projectFieldClick = () => {
        navigate('/ProjectField');
    };
    const studyFieldClick = () => {
        navigate('/StudyField');
    };
    const PostInClick = () => {
        navigate('/PostIn');
    };
    const [activeTab, setActiveTab] = useState(0);
    const TabMenu = [
        { id: 1, button : "전체보기", content: ""},
        { id: 2, button : "프로젝트", content: ""},
        { id: 3, button : "스터디", content: ""}
    ];

    return (
        <div>
            <Header/>
            <div className={main.main}>
                <Link to="" style={{ textDecoration: "none"}}>
                    <div className={main.advertisement}>
                        <TextGroup>
                            <h1 className={main.text1}>티미에서 자신과 맞는 팀을 선택해보세요!</h1>
                            <h1 className={main.text2}>로그인하러 가기 🔥</h1>
                        </TextGroup>
                        <img src={img1} className={main.img1}/>
                    </div>
                </Link>
                <div className={main.title}>
                    {TabMenu.map((tap) =>
                        <button
                            className={Tap.tapBtn}
                            key={tap.id}
                            data-active={activeTab === tap.id ? "true" : "false"}
                            onClick={()=>setActiveTab(tap.id)}>
                            {tap.button}
                        </button>
                    )}
                </div>
                <PostGroup>
                    <Post label="" onClick={PostInClick} expired={isExpired}/>
                    <Post label="" onClick={PostInClick} expired={isExpired}/>
                    <Post label="" onClick={PostInClick} expired={isExpired}/>
                    <Post label="" onClick={PostInClick} expired={isExpired}/>
                    <Post label="" onClick={PostInClick} expired={isExpired}/>
                    <Post label="" onClick={PostInClick} expired={isExpired}/>
                    <Post label="" onClick={PostInClick} expired={isExpired}/>
                </PostGroup>
                <div className={main.postContainer}>
                    <div className={main.postRow}></div>
                </div>
            </div>
        </div>
    );
}
