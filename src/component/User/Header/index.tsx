import React from "react";
import head from "../../stylesheet/Header.user.module.css";
import logo from "../../img/Logo.png";
import { useNavigate, Link } from 'react-router-dom';

export const Header: React.FC = () => {

    const navigate = useNavigate();
    const HomeClick = () => {
        navigate('/MainPage');
        console.log('홈 버튼이 클릭되었습니다.');
    };     // 로그인 버튼을 클릭했을 때 수행할 동작을 정의합니다.

    return (
        <div>
            <header className={head.header}>
                <div className={head.logoContainer}>
                    <Link to="/">
                        <img src={logo} alt="logo" className={head.logo} onClick={HomeClick}/>
                    </Link>
                </div>
            </header>
        </div>
    );
};
