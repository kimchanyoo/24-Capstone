import styled from "@emotion/styled";
import React, {useState} from "react";
import { CustomLabel } from 'component/User/Label';
import {useNavigate} from "react-router-dom";
import { Button } from '../Button';
import { Title } from "../Title";
import { FieldSelectBox } from "../FieldSelectBox";
import drop from "../../stylesheet/Drop.module.css"
import {Header} from "../Header";
import { useLocation } from "react-router-dom";
import { SignUpRequestDto } from "apis/request/auth";
import { SignUpResponseDto } from "apis/response/auth";
import {signUpRequest} from "apis";
import {ResponseDto} from "../../../apis/response";

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
  height: 600px;
  border-radius: 30px;
  margin-bottom: 30px;
`;

const SelectedList = styled.div`
  display: flex;
  flex-wrap: wrap;
  background: white;
  width: auto;
  gap: 3px;
  color: #d9d9d9;
  width: 320px;
`;

const SelectedItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  padding-left: 5px;
  padding-top: 1px;
  padding-bottom: 1px;
  margin-top: 5px;
  background-color: #d5d5d5;
  color: black;
  & button {
    display: flex;
    justify-content: center;
    align-items: center;
    background: none;
    border: none;
    color: gray;
    cursor: pointer;
    font-weight: bolder;
  }
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

const CareerBox = styled.textarea`
  width: 314px;
  height: 200px;
  font-weight: bold;
  font-size: 15px;
  background-color: #ffffff;
  border: 1px solid #d9d9d9;
`;

export const SignUpPage5 = () => {
    const navigate = useNavigate(); // useHistory 훅을 사용하여 history 인스턴스를 생성합니다.
    const location = useLocation();

    const [field, setField] = useState<number>(0);
    const [selectedTech, setSelectedTech] = useState<number[]>([]);
    const [career, setCareer] = useState('');

    const [school, setSchool] = useState<string>(location.state?.school || '');
    const [educationStatus, setEducationStatus] = useState<number>(location.state?.educationStatus);
    const [department, setDepartment] = useState<string>(location.state?.department || '');
    const [nickname, setNickname] = useState<string>(location.state?.nickname || '');
    const [name, setName] = useState<string>(location.state?.name || '');
    const [email, setEmail] = useState<string>(location.state?.email || '');
    const [ID, setID] = useState<string>(location.state?.ID || '');
    const [PW, setPW] = useState<string>(location.state?.PW || '');
    const [phoneNumber, setPhoneNumber] = useState<string>(location.state?.phoneNumber || '');

    const [nameError, setNameError] = useState<boolean>(false);
    const [nicknameError, setNicknameError] = useState<boolean>(false);
    const [emailError, setEmailError] = useState<boolean>(false);
    const [passwordError, setPasswordError] = useState<boolean>(false);
    const [phoneNumberError, setPhoneNumberError] = useState<boolean>(false);
    const [fieldError, setFieldError] = useState<boolean>(false);

    const handleChangeField = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = parseInt(e.target.value, 10); // 문자열을 숫자로 변환
        console.log(field);
        setField(value);
    };

    const onTechChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOption = Number(e.target.value);
        // 이미 선택된 값인지 확인하여 중복 선택을 방지합니다.
        if (!selectedTech.includes(selectedOption)) {
            setSelectedTech(prevSelectedValues => [...prevSelectedValues, selectedOption]);
        }
    };

    const removeSelectedTech = (techToRemove: number) => {
        setSelectedTech(prevSelectedTech => prevSelectedTech.filter(tech => tech !== techToRemove));
    };

    const handleChangeString = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setCareer(e.target.value);
    };
    const onSignUpButtonClickHandler = () => {
        const emailPattern = /^[a-zA-Z0-9]*@([-.]?[a-zA-Z0-9])*\.[a-zA-Z]{2,4}$/;
        const isEmailPattern = emailPattern.test(email);

        const isNicknamePattern = nickname.trim().length >= 2 && nickname.trim().length <= 12;
        if (!isNicknamePattern) {
            setNicknameError(true);
            alert('닉네임은 2자 이상 12자 이하로 설정해주세요');
        }

        const isNamePattern = name.trim().length >= 2 && name.trim().length <= 10;
        if (!isNamePattern) {
            setNameError(true);
            alert('이름은 2자 이상 10자 이하입니다.');
        }

        if (!isEmailPattern) {
            setEmailError(true);
            alert('이메일 형식이 맞지 않습니다.');
        }

        const isCheckedPassword = PW.trim().length >= 8 && PW.trim().length <= 20;
        if (!isCheckedPassword) {
            setPasswordError(true);
            alert('비밀번호는 8자 이상 20자 이하로 설정해주세요.');
        }

        const isPhoneNumber = /^01[0-9]-[0-9]{3,4}-[0-9]{4}$/;
        const isPhoneNumberPattern = isPhoneNumber.test(phoneNumber);
        if (!isPhoneNumberPattern) {
            setPhoneNumberError(true);
            alert('휴대폰 번호 11자리를 입력해주세요');
        }

        const requestBody: SignUpRequestDto = {
            email: email,
            userId: ID,
            pwd: PW,
            schoolName: school,
            attendanceStatus: educationStatus,
            department: department,
            nickName: nickname,
            name: name,
            phoneNumber: phoneNumber,
            field: field,
            tech: selectedTech,
            career: career
        };
        signUpRequest(requestBody).then(signUpResponse);
    };
    const signUpResponse = (responseBody: SignUpResponseDto | ResponseDto | null) => {
        if (!responseBody) {
            alert("네트워크 이상입니다.");
            return;
        }
        const {code} = responseBody;
        if (code === 'DBE') alert("데이터베이스 오류입니다.");
        if (code === 'VF') alert("모든 값을 입력하세요.");
        if (code !== 'SU') return;

        alert("회원가입이 완료되었습니다!");
        navigate('/login');
    }

    return (
        <>
            <Header />
            <Container>
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
                        <select className={drop.DropBtn} onChange={onTechChange}>
                            {Object.keys(techOptions).map((key) => (
                                <option key={key} value={key}>
                                    {techOptions[Number(key)]}
                                </option>
                            ))}
                        </select>
                        <SelectedList>
                            {selectedTech.map((value, index) => (
                                <SelectedItem key={index}>
                                    {techOptions[value]}
                                    <button onClick={() => removeSelectedTech(value)}>X</button>
                                </SelectedItem>
                            ))}
                        </SelectedList>
                    </InterGroup>
                    <InterGroup>
                        <CustomLabel label="경력 사항" color="#727272"/>
                        <CareerBox value={career} name="career" onChange={handleChangeString}/>
                    </InterGroup>
                    <ButtonGroup>
                        <Button label="티미 시작하기" color="#7C7FD1" onClick={onSignUpButtonClickHandler}/>
                    </ButtonGroup>
                </Content>
            </Container>
        </>
    );
};

const techOptions: { [key: number]: string } = {
    0: "C",
    1: "C++",
    2: "C#",
    3: "JAVA",
    4: "Python",
    5: "Kotlin",
    6: "SQL",
    7: "Figma",
    8: "Swift",
    9: "React Native",
    10: "React",
    11: "Unity",
    12: "Unreal",
    13: "Flutter",
    14: "JavaScript",
    15: "TypeScript",
    16: "Spring",
    17: "PHP",
    18: "Node.js",
    19: "Next.js",
    20: "Vue.js"
};
