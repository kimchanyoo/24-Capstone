import styled from '@emotion/styled';
import React from 'react';

interface ContainerProps {
  readonly color: string;
}

const Container = styled.button<ContainerProps>`
  border: 0;
  color: #ffffff;
  background-color: ${(props) => props.color};
  cursor: pointer;
  width: 320px;
  height: 50px;
  border-radius: 10px;
  font-weight: bold;
  font-size: 15px;

  &:hover {
    background-color: ${(props) => props.color};
    opacity: 0.8;
  }

  &:active {
    box-shadow: inset 5px 5px 10px rgba(0, 0, 0, 0.2);
  }
`;

interface Props {
  readonly label: string;
  readonly color: string;
  readonly onClick?: () => void;
}

export const Button = ({ label, color, onClick }: Props) => {
  return (
    <Container color={color} onClick={onClick}>
      {label}
    </Container>
  );
};
