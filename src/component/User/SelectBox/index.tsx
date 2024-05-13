import React from 'react';
import styled from '@emotion/styled';

const Container = styled.select`
  box-sizing: border-box;
  width: 320px;
  height: 40px;
  font-weight: bold;
  font-size: 15px;
  background-color: #ffffff;
  border: 1px solid #d9d9d9;
`;

interface Props {
    options?: { value: string; name: string }[];
    value: string;
    name: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; // onChange prop을 추가합니다.
}

const OPTIONS = [
    { value: "재학", name: "재학" },
    { value: "졸업", name: "졸업" },
    { value: "휴학", name: "휴학" },
];

export const SelectBox = ({ options = OPTIONS, value, name, onChange }: Props) => {
    return (
        <Container value={value} name={name} onChange={onChange}> {/* onChange 이벤트 핸들러를 추가합니다. */}
            {options.map(option => (
                <option key={option.value} value={option.value}>
                    {option.name}
                </option>
            ))}
        </Container>
    );
};
