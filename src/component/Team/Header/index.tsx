import React from "react";
import head from "../../stylesheet/Header.module.css";
import logo from "../../img/teami-logo.png";
import {LoginClickLabel} from "../LoginClickLabel";
import { useNavigate, Link } from 'react-router-dom';


export const Header: React.FC = () => {

    const navigate = useNavigate();
    const LoginClick = () => {
        navigate('/login');
        console.log('로그인 버튼이 클릭되었습니다.');
    };     // 로그인 버튼을 클릭했을 때 수행할 동작을 정의합니다.

    return (
        <div>
            <header className={head.header}>
                <div className={head.logoContainer}>
                    <Link to="/">
                        <img src={logo} alt="logo" className={head.logo} />
                    </Link>
                </div>
                <div>
                    <LoginClickLabel label='로그인' onClick={LoginClick} color='black'/>
                </div>
            </header>
        </div>
    );
};
