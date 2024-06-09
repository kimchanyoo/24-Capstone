import React from "react";
import drop from "component/stylesheet/DropDown.module.css";
import {Link, useNavigate} from "react-router-dom";
import { useLoginUserStore } from "stores";
import { useCookies } from "react-cookie";

export const DropDown = () => {
    const {loginUser, setLoginUser, resetLoginUser} = useLoginUserStore();
    const [cookies, setCookie] = useCookies();
    const navigate = useNavigate();
    const MyPageClick = () => {
        if (!loginUser) return;
        const { userId } = loginUser;
        navigate('/MyPage', {state: {userId}});
    };
    const MyFieldClick = () => {
        if (!loginUser) return;
        const { userId } = loginUser;
        navigate('/MyField', {state: {userId}});
    };
    const LogOutClick = () => {
        resetLoginUser();
        setCookie('accessToken', '', {path:'/', expires: new Date()});
        navigate('/');
    };

    if (!loginUser) {
        return null;
    }
    return (
        <ul className={drop.menu}>
            <li className={drop.a} onClick={MyPageClick}>내 정보</li>
            <li className={drop.a} onClick={MyFieldClick}>내 작성글</li>
            <li className={drop.a} onClick={LogOutClick}>로그아웃</li>
        </ul>
    )
};
