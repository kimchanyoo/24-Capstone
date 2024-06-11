import styled from "@emotion/styled";
import React, {ChangeEvent, useEffect, useRef, useState} from 'react';
import {Button} from "../Button";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import Reg from "../../stylesheet/TeamRegister.module.css"
import drop from "../../stylesheet/DropDown.module.css";
import {DatePick} from "../DatePick";
import { useBoardStore, useLoginUserStore } from "stores";
import { useCookies } from "react-cookie";
import {PatchBoardRequestDto, PostBoardRequestDto } from "apis/request/board";
import {getBoardRequest, patchBoardRequest, postBoardRequest } from "apis";
import {GetBoardResponseDto, PatchBoardResponseDto, PostBoardResponseDto } from "apis/response/board";
import { ResponseDto } from "apis/response";


const Container=styled.div`
  width: auto;
  height: auto;
  overflow: auto;
  border: 1px solid #D9D9D9;
  border-radius: 30px;
  margin-right: 10%;
  margin-left: 10%;
  padding-bottom: 30px;
  font-weight: bold;
`;
const ButtonGroup=styled.div`
  display: flex;
  justify-content: right;
  margin-right: 9%;
  margin-top: 20px;
`;
const DropGroup=styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 300px));
  gap: 40px;
  column-gap: 10%;
  margin-left: 25px;
  margin-top: 30px;
`;
const TextGroup=styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  margin-left: 25px;
  font-weight: bold;
  font-size: 16px;
  margin-right: 25px;
`;
const SelectedList = styled.div`
  display: flex;
  flex-wrap: wrap;
  background: white;
  width: auto;
  gap: 3px;
  color: #d9d9d9;
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

export const TeamUpdate : React.FC = () => {
    const [cookies, setCookie] = useCookies();
    const [selectedDate, setSelectedDate] = useState<string>("");
    const [isDropDownVisible, setIsDropDownVisible] = useState(false);
    const [selectedField, setSelectedField] = useState<number[]>([]);
    const [selectedTech, setSelectedTech] = useState<number[]>([]);
    const {pathname} = useLocation();
    const navigate = useNavigate();

    // funcion: get board response 처리 함수
    const getBoardResponse = (responseBody: GetBoardResponseDto | ResponseDto | null) => {
        if (!responseBody) return;
        const { code } =responseBody;
        if (code === 'NB') alert('존재하지 않는 게시물입니다')
        if (code === 'DBE') alert('데이터베이스 오류입니다.')
        if (code !== 'SU') {
            navigate('/');
            return;
        }
        const {title,
            body,
            recruitmentClassification,
            recruitmentPerson,
            processing,
            processingDuration,
            tech,
            deadLine,
            field} = responseBody as GetBoardResponseDto;
        setTitle(title);
        setBody(body);
        setRecruitmentPerson(recruitmentClassification);
        setRecruitmentPerson(recruitmentPerson);
        setProcessing(processing);
        setProcessingDuration(processingDuration);
        setSelectedTech(tech);
        setSelectedDate(deadLine);
        setSelectedField(field);

        if (!loginUser){
            navigate('/')
            return;
        }
    }
    const CancelButton = () => {
        navigate('/');
    };
    // 콜백 함수: 선택한 날짜를 받아서 부모 컴포넌트 상태를 업데이트
    const handleDateChange = (date: Date) => {
        const formattedDate = date.toISOString().split("T")[0];
        setSelectedDate(formattedDate);
        // 여기에서 선택한 날짜를 사용하여 필요한 작업을 수행할 수 있습니다.
    };

    // event handler: 변경 이벤트 처리
    const onTitleChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };
    const onBodyChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setBody(event.target.value);
    };
    const onRecruitmentClassificationChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setRecruitmentClassification(Number(event.target.value));
    };
    const onRecruitmentPersonChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setRecruitmentPerson(Number(event.target.value));
    };
    const onProcessingChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setProcessing(Number(event.target.value));
    };
    const onProcessingDurationChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setProcessingDuration(Number(event.target.value));
    };
    const onTechChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const selectedOption = Number(event.target.value);
        // 이미 선택된 값인지 확인하여 중복 선택을 방지합니다.
        if (!selectedTech.includes(selectedOption)) {
            setSelectedTech(prevSelectedValues => [...prevSelectedValues, selectedOption]);
        }
    };
    const onFieldChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const selectedOption = Number(event.target.value);
        if (!selectedField.includes(selectedOption)) {
            setSelectedField(prevSelectedValues => [...prevSelectedValues, selectedOption]);
        }
    };


    // state: 로그인 유저 상태
    const { loginUser } = useLoginUserStore();
    // state: 게시물 번호 상태
    const {postId} = useParams();
    // state: 게시물 상태
    const {
        title, setTitle,
        body, setBody,
        recruitmentClassification, setRecruitmentClassification,
        recruitmentPerson, setRecruitmentPerson,
        processing, setProcessing,
        processingDuration, setProcessingDuration,
        tech, setTech,
        deadLine, setDeadLine,
        field, setField,
        resetBoard
    } = useBoardStore();

    // post board response 처리 함수
    const postBoardResponse = (responseBody: PostBoardResponseDto | ResponseDto | null) => {
        if (!responseBody) return;
        const { code } = responseBody;
        if (code === 'DBE') alert('데이터베이스 오류입니다.');
        if (code === 'VF') alert('입력사항을 모두 입력해주세요.');
        if (code !== 'SU') return;

        resetBoard();
        if (!loginUser) return;
        const { userId } = loginUser;
        navigate('/', {state: {userId}});
    }
    // patch board response 처리 함수
    const patchBoardResponse = (responseBody: PatchBoardResponseDto | ResponseDto | null) => {
        if (!responseBody) return;
        const { code } = responseBody;
        if (code === 'NB' || code === 'NU' || code === 'NP') navigate('/TeamUpdate/:postId');
        if (code === 'DBE') alert('데이터베이스 오류입니다.');
        if (code === 'VF') alert('입력사항을 모두 입력해주세요.');
        if (code !== 'SU') return;

        if (!postId) return;
        navigate(`/PostIn/${postId}`);
        alert('수정 완료되었습니다.')
    }

    // 등록 버튼 이벤트 처리 함수
    const UploadClickHandler = () => {
        const accessToken = cookies.accessToken;
        if (!accessToken) {
            console.error("No accessToken found");
            return;
        }
        if (!loginUser || !loginUser.userId) {
            console.error("No login user found");
            return;
        }
        const isWriterPage = pathname === '/TeamRegister';
        if (isWriterPage) {
            const requestBody: PostBoardRequestDto = {
                title,
                body,
                recruitmentClassification,
                recruitmentPerson,
                processing,
                processingDuration,
                tech: selectedTech,
                deadLine: selectedDate,
                field: selectedField,
            }
            postBoardRequest(requestBody, accessToken).then(postBoardResponse);
        } else {
            if (!postId) return;
            const requestBody: PatchBoardRequestDto = {
                title,
                body,
                recruitmentClassification,
                recruitmentPerson,
                processing,
                processingDuration,
                tech: selectedTech,
                deadLine: selectedDate,
                field: selectedField,
            }
            patchBoardRequest(postId, requestBody, accessToken).then(patchBoardResponse);
        }
    }

    // 리스트 값 지우는 버튼
    const removeSelectedValue = (valueToRemove: number) => {
        const updatedSelectedValues = selectedField.filter(value => value !== valueToRemove);
        setSelectedField(updatedSelectedValues);
    };
    const removeSelectedTech = (techToRemove: number) => {
        setSelectedTech(prevSelectedTech => prevSelectedTech.filter(tech => tech !== techToRemove));
    };

    // effect: 마운트 시 실행할 함수
    useEffect(() => {
        const accessToken = cookies.accessToken;
        if (!accessToken) {
            navigate('/');
            return;
        }
        if (!postId) return;
        getBoardRequest(postId).then(getBoardResponse);
    }, [postId]);

    return (
        <div>
            <Container>
                <h1 className={Reg.title}>팀 수정하기</h1>
                <hr className={Reg.line}/>
                <DropGroup>
                    <div>
                        모집 구분
                        <br/>
                        <select className={drop.DropBtn} value={recruitmentClassification}
                                onChange={onRecruitmentClassificationChange}>
                            <option disabled selected>프로젝트/스터디</option>
                            <option value={0}>프로젝트</option>
                            <option value={1}>스터디</option>
                        </select>
                    </div>

                    <div>
                        모집 인원
                        <br/>
                        <select className={drop.DropBtn} value={recruitmentPerson} onChange={onRecruitmentPersonChange}>
                            <option disabled selected>인원 미정~5명 이상</option>
                            <option value={0}>인원 미정</option>
                            <option value={1}>1명</option>
                            <option value={2}>2명</option>
                            <option value={3}>3명</option>
                            <option value={4}>4명</option>
                            <option value={5}>5명 이상</option>
                        </select>
                    </div>

                    <div>
                        진행 방식
                        <br/>
                        <select className={drop.DropBtn} value={processing} onChange={onProcessingChange}>
                            <option disabled selected>온라인/오프라인</option>
                            <option value={0}>온라인</option>
                            <option value={1}>오프라인</option>
                        </select>
                    </div>

                    <div>
                        진행 기간
                        <br/>
                        <select className={drop.DropBtn} value={processingDuration}
                                onChange={onProcessingDurationChange}>
                            <option disabled selected>기간 미정~6개월 이상</option>
                            <option value={0}>기간 미정</option>
                            <option value={1}>1개월</option>
                            <option value={2}>2개월</option>
                            <option value={3}>3개월</option>
                            <option value={4}>4개월</option>
                            <option value={5}>5개월</option>
                            <option value={6}>6개월 이상</option>
                        </select>
                    </div>

                    <div>
                        기술 스택
                        <br/>
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
                    </div>

                    <div>
                        모집 마감일
                        <br/>
                        <DatePick onDateChange={handleDateChange} value={deadLine}/>
                    </div>

                    <div>
                        모집 포지션
                        <br/>
                        <select className={drop.DropBtn} onChange={onFieldChange}>
                            <option disabled selected>프론트엔드, 백엔드, ...</option>
                            {Object.keys(fieldOptions).map((key) => (
                                <option key={key} value={key}>
                                    {fieldOptions[Number(key)]}
                                </option>
                            ))}
                        </select>
                        <SelectedList>
                            {selectedField.map((value, index) => (
                                <SelectedItem key={index}>
                                    {fieldOptions[value]}
                                    <button onClick={() => removeSelectedValue(value)}>X</button>
                                </SelectedItem>
                            ))}
                        </SelectedList>
                    </div>
                </DropGroup>
            </Container>
            <br/>
            <Container>
                <h1 className={Reg.title}>프로젝트 소개</h1>
                <hr className={Reg.line}/>
                <TextGroup>
                    소개 제목
                    <input className={Reg.boardTitle} type='text' placeholder="글 제목" value={title}
                           onChange={onTitleChangeHandler}/>
                    <textarea className={Reg.boardContents} placeholder="글 내용" value={body}
                              onChange={onBodyChangeHandler}/>
                </TextGroup>
            </Container>
            <ButtonGroup>
                <Button label="취소" onClick={CancelButton} backgroundColor="#727272"/>
                <Button label="저장" onClick={UploadClickHandler} backgroundColor="#6868AC"/>
            </ButtonGroup>
        </div>
    );
}

// number list option 정리
const techOptions: {[key: number]: string} = {
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
const fieldOptions: {[key: number]: string} = {
    0: "프론트엔드",
    1: "백엔드",
    2: "디자이너",
    3: "앱 개발자",
    4: "PM",
    5: "기획자",
    6: "게임 개발자"
};

