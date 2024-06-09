import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Button } from "../Button";
import { useNavigate, useLocation } from "react-router-dom";
import { GoBackBtn } from "../GoBackBtn";
import My from "../../stylesheet/My.module.css";
import { useLoginUserStore } from "stores";
import { useCookies } from "react-cookie";
import { showUserInformationRequest } from 'apis';
import { ShowUserInformationResponseDto } from 'apis/response/user';
import { ResponseDto } from 'apis/response';
import { User } from 'types/interface';
import { NicknameCheckRequestDto } from "apis/request/auth";
import { NicknameCheckResponseDto } from "apis/response/auth";
import { nicknameCheckRequest } from "apis";
import { UpdateInformationRequestDto } from "apis/request/user";
import { UpdateInformationResponseDto } from "apis/response/user";
import { updateInformationRequest } from "apis";
import { DeleteInformationResponseDto } from "apis/response/user";
import { deleteInformationRequest } from "apis";

const Container = styled.div`
  display: grid;
  grid-template-columns: 150px 480px 200px;
  width: auto;
  height: auto;
  overflow: auto;
  margin-right: 10%;
  margin-left: 10%;
  padding-bottom: 30px;
  font-weight: bold;
  font-size: 20px;
`;

const SelectedList = styled.div`
  display: flex;
  flex-wrap: wrap;
  background: white;
  width: 425px;
  gap: 3px;
  color: #d9d9d9;
  font-size: 15px;
  margin-top: -40px;
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

const ButtonGroup = styled.div`
  display: flex;
  justify-content: right;
  margin-right: 10%;
  margin-top: 20px;
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 10%;
  margin-left: 10%;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  margin-left: 10%;
  gap: 44px;
  padding: 10px;
`;

const Space = styled.div`
  display: grid;
  grid-template-rows: repeat(9, auto);
  gap: 41px;
  margin-top: 32px;
  margin-left: 50px;
`;

const Space_2 = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 35px;
  margin-left: 50px;
  gap: 38px;
`;

export const MyPageUpdate: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState<User | null>(null); // 사용자 정보를 저장할 상태 정의
    const { setLoginUser, resetLoginUser } = useLoginUserStore();
    const [cookies, setCookie] = useCookies();

    const [userId, setUserId] = useState('');

    useEffect(() => {
        if (location.state?.userId) {
            setUserId(location.state.userId);
        }
        console.log('User ID:', location.state?.userId);
    }, [location.state]);

    const [nickname, setNickname] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [field, setField] = useState<number>(0);
    const [selectedTech, setSelectedTech] = useState<number[]>([]);
    const [career, setCareer] = useState('');

    const [nicknameError, setNicknameError] = useState<boolean>(false);
    const [phoneNumberError, setPhoneNumberError] = useState<boolean>(false);

    const handleChangeField = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = parseInt(event.target.value, 10);
        setField(value);
        setUser((prevUser) => (prevUser ? { ...prevUser, field: value } : null));
    };

    const onTechChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOption = Number(event.target.value);
        // 이미 선택된 값인지 확인하여 중복 선택을 방지합니다.
        if (!selectedTech.includes(selectedOption)) {
            setSelectedTech(prevSelectedValues => [...prevSelectedValues, selectedOption]);
        }
    };

    const removeSelectedTech = (techToRemove: number) => {
        setSelectedTech(prevSelectedTech => prevSelectedTech.filter(tech => tech !== techToRemove));
    };

    const handleChangeString = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCareer(event.target.value);
    };

    const handleNicknameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNickname(event.target.value);
    };

    const CancelButton = () => {
        navigate('/MyPage');
    };

    const fieldOptions: {[key: number]: string} = {
        0: "프론트엔드",
        1: "백엔드",
        2: "디자이너",
        3: "앱 개발자",
        4: "PM",
        5: "기획자",
        6: "게임 개발자"
    };

    const techOption: { [key: number]: string } = {
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

    const userUpdateButtonClickHandler = () => {
        const accessToken = cookies.accessToken;
        if (!accessToken) {
            console.error("No accessToken found");
            return;
        }

        const isNicknamePattern = nickname.trim().length >= 2 && nickname.trim().length <= 12;
        if (!isNicknamePattern) {
            setNicknameError(true);
            alert('닉네임은 2자 이상 12자 이하로 설정해주세요');
        }

        const isPhoneNumber = /^01[0-9]-[0-9]{3,4}-[0-9]{4}$/;
        const isPhoneNumberPattern = isPhoneNumber.test(phoneNumber);
        if (!isPhoneNumberPattern) {
            setPhoneNumberError(true);
            alert('휴대폰 번호 11자리를 입력해주세요');
        }

        const requestBody: UpdateInformationRequestDto = {
            nickName: nickname,
            phoneNumber: phoneNumber,
            field: field,
            tech: selectedTech,
            career: career
        }
        updateInformationRequest(requestBody, accessToken).then(updateInformationResponse);
    }
    const updateInformationResponse = (responseBody: UpdateInformationResponseDto | ResponseDto | null) => {
        if (!responseBody) {
            alert("네트워크 이상입니다.");
            return;
        }
        const {code} = responseBody;
        if (code === 'DBE') alert("데이터베이스 오류입니다.");
        if (code === 'NU') alert("존재하지 않는 유저입니다.");
        if (code !== 'SU') return;

        alert("정보가 수정되었습니다!");
        navigate('/MyPage');
    }
    const onNicknameCheckButtonClickHandler = () => {
        const requestBody: NicknameCheckRequestDto= {
            nickName: nickname
        };
        nicknameCheckRequest(requestBody).then(nicknameCheckResponse);
    }
    const nicknameCheckResponse = (responseBody: NicknameCheckResponseDto | ResponseDto | null) => {
        console.log('Response Body:', responseBody); // responseBody를 콘솔에 출력
        if (!responseBody) {
            alert("네트워크 이상입니다.");
            return;
        }
        const {code} = responseBody;
        if (code === 'DBE') alert("데이터베이스 오류입니다.");
        if (code === 'VF') alert("닉네임 양식에 맞게 입력해주세요.");
        if (code === 'DN') alert("중복된 닉네임입니다.");
        if (code !== 'SU') return;

        alert("사용가능한 닉네임입니다.")
    }

    const showUserInformationResponse = (responseBody: ShowUserInformationResponseDto | ResponseDto | null) => {
        if (!responseBody) return;
        const { code } = responseBody;
        if (code === "AF" || code === "NU" || code === "DBE") {
            resetLoginUser();
            return;
        }
        const loginUser: User = { ...responseBody as ShowUserInformationResponseDto };
        setLoginUser(loginUser);
        setUser(loginUser); // 사용자 정보를 상태에 저장
        setNickname(loginUser.nickName || '');
        setPhoneNumber(loginUser.phoneNumber || '');
        setField(loginUser.field || 0); // 초기 필드 값 설정
        setSelectedTech(loginUser.tech || []); // 초기 기술 스택 설정
        setCareer(loginUser.career || ''); // 초기 경력 설정
    }

    const userDeleteButtonClickHandler = () => {
        const accessToken = cookies.accessToken;
        deleteInformationRequest(userId, accessToken).then(deleteInformationResponse);
    }

    const deleteInformationResponse = (responseBody: DeleteInformationResponseDto | ResponseDto | null) => {
        if (window.confirm("계정을 탈퇴하시겠습니까?")) {
            if (!responseBody) {
                alert("네트워크 이상입니다.");
                return;
            }
            const {code} = responseBody;
            if (code === 'VF') alert("유효성 검사 실패");
            if (code === 'NU') alert("존재하지 않는 유저입니다.");
            if (code === 'NP') alert("아이디를 삭제할 권한이 없습니다.");
            if (code === 'DBE') alert("데이터베이스 오류");
            if (code !== 'SU') return;

            alert("회원 정보가 삭제되었습니다.");
            resetLoginUser();
            setCookie('accessToken', '', {path:'/', expires: new Date()});
            navigate('/');
        }
    }

    const resetPwdHandler = () => {
        navigate('/ResetPW')
    }

    const formatPhoneNumber = (input: string): string => {
        // Remove any non-numeric characters
        const cleaned = input.replace(/\D/g, '');
        // Apply the format
        const formatted = cleaned.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
        // Return the formatted number
        return formatted;
    }

    useEffect(() => {
        if (!cookies.accessToken) {
            resetLoginUser();
            return;
        }
        showUserInformationRequest(cookies.accessToken).then(showUserInformationResponse);
    }, [cookies.accessToken]);

    return (
        <div>
            <GoBackBtn />
            <Title>
                <h1 className={My.title}>내 정보 😎</h1>
                <div style={{ display: "flex" }}>
                    <Button label="탈퇴" onClick={userDeleteButtonClickHandler} backgroundColor="#CC0000" />
                    <Button label="비밀번호 재설정" onClick={resetPwdHandler} backgroundColor="#6868AC" />
                </div>
            </Title>
            <hr className={My.line} />
            <Container>
                <Body>
                    <div className={My.tle}>닉네임</div>
                    <div className={My.tle}>이름</div>
                    <div className={My.tle}>아이디</div>
                    <div className={My.tle}>휴대폰 번호</div>
                    <div className={My.tle}>이메일</div>
                    <div className={My.tle}>학교</div>
                    <div className={My.tle}>학과</div>
                    <div className={My.tle}>분야</div>
                    <div className={My.tle}>기술</div>
                    <br />
                    <div className={My.tle}>경력</div>
                </Body>
                <Space>
                    <input className={My.box} value={nickname} onChange={handleNicknameChange}/>
                    <input className={My.box} value={user?.name || ''} readOnly/>
                    <input className={My.box} value={user?.userId || ''} readOnly/>
                    <input className={My.box} value={phoneNumber} onChange={(e) => setPhoneNumber(formatPhoneNumber(e.target.value))} />
                    <input className={My.box} value={user?.email || ''} readOnly/>
                    <input className={My.box} value={user?.schoolName || ''} readOnly></input>
                    <input className={My.box} value={user?.department || ''} readOnly></input>
                    <select className={My.box} value={user?.field || 0} onChange={handleChangeField}>
                        {Object.keys(fieldOptions).map((key) => (
                            <option key={key} value={key}>
                                {fieldOptions[Number(key)]}
                            </option>
                        ))}
                    </select>
                    <select className={My.box} onChange={onTechChange}>
                        {Object.keys(techOption).map((key) => (
                            <option key={key} value={key}>
                                {techOption[Number(key)]}
                            </option>
                        ))}
                    </select>
                    <SelectedList>
                        {selectedTech.map((value, index) => (
                            <SelectedItem key={index}>
                                {techOption[value]}
                                <button onClick={() => removeSelectedTech(value)}>X</button>
                            </SelectedItem>
                        ))}
                    </SelectedList>
                    <textarea className={My.board} value={career} onChange={handleChangeString}></textarea>
                </Space>
                <Space_2>
                    <Button label="중복 검사" onClick={onNicknameCheckButtonClickHandler} backgroundColor="#6868AC"/>
                </Space_2>
            </Container>
            <ButtonGroup>
                <Button label="취소" onClick={CancelButton} backgroundColor="#727272"/>
                <Button label="저장" onClick={userUpdateButtonClickHandler} backgroundColor="#6868AC"/>
            </ButtonGroup>
        </div>
    );
}
