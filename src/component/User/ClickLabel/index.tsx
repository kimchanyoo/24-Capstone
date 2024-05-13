import styled from '@emotion/styled';
import React from 'react';

const Container = styled.div`
  position: absolute;
  font-size: 12px;
  text-align: center;
  cursor: pointer;
  color: #000000;
`;

interface Props {
  readonly label: string;
  readonly onClick: () => void;
}

export const ClickLabel = ({ label, onClick }: Props) => {
  return <Container onClick={onClick}>{label}</Container>;
};
