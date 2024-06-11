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
    { value: 0, name: "C" },
    { value: 1, name: "C++" },
    { value: 2, name: "C#" },
    { value: 3, name: "Java" },
    { value: 4, name: "Python" },
    { value: 5, name: "Kotlin" },
    { value: 6, name: "SQL" },
    { value: 7, name: "Figma" },
    { value: 8, name: "Swift" },
    { value: 9, name: "React Native" },
    { value: 10, name: "React" },
    { value: 11, name: "Unity" },
    { value: 12, name: "Unreal" },
    { value: 13, name: "Flutter" },
    { value: 14, name: "JavaScript" },
    { value: 15, name: "TypeScript" },
    { value: 16, name: "Spring" },
    { value: 17, name: "PHP" },
    { value: 18, name: "Node.js" },
    { value: 19, name: "Next.js" },
    { value: 20, name: "Vue.js" },
];

export const StackSelectBox = ({ options = OPTIONS, value, name, onChange }: Props) => {
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
