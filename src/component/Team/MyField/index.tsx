import React from "react";
import {Header} from "../Header";
import {LoginHeader} from "../LoginHeader";
import {GoBackBtn} from "../GoBackBtn";
import Reg from "../../stylesheet/TeamRegister.module.css";
import styled from "@emotion/styled";
import {Post} from "../Post";
import {MyPost} from "../MyPost";

const Container=styled.div`
    width: auto;
    height: auto;
    margin-left: 10%;
    margin-right: 10%;
`;
const PostGroup=styled.div`
    display: flex;
    margin-left: 1%;
    flex-wrap: wrap;
`;

export const MyField = () => {
    return (
        <div>
            <LoginHeader/>
            <GoBackBtn/>
            <Container>
                <h1 className={Reg.title}>내 작성글 ✍️</h1>
                <hr className={Reg.line}/>
                <MyPost label="빈 페이지" onClick={()=>onclick}/>
                <MyPost label="빈 페이지" onClick={()=>onclick}/>
                <MyPost label="빈 페이지" onClick={()=>onclick}/>
                <MyPost label="빈 페이지" onClick={()=>onclick}/>
            </Container>
        </div>
    );
}
