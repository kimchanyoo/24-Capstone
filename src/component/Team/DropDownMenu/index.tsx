import React from "react";
import drop from "../../stylesheet/DropDown.module.css"
import {Link} from "react-router-dom";

export const DropDown = () => {
    return (
        <ul className={drop.menu}>
            <Link to="/MyPage">
                <li>내 정보 수정</li>
            </Link>
            <Link to="/MyField">
                <li>내 작성글</li>
            </Link>
            <li>채팅</li>
            <Link to="/MainPage">
                <li>로그아웃</li>
            </Link>
        </ul>
    )
};
