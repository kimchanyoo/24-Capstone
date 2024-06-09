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
  readonly onClickHandler?: (email: string) => void; // 새로운 프로퍼티 추가
}

export const Button = ({ label, color, onClick, onClickHandler }: Props) => {
  const handleClick = () => {
    if (onClickHandler) {
      // onClickHandler가 정의되어 있으면 호출
      onClickHandler(''); // 빈 문자열 전달, 사용하지 않는다면 다른 값도 가능
    }
    if (onClick) {
      // onClick이 정의되어 있으면 호출
      onClick();
    }
  };

  return (
      <Container color={color} onClick={handleClick}>
        {label}
      </Container>
  );
};
