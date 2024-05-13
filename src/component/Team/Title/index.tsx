import styled from '@emotion/styled';
import React from 'react';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Label = styled.div`
    position: absolute;
    margin-bottom: 50px;
    color: #6868AC;
    font-size: 20px;
    font-weight: bold;
`;

interface Props {
    readonly label: string;
}

export const Title = ({ label }: Props) => {
    return (
        <Container>
            <Label>{label}</Label>
        </Container>
    );
};