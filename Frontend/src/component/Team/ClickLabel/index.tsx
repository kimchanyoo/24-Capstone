import styled from "@emotion/styled";
import React from "react";

const Container = styled.div`
    font-size: 12px;
    cursor: pointer;
    color: #000000;
    margin-right: 95%;
`;

interface Props {
    readonly label: string;
    readonly onClick: () => void;
    readonly color: string;
}

export const ClickLabel = ({ label, onClick, color }: Props) => {
    return (
        <Container onClick={onClick} style={{color : color}}>
            {label}
        </Container>
    )
}