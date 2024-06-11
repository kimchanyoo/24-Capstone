import styled from "@emotion/styled";
import React, { useState } from "react";
import { CustomLabel } from 'component/User/Label';
import {useNavigate} from "react-router-dom";
import {useLocation} from "react-router-dom";
import { Button } from '../Button';
import { Header } from '../Header';
import {Title} from "../Title";
import { TextField, Autocomplete } from '@mui/material';
import departmentList from "component/User/SignUp2/departments";

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
  margin-bottom: 30px;
`;

const InterGroup = styled.div`
  margin-bottom: 70px;
`;

const Group2 = styled.div`
  margin-right: 270px;
`;
const ButtonGroup = styled.div`
  margin-top: 230px;
`;

export const SignUpPage2 = () => {
    const location = useLocation();
    const navigate = useNavigate(); // useHistory 훅을 사용하여 history 인스턴스를 생성합니다.

    const [school, setSchool] = useState(location.state?.school || '');
    const [schoolEmail, setSchoolEmail] = useState(location.state?.schoolEmail || '');
    const [educationStatus, setEducationStatus] = useState<number>(location.state?.educationStatus);

    const [department, setDepartment] = useState<string | null>(null);

    const handleNextClick = () => {
        // 모든 입력 필드가 채워졌는지 검사

        if (!department?.trim()) {
            alert('회원 가입 양식을 모두 채워주세요.'); // 필드가 비어있다면 사용자에게 알림
            return; // 리다이렉션을 방지
        }
        navigate('/SignUp3', {
            state: {
                school: school,
                educationStatus: educationStatus,
                department: department
            }
        });
    };

    return (
        <>
        <Header />
        <Container>
            <Content>
                <Group2>
                    <Title label="학과 선택" color="#000000"/>
                </Group2>
                <InterGroup>
                    <CustomLabel label="학과" color="#727272"/>
                    <Autocomplete
                        options={departmentList}
                        getOptionLabel={(option) => option} // 옵션을 어떻게 표시할지 정의합니다.
                        value={department} // 선택된 학교 이름
                        onChange={(event, newValue) => {
                            setDepartment(newValue); // 선택된 학과 이름을 업데이트
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                variant="outlined"
                                InputProps={{
                                    ...params.InputProps,
                                    style: {
                                        width: '314px',
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
                <ButtonGroup>
                    <Button label="다음" color="#7C7FD1" onClick={handleNextClick}/>
                </ButtonGroup>
            </Content>
        </Container>
        </>
    );
};
