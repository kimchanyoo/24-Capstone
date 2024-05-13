import React from "react";
import { useNavigate } from 'react-router-dom';
import backPng from "../../img/back.png";
import btn from "../../stylesheet/Btn.module.css";

export const GoBackBtn = () => {

    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div>
            <img src={backPng} className={btn.back} onClick={handleGoBack}/>
        </div>
    );
}
