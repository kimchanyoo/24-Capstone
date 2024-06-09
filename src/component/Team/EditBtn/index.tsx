import styled from '@emotion/styled';
import {useNavigate, useParams } from 'react-router-dom';
import React from "react";
import { useLoginUserStore } from 'stores';
import { PostListItem } from 'types/interface';

const Container = styled.div<{backgroundColor: string}>`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 114px;
    height: 37px;
    font-size: 16px;
    border-radius: 30px;  
    color: white;
    font-weight: bolder;
    margin-right: 20px;
    cursor: pointer;
    background-color: ${props => props.backgroundColor};
`;

interface Props {
    readonly label: string;
    readonly onClick: () => void;
    readonly backgroundColor: string;
    readonly isEditable: boolean; // 수정 가능 여부를 나타내는 props 추가
}

export const EditBtn = ({ label, onClick, backgroundColor, isEditable }: Props) => {
    const { postId } = useParams();
    // function: 네비게이트 함수
    const navigate = useNavigate();

    const handleClick = () => {
        if (isEditable) {
            console.log("수정 버튼 클릭")
            if (!postId) return;
            navigate(`/TeamUpdate/${postId}`);
        }
        else {
            onClick();
        }
    }

    return (
        <Container backgroundColor={backgroundColor} onClick={handleClick}>
            {isEditable ? "수정" : label}
        </Container>
    );
}
