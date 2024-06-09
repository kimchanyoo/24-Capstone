import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import My from "../../stylesheet/My.module.css";
import { GetApplyBoardResponseDto } from "apis/response/board";
import { ApplicationUser } from "types/interface";
import { ResponseDto } from "apis/response";
import { useNavigate } from "react-router-dom";
import { getApplyBoardRequest } from "apis";
import { useCookies } from "react-cookie";
import { UserInfoListInterface } from "types/interface";
import { UserClick } from "../UserClick";

const Overlay = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.2);
    z-index: 9999;
`;
const ModalWrap = styled.div`
  width: auto;
  height: auto;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 400px;
  height: 400px;
  border: 1px solid #D9D9D9;
  margin-left: 10%;
  margin-right: 10%;
  margin-bottom: 5%;
  font-weight: bold;
`;
const NickName = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  pointer-events: auto;
  > img, > label {
    pointer-events: none;
  }
`;

const List = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: min-content;
  padding: 5%;
`;

interface ModalProps {
    open: boolean;
    onClose: () => void;
    postId: number;
}

export const Modal: React.FC<ModalProps> = ({ open, onClose, postId }) => {
    const [applicationUser, setApplicationUser] = useState<ApplicationUser | null>(null);
    const navigate = useNavigate();
    // state: modal 상태
    const [modalOpen, setModalOpen] = useState(false);
    const [clickedUser, setClickedUser] = useState<UserInfoListInterface | null>(null);

    const getApplyBoardResponse = (responseBody: GetApplyBoardResponseDto | ResponseDto | null) => {
        if (!responseBody) return;
        const { code, applicantList } = responseBody as GetApplyBoardResponseDto;
        if (code === 'DBE') {
            alert('데이터베이스 오류입니다.');
        } else if (code !== 'SU') {
            navigate('/');
        } else {
            setApplicationUser(applicantList.length > 0 ? applicantList[0] : null);
        }
    };

    // 닉네임 클릭 이벤트 처리
    const onClickBtn = () => {
        if (applicationUser) {
            setClickedUser({ nickName: applicationUser.nickName } as UserInfoListInterface);
            setModalOpen(true);
        }
    };

    const handleClose = () => {
        onClose?.();
    };

    const copyText = () => {
        const buttonText = applicationUser?.email;
        if (!buttonText) return;

        // 텍스트를 복사하기 위해 input 요소를 동적으로 생성합니다.
        const input = document.createElement('input');
        input.style.position = 'fixed';
        input.style.opacity = '0';
        input.value = buttonText;
        document.body.appendChild(input);

        // input 요소를 선택하고 복사를 실행합니다.
        input.select();
        document.execCommand('copy');

        // 사용이 완료된 input 요소를 제거합니다.
        document.body.removeChild(input);

        alert('텍스트가 복사되었습니다:');
    };


    useEffect(() => {
        if (!postId) {
            navigate('/MyField');
            return;
        }
        getApplyBoardRequest(postId)
            .then(response => {
                getApplyBoardResponse(response);
            })
            .catch(error => {
                console.error("API request failed:", error); // 오류 로그 추가
            });
    }, [postId, navigate, getApplyBoardResponse]); // navigate와 getApplyBoardResponse를 의존성 배열에 추가합니다.

    return (
        <Overlay>
            <ModalWrap>
                <h1>신청 현황</h1>
                <Container>
                    {applicationUser ? (
                        <List>
                            <NickName onClick={onClickBtn}>
                                <label>{applicationUser?.nickName}</label>
                            </NickName>
                            {modalOpen && clickedUser && (
                                <UserClick
                                    open={modalOpen}
                                    onClose={() => {
                                        setModalOpen(false);
                                        console.log(modalOpen);
                                    }}
                                    board={null}
                                    applicationUser={applicationUser}
                                    user={clickedUser} // 전달하는 유저 정보를 UserClick 컴포넌트로 넘김
                                />
                            )}
                            <button className={My.CallBtn} onClick={copyText} id="button">
                                {applicationUser.email}
                            </button>
                        </List>
                    ) : (
                        <p>지원자가 없습니다.</p>
                    )}
                </Container>
                <button className={My.Btn} onClick={handleClose}>닫기</button>
            </ModalWrap>
        </Overlay>
    );
};
