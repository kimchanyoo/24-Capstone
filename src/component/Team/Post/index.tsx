
import styled from "@emotion/styled";
import React from "react";
import guest from "../../img/guest.png";
import Pst from "../../stylesheet/Post.module.css";

interface ContainerProps {
    expired?: boolean;
}

const Container = styled.div<ContainerProps>`
    box-sizing: border-box;
    display: flex;
    top: 0;
    width: 320px;
    height: 192px;
    background: ${({ expired }) => (expired ? "rgba(0, 0, 0, 0.25)" : "#FFFFFF")};
    border: 0.5px solid rgba(0, 0, 0, 0.2);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 30px;
    margin-top: 30px ;
    margin-right: 1%;
    
    justify-content: center;
    align-items: center;
    font-weight: bolder;

    &:hover {
        background: ${({ expired }) => (expired ? "rgba(0, 0, 0, 0.25)" : "rgba(0, 0, 0, 0.05)")};
        cursor: ${({ expired }) => (expired ? "default" : "pointer")};
    }
`;

const PostsContainer = styled.div`
    display: flex;
    justify-content: space-between; /* 여기서 space-between은 서로 간격을 최대한 늘립니다. */
    flex-wrap: wrap; /* 만약 너비가 충분하지 않으면 자동으로 줄 바꿈합니다. */
`;

interface Props {
    readonly label: string;
    readonly onClick: () => void;
    readonly expired?: boolean; // expired prop 추가
}

export const Post = ({ label, onClick, expired=false }: Props) => {
    return (
        <Container onClick={onClick}>
            <div className={Pst.Body}>
                <div className={Pst.a}>
                    <img src={guest} className={Pst.UImg}/>
                    <label>닉네임</label>
                </div>

                <div className={Pst.b}>
                    모집인원ㅣ{label} 명
                </div>

                <div className={Pst.c}>
                    구분
                </div>

                <div className={Pst.d}>
                    제목이 들어갈 부분
                </div>

                <div className={Pst.e}>
                    0000-00-00 마감
                </div>
            </div>
            <label>{expired ? "모집 마감" : label}</label>
        </Container>
    )
}

export const PostList = ({posts}: { posts: { label: string; onClick: () => void; expired?: boolean }[] }) => {
    return (
        <PostsContainer>
            {posts.map((post: { label: string; onClick: () => void; expired?: boolean }, index: number) => (
                <Post key={index} label={post.label} onClick={post.onClick} expired={post.expired} />
            ))}
        </PostsContainer>
    );
};
