import React, { useRef, useState } from "react";
import head from "../../stylesheet/Header.module.css";
import logo from "../../img/teami-logo.png";
import Llogo from "../../img/login-logo.png";
import { LoginClickLabel } from "../LoginClickLabel";
import styled from "@emotion/styled";
import { useNavigate, Link } from "react-router-dom";
import { DropDown } from "../DropDownMenu";

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

export const LoginHeader: React.FC = () => {
    const navigate = useNavigate();
    const [isDropDownVisible, setIsDropDownVisible] = useState(false);

    const TeamRegisterClick = () => {
        navigate('/TeamRegister');
    };

    const handleLoginLogoClick = () => {
        setIsDropDownVisible(!isDropDownVisible);
    };

    return (
        <div>
            <header className={head.header}>
                <div className={head.logoContainer}>
                    <Link to="../MainPage">
                        <img src={logo} alt="logo" className={head.logo} />
                    </Link>
                </div>
                <LoginLabel>
                    <LoginClickLabel label='팀 구성하기' onClick={TeamRegisterClick} color="#6868AC"/>
                    <div style={{ position: 'relative' }}>
                        <img src={Llogo} alt="login-logo" className={head.loginLogo} onClick={handleLoginLogoClick} />
                        {isDropDownVisible && (
                            <DropdownContainer>
                                <DropDown />
                            </DropdownContainer>
                        )}
                    </div>
                </LoginLabel>
            </header>
        </div>
    );
};
