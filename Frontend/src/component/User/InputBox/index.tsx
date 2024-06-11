import styled from "@emotion/styled";
import React from "react";

const Container = styled.input`
    width: 314px;
    height: 40px;
    font-weight: bold;
    font-size: 15px;
    background-color: #ffffff;
    border: 1px solid #d9d9d9;
`;

interface Props {
    readonly label: string;
    readonly type: string;
    readonly value: string; // value 속성 추가
    readonly onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // onChange 속성 추가
}

// Props에서 value와 onChange를 구조 분해 할당을 통해 받아옵니다.
export const InputBox = ({ label, type, value, onChange }: Props) => {
    return (
        <Container
            type={type}
            value={value} // 부모 컴포넌트로부터 받은 value 사용
            onChange={onChange} // 부모 컴포넌트로부터 받은 onChange 함수 사용
            placeholder={label} // label 값을 placeholder로 사용
        />
    );
}
