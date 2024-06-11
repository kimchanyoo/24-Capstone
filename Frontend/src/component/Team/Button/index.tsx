import styled from '@emotion/styled';
import React from "react";

const Container = styled.div<{backgroundColor: string}>`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 114px;
    height: 37px;
    font-size: 14px;
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
}

export const Button = ({ label, onClick, backgroundColor }: Props) => {
    return (
        <Container backgroundColor={backgroundColor} onClick={onClick}>
            {label}
        </Container>
    );
}

