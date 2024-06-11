import styled from "@emotion/styled";
import React, { useState } from 'react'; // useState 훅을 import 합니다.

interface ContainerProps {
    readonly color: string;
}

const Container = styled.form`
  position: relative;
  display: flex;
  align-items: center;
  width: 318px;
  height: 40px;
  font-weight: bold;
  font-size: 15px;
  background-color: #ffffff;
  border: 1px solid #d9d9d9;
`;

const Button = styled.button<ContainerProps>`
  position: absolute;
  right: 10px;
  border: 0;
  color: #ffffff;
  background-color: ${(props) => props.color};
  cursor: pointer;
  width: 50px;
  height: 25px;
  border-radius: 10px;
  font-weight: bold;
  font-size: 12px;

  &:hover {
    background-color: ${(props) => props.color};
    opacity: 0.8;
  }

  &:active {
    box-shadow: inset 5px 5px 10px rgba(0, 0, 0, 0.2);
  }
`;

const Label = styled.input`
  width: 95%;
  height: 95%;
  padding-right: 40px;
  border: 0;
  font-size: 15px;
  font-weight: bold;
`;

interface Props {
    readonly label: string;
    readonly type: string;
    readonly color: string;
    readonly buttonLabel: string;
    readonly value: string | number | undefined; // value 속성 추가
    readonly onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // onChange prop을 추가합니다.
    readonly onClick?: () => void;
}

export const CheckButton = ({ label, color, onClick, buttonLabel, type, value, onChange }: Props) => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // 폼 제출의 기본 동작을 방지합니다.
        if(onClick) {
            onClick(); // 추가적으로 onClick 함수가 있다면 실행합니다.
        }
    }

    return (
        <Container onSubmit={handleSubmit}> {/* 폼 제출 이벤트 핸들러를 추가합니다. */}
            <Label type={type}
                   value={value} // 부모 컴포넌트로부터 받은 value 사용
                   onChange={onChange} // 부모 컴포넌트로부터 받은 onChange 함수 사용
                   placeholder={label} // label 값을 placeholder로 사용
            />
            <Button color={color} type="submit">
                {buttonLabel}
            </Button>
        </Container>
    );
};