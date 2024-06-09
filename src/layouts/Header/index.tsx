import React, { useEffect } from "react";
import head from "../../component/stylesheet/Header.module.css";
import logo from "../../component/img/teami-logo.png";
import {LoginClickLabel} from "../../component/Team/LoginClickLabel";
import { useNavigate, Link } from 'react-router-dom';
import { useCookies } from "react-cookie";
import { useState } from "react";
import styled from "@emotion/styled";
import Llogo from "component/img/login-logo.png";
import { DropDown } from "component/Team/DropDownMenu";
import { useLoginUserStore } from "stores";

const LoginLabel = styled.div`
    display: flex;
    align-items: center;
`;
const DropdownContainer = styled.div`
    position: absolute;
    top: calc(100% + 10px); /* 이미지 아래에 위치 */
    right: 30%;
    top: 60%;
`;


export const Header: React.FC = () => {

    // state 로그인 User 상태
    const {loginUser, setLoginUser, resetLoginUser} = useLoginUserStore();
    // state cookie 상태
    const [cookies, setCookie] = useCookies();
    // state 로그인 상태
    const [isLogin, setLogin] = useState<boolean>(false);

    const navigate = useNavigate();
    const LoginClick = () => {
        navigate('/login');
        console.log('로그인 버튼이 클릭되었습니다.');
    };     // 로그인 버튼을 클릭했을 때 수행할 동작을 정의합니다.

    // 로그인 또는 아이콘 상태
    const LoginButton = () => {

        useEffect(() => {
            setLogin(loginUser !== null);
        }, [loginUser]);

        // event handler: 아이콘 버튼 및 드롭다운
        const [isDropDownVisible, setIsDropDownVisible] = useState(false);
        const TeamRegisterClick = () => {
            if (!loginUser) return;
            const { userId } = loginUser;
            navigate('/TeamRegister', {state: {userId}});
        };
        const handleLoginLogoClick = () => {
            setIsDropDownVisible(!isDropDownVisible);
        };

        if (isLogin)
            // 로그인
            return (
                <LoginLabel>
                    <LoginClickLabel label='팀 구성하기' onClick={TeamRegisterClick} color="#6868AC"/>
                    <div style={{position: 'relative'}}>
                        <img src={Llogo} alt="login-logo" className={head.loginLogo} onClick={handleLoginLogoClick}/>
                        {isDropDownVisible && (
                            <DropdownContainer>
                                <DropDown/>
                            </DropdownContainer>
                        )}
                    </div>
                </LoginLabel>
            );

        // 비로그인
        return (
            <LoginClickLabel label='로그인' onClick={LoginClick} color='black'/>
        );
    }

    return (
        <div>
            <header className={head.header}>
                <div className={head.logoContainer}>
                    <Link to="/">
                        <img src={logo} alt="logo" className={head.logo} />
                    </Link>
                </div>
                <div>
                    <LoginButton/>
                </div>
            </header>
        </div>
    );
};
