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
    options?: { value: number; name: string }[];
    value: number;
    name: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const OPTIONS = [
    { value: 0, name: "프론트엔드" },
    { value: 1, name: "백엔드" },
    { value: 2, name: "디자이너" },
    { value: 3, name: "앱 개발자" },
    { value: 4, name: "PM" },
    { value: 5, name: "기획자" },
    { value: 6, name: "게임 개발자" },
];

export const FieldSelectBox = ({ options = OPTIONS, value, name, onChange }: Props) => {
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
