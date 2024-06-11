import styled from "@emotion/styled";
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Button} from "../Button";
import {EditBtn} from "../EditBtn";
import Reg from "../../stylesheet/TeamRegister.module.css"
import {GoBackBtn} from "../GoBackBtn";
import Profil from "../../img/profil.png"
import Pst from "../../stylesheet/Post.module.css";
import { useLoginUserStore } from "stores";
import {useNavigate, useParams } from "react-router-dom";
import { PostListItem, UserInfoListInterface } from "types/interface";
import {postApplyBoardRequest, deleteBoardRequest, getBoardRequest } from "apis";
import {DeleteBoardResponseDto, GetBoardResponseDto, PostApplyBoardResponseDto } from "apis/response/board";
import { ResponseDto } from "apis/response";
import { useCookies } from "react-cookie";
import { PostApplyBoardRequestDto } from "apis/request/board";
import { UserClick } from "../UserClick";

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
const Title = styled.div`
  display: flex;
  font-family: 'Inter';
  font-weight: 600;
  font-size: 32px;
  margin-left: 25px;
  margin-right: 25px;
  margin-top: 30px;
  justify-content: space-between;
`;
const NickName = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  pointer-events: auto; // Ensure that the NickName component itself is clickable
  > img, > label {
    pointer-events: none; // Make sure child elements do not block pointer events
  }
`;
const InformationGroup=styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 300px));
  gap: 40px;
  column-gap: 10%;
  margin-left: 25px;
  margin-top: 30px;
`;
const BtnGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 10%;
  margin-left: 10%;
`;
export const PostIn  = () => {
    // state: modal 상태
    const [modalOpen, setModalOpen] = useState(false);
    // state: 게시물 번호 상태
    const { postId } = useParams();
    // state: 로그인 유저 상태
    const { loginUser } = useLoginUserStore();
    // state: 쿠키 상태
    const [cookies, setCookie] = useCookies();
    // state: 작성자 여부 상태
    const [isWriter, setWriter] = useState<boolean>(false);
    // state: 게시물 상태
    const [board, setBoard] = useState<PostListItem | null>(null);
    // state: 클릭된 유저 정보 상태
    const [clickedUser, setClickedUser] = useState<UserInfoListInterface | null>(null);
    // function: 네비게이트 함수
    const navigate = useNavigate();
    // function: get board response 처리 함수
    const getBoardResponse = (responseBody: GetBoardResponseDto | ResponseDto | null) => {
        if (!responseBody) {
            console.log('응답 없음')
            return;}
        const { code } = responseBody;
        if (code === 'NB') alert('이미 삭제된 팀입니다.')
        if (code === 'DBE') alert('데이터베이스 오류입니다.')
        if (code === 'VF') alert('오류입니다.')
        if (code !== 'SU') {
            navigate('/')
            return;
        }
        const board: PostListItem = {...responseBody as GetBoardResponseDto};
        setBoard(board);

        if (!loginUser) {
            setWriter(false);
            return;
        }
        const isWriter = loginUser.userId === board.userId;
        setWriter(isWriter);
    };
    // function: delete board response 처리 함수
    const deleteBoardResponse = (responseBody: DeleteBoardResponseDto | ResponseDto | null) => {
        if (!responseBody) return;
        const {code} = responseBody;
        if (code === 'NB') alert('이미 삭제된 글입니다.')
        if (code === 'DBE') alert('데이터베이스 오류입니다.')
        if (code === 'VF') alert('잘못된 접근입니다.')
        if (code === 'NP') alert('권한이 없습니다.')
        if (code === 'AF') alert('인증에 실패했습니다.')
        if (code === 'NU') alert('존재하지 않는 유저입니다.')
        if (code === 'SU') return;
        navigate('/')
    };
    // function: post apply board list response 처리함수
    const postApplyBoardResponse = (responseBody: PostApplyBoardResponseDto | ResponseDto | null) => {
        if (!responseBody) return;
        const { code } = responseBody;
        if (code === 'DBE') alert('데이터베이스 오류입니다.');
        if (code === 'DA') alert('이미 지원한 지원자입니다.');
        if (code !== 'SU') return;

        if (!loginUser) return;
    };

    // 닉네임 클릭 이벤트 처리
    const onClickBtn = () => {
        if (board) {
            setClickedUser({ nickName: board.nickName } as UserInfoListInterface); // You may need to adjust this line depending on the structure of your UserInfoListInterface
            setModalOpen(true);
        }
    };

    // 지원 버튼 클릭 이벤트 처리
    const handleApplyClick = () => {
        const accessToken = cookies.accessToken;
        if (!accessToken) {
            alert("로그인해야 이용 가능합니다.");
            return;
        }
        const requestBody: PostApplyBoardRequestDto = {
            postId
        }

        postApplyBoardRequest(requestBody, accessToken)
            .then(response => {
                if (response && response.code === 'SU') {
                    alert("지원되었습니다.");
                }
                postApplyBoardResponse(response);
            })
            .catch(error => {
                console.error("Error:", error); // 에러 로그 추가
            })
    };

    // 삭제 버튼 클릭 이벤트 처리
    const removeButtonClickHandler = () => {
        if (!postId || !board || !loginUser) return;
        if (loginUser.userId !== board.userId) return;
        deleteBoardRequest(postId, cookies.accessToken).then(deleteBoardResponse)
        if(window.confirm("해당 게시물을 삭제하시겠습니까?")) {
            alert("게시물이 삭제되었습니다.")
            return window.location.href = "/"
        }
    };

    // 마감 버튼 클릭 이벤트 처리
    const deadLineButtonClickHandler = async () => {
        if (!board || !loginUser) return;
        if (loginUser.userId !== board.userId) return;

        if (window.confirm("해당 게시물을 마감하시겠습니까?")) {
            try {
                const response = await axios.patch(`http://www.teami.kr:42957/api/v1/board/expire/${postId}`,
                    { termination: true, expired: true },
                    { headers: { Authorization: `Bearer ${cookies.accessToken}` } }

                );

                if (response.status === 200) {
                    alert("게시물이 마감되었습니다.");
                    window.location.reload();
                } else {
                    alert("서버 오류가 발생했습니다. 다시 시도해주세요.");
                }
            } catch (error) {
                alert("네트워크 오류가 발생했습니다. 다시 시도해주세요.");
            }
        }
    };

    // 게시물 번호가 바뀔때 마다 게시물 불러오기
    useEffect(() => {
        if (!postId) {
            navigate('/');
            return;
        }
        getBoardRequest(postId).then(getBoardResponse);
    }, [postId]);
    useEffect(() => {
        if (!board || !loginUser) return;
        const isWriter = loginUser.userId === board.userId;
        setWriter(isWriter);
    }, [board, loginUser]);

    return (
        <div>
            <BtnGroup>
                <GoBackBtn/>
                <div style={{display : "flex"}}>
                    {isWriter && (
                        <>
                            <Button label="글 삭제" onClick={removeButtonClickHandler} backgroundColor="#CC0000"/>
                            <Button label="모집 마감" onClick={deadLineButtonClickHandler} backgroundColor="#4caf50"/>
                        </>
                    )}
                    <EditBtn
                        label="지원"
                        onClick={handleApplyClick}
                        backgroundColor="#6868AC"
                        isEditable={isWriter}/>
                </div>
            </BtnGroup>
            <Container>
                <Title>
                    <label>{board?.title}</label>
                    <NickName onClick={onClickBtn}>
                        <img src={Profil} className={Pst.pfImg} />
                        <label className={Pst.pfName}>{board?.nickName}</label>
                    </NickName>
                    {modalOpen && clickedUser && (
                        <UserClick
                            open={modalOpen}
                            onClose={() => {
                                setModalOpen(false);
                                console.log(modalOpen);
                            }}
                            board={board}
                            applicationUser={null}
                            user={clickedUser} // 전달하는 유저 정보를 UserClick 컴포넌트로 넘김
                        />
                    )}
                </Title>
                <hr className={Reg.line}/>
                <InformationGroup>
                    <div>
                        모집 구분
                        <br/>
                        <div className={Pst.content}>
                            <div className={Pst.item}>
                                {recruitmentClassificationOptin[board?.recruitmentClassification || 0]}
                            </div>
                        </div>
                    </div>
                    <div>
                        모집 인원
                        <br/>
                        <div className={Pst.content}>
                            <div className={Pst.item}>
                                {recruitmentPersonOption[board?.recruitmentPerson || 0]}
                            </div>
                        </div>
                    </div>
                    <div>
                        진행 방식
                        <br/>
                        <div className={Pst.content}>
                            <div className={Pst.item}>
                                {processingOption[board?.processing || 0]}
                            </div>
                        </div>
                    </div>
                    <div>
                        진행 기간
                        <br/>
                        <div className={Pst.content}>
                            <div className={Pst.item}>
                                {processingDurationOption[board?.processingDuration || 0]}
                            </div>
                        </div>
                    </div>
                    <div>
                        기술 스택
                        <br/>
                        <div className={Pst.content}>
                            {board?.tech.map((key, index) => (
                                <div className={Pst.item} key={index}>
                                    {techOptions[key]}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        모집 마감일
                        <br/>
                        <div className={Pst.content}>
                            <div className={Pst.item}>
                                {board?.deadLine}
                            </div>
                        </div>
                    </div>
                    <div>
                        모집 포지션
                        <br/>
                        <div className={Pst.content}>
                            {board?.field.map((key, index) => (
                                <div className={Pst.item} key={index}>
                                    {fieldOptions[key]}
                                </div>
                            ))}
                        </div>
                    </div>
                </InformationGroup>
            </Container>
            <br/>
            <Container>
                <h1 className={Pst.title}>프로젝트 소개</h1>
                <hr className={Reg.line}/>
                <div className={Pst.body}>
                    <label>{board?.body}</label>
                </div>
            </Container>
        </div>
    );
}

// value string 출력 구간
const recruitmentClassificationOptin: {[key: number]: string} = {
    0: "프로젝트",
    1: "스터디"
}
const recruitmentPersonOption: {[key: number]: string} = {
    0: "인원 미정",
    1: "1명",
    2: "2명",
    3: "3명",
    4: "4명",
    5: "5명 이상"
}
const processingOption: {[key: number]: string} = {
    0: "온라인",
    1: "오프라인"
};
const processingDurationOption: {[key: number]: string} = {
    0: "기간 미정",
    1: "1개월",
    2: "2개월",
    3: "3개월",
    4: "4개월",
    5: "5개월",
    6: "6개월 이상"
};
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