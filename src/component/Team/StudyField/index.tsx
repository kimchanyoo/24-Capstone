import React from "react";
import styled from "@emotion/styled";
import {useNavigate} from "react-router-dom";

const PostGroup=styled.div`
  display: flex;
  margin-left: 1%;
  flex-wrap: wrap;
`;

export const StudyField = () => {
    const navigate = useNavigate();
    const PostClick = () => {
        navigate('/PostIn/:postId');
    };

    return (
        <PostGroup>
            <></>
        </PostGroup>
    );
}
