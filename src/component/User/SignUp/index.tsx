import styled from '@emotion/styled';
import React, {useState} from 'react';
import { Title } from 'component/User/Title';
import { CustomLabel } from 'component/User/Label';
import { Button } from '../Button';
import { LogoImage } from '../Logo';
import { SelectBox } from '../SelectBox';
import {useNavigate} from "react-router-dom";
import { InputBox } from "../InputBox";
import { TextField, Autocomplete } from '@mui/material';
import schoolList from "./schools";

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
  margin-bottom: 12px;
`;

const Group2 = styled.div`
  margin-right: 270px;
`;
const Group = styled.div`
  margin-top: 60px;
`;

const ButtonGroup = styled.div`
  margin-top: 30px;
`;

export const SignUpPage = () => {
    const navigate = useNavigate();
    const [schoolEmail, setSchoolEmail] = useState(''); // 학교 이메일을 위한 상태
    const [certification, setCertification] = useState<boolean>(false);
    const [selectedValue, setSelectedValue] = useState('');
    const [selectedSchool, setSelectedSchool] = useState<string | null>(null);

    const handleChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setSelectedValue(e.target.value);
    };

    const handleSchoolCertification = () => {
        setCertification(true);
        alert("인증되었습니다.");
    }

    const handleNextClick = () => {
        // 모든 입력 필드가 채워졌는지 검사
        if (!selectedSchool?.trim() || !schoolEmail.trim()) {
            alert('회원 가입 양식을 모두 채워주세요.'); // 필드가 비어있다면 사용자에게 알림
            return; // 리다이렉션을 방지
        }
        if(!certification) {
            alert('학교 인증을 해주세요.');
            return;
        }
        navigate('/SignUp2'); // 모든 조건이 충족되면 페이지 리다이렉트
    };

    const certificationButtonColor = certification ? "#C3C3C3" : "#7C7FD1";
    const nextButtonColor = certification ? "#7C7FD1" : "#C3C3C3";

    return (
        <Container>
            <header>
                <LogoImage/>
            </header>
            <Content>
                <Title label="회원가입" color="#6868AC"/>
                <Group>
                    <Group2>
                        <Title label="학교 선택" color="#000000"/>
                    </Group2>
                    <InterGroup>
                        <CustomLabel label="학교" color="#727272"/>
                        <Autocomplete
                            options={schoolList}
                            getOptionLabel={(option) => option} // 옵션을 어떻게 표시할지 정의합니다.
                            value={selectedSchool} // 선택된 학교 이름
                            onChange={(event, newValue) => {
                                setSelectedSchool(newValue); // 선택된 학교 이름을 업데이트
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="outlined"
                                    InputProps={{
                                        ...params.InputProps,
                                        style: {
                                            height: '40px', // 텍스트 박스의 전체 높이
                                            borderRadius: '0px',
                                            paddingBottom: '40px', // 아래쪽 패딩
                                            paddingTop: '0px', // 아래쪽 패딩
                                            paddingLeft: '0px', // 아래쪽 패딩
                                        },
                                    }}
                                />
                            )}
                        />
                    </InterGroup>
                    <InterGroup>
                        <CustomLabel label="학교 이메일" color="#727272"/>
                        <InputBox label="" type="text" value={schoolEmail} onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setSchoolEmail(e.target.value)}/>
                    </InterGroup>
                    <InterGroup>
                        <CustomLabel label="학적 종류" color="#727272"/>
                        <SelectBox value={selectedValue} name="educationStatus" onChange={handleChange}/>
                    </InterGroup>
                </Group>
                <ButtonGroup>
                    <Button label="인증" color={certificationButtonColor} onClick={handleSchoolCertification}/>
                <InterGroup />
                    <Button label="다음" color={nextButtonColor} onClick={handleNextClick} />
                </ButtonGroup>
            </Content>
        </Container>
    );
};
