import React from "react";
import {Header} from "../Header";
import {LoginHeader} from "../LoginHeader";
import {GoBackBtn} from "../GoBackBtn";
import Reg from "../../stylesheet/TeamRegister.module.css";
import {Post} from "../Post";
import styled from "@emotion/styled";

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

export const StudyField = () => {
    return (
        <div>
            <LoginHeader/>
            <GoBackBtn/>
            <Container>
                <h1 className={Reg.title}>스터디 모집공고 📖</h1>
                <hr className={Reg.line}/>
                <PostGroup>
                    <Post label="빈 게시물" onClick={() => onclick}/>
                    <Post label="빈 게시물" onClick={() => onclick}/>
                    <Post label="빈 게시물" onClick={() => onclick}/>
                    <Post label="빈 게시물" onClick={() => onclick}/>
                    <Post label="빈 게시물" onClick={() => onclick}/>
                    <Post label="빈 게시물" onClick={() => onclick}/>
                    <Post label="빈 게시물" onClick={() => onclick}/>
                    <Post label="빈 게시물" onClick={() => onclick}/>
                    <Post label="빈 게시물" onClick={() => onclick}/>
                    <Post label="빈 게시물" onClick={() => onclick}/>
                    <Post label="빈 게시물" onClick={() => onclick}/>
                    <Post label="빈 게시물" onClick={() => onclick}/>
                    <Post label="빈 게시물" onClick={() => onclick}/>
                    <Post label="빈 게시물" onClick={() => onclick}/>
                    <Post label="빈 게시물" onClick={() => onclick}/>
                    <Post label="빈 게시물" onClick={() => onclick}/>
                </PostGroup>
            </Container>
        </div>
    );
}
