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
  font-size: 20px;
  font-weight: bold;
`;

interface Props {
  readonly label: string;
  readonly color: string;
}

export const Title = ({ label, color }: Props) => {
  return (
    <Container>
      <Label style={{ color: color }}>{label}</Label>
    </Container>
  );
};
