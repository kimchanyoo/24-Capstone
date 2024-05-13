import styled from "@emotion/styled";
import React, {useState} from "react";
import { CustomLabel } from 'component/User/Label';
import { LogoImage } from '../Logo';
import {useNavigate} from "react-router-dom";
import { Button } from '../Button';
import {Title} from "../Title";
import { FieldSelectBox } from "../FieldSelectBox";
import {StackSelectBox} from "../StackSelectBox";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #6868ac;
  height: 100vh;
  width: 100vw;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  width: 400px;
  height: 550px;
  border-radius: 30px;
`;

const InterGroup = styled.div`
  margin-bottom: 10px;
`;

const Group2 = styled.div`
  margin-right: 270px;
`;

const ButtonGroup = styled.div`
  margin-top: 20px;
`;

const CareerBox = styled.input`
    width: 314px;
    height: 200px;
    font-weight: bold;
    font-size: 15px;
    background-color: #ffffff;
    border: 1px solid #d9d9d9;
`;

export const SignUpPage5 = () => {
    const navigate = useNavigate(); // useHistory 훅을 사용하여 history 인스턴스를 생성합니다.

    const [field, setField] = useState<number>(0);
    const [stack, setStack] = useState<number>(0);
    const [career, setCareer] = useState('');

    const handleChangeField = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = parseInt(e.target.value, 10); // 문자열을 숫자로 변환
        setField(value);
    };

    const handleChangeStack = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = parseInt(e.target.value, 10); // 문자열을 숫자로 변환
        setStack(value);
    };

    const handleChangeString = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setCareer(e.target.value);
    };
    const handleNextClick = () => {
        navigate('/login'); // '/SignUp'으로 페이지를 리다이렉트합니다.
    };

    return (
        <Container>
            <header>
                <LogoImage/>
            </header>
            <Content>
                <Group2>
                    <Title label="포지션" color="#000000"/>
                </Group2>
                <InterGroup>
                    <CustomLabel label="분야" color="#727272"/>
                    <FieldSelectBox value={field} name="field" onChange={handleChangeField}/>
                </InterGroup>
                <InterGroup>
                    <CustomLabel label="기술 스택" color="#727272"/>
                    <StackSelectBox value={stack} name="stack" onChange={handleChangeStack}/>
                </InterGroup>
                <InterGroup>
                    <CustomLabel label="경력 사항" color="#727272"/>
                    <CareerBox value={career} name="career" onChange={handleChangeString}/>
                </InterGroup>
                <ButtonGroup>
                    <Button label="티미 시작하기" color="#7C7FD1" onClick={handleNextClick}/>
                </ButtonGroup>
            </Content>
        </Container>
    );
};
