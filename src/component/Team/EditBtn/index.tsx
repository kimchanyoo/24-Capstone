import styled from '@emotion/styled';
import React from "react";

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
    const handleClick = () => {
        if (isEditable) {
            // 수정 버튼 클릭 시의 동작 구현
            console.log("수정 버튼 클릭")
        } else {
            onClick();
        }
    };

    return (
        <Container backgroundColor={backgroundColor} onClick={onClick}>
            {isEditable ? "수정" : label}
        </Container>
);
}

export const handleClick = () => {
    // 클릭 핸들러 함수의 내용을 여기에 작성
};