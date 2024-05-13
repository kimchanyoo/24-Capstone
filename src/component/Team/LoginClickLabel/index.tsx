import styled from "@emotion/styled";
import React from "react";

const Container = styled.div`
    margin-right: 20px;
    font-size: 16px;
    border: none;
    background-color: white;
    font-weight: 900;
    cursor: pointer;
`;

interface Props {
    readonly label: string;
    readonly onClick: () => void;
    readonly color: string;
}

export const LoginClickLabel = ({ label, onClick, color }: Props) => {
    return (
        <Container style={{color : color}} onClick={onClick}>
            {label}
        </Container>
    )
}