import React, { useState } from "react";
import styled from "@emotion/styled";
import { Button } from "../Button";
import { Modal } from "../Modal";
import { MyBoardList } from 'types/interface';
import { useNavigate, useParams } from 'react-router-dom';

const Container = styled.div`
    width: auto;
    height: 92px;
    background: #FFFFFF;
    border: 0.5px solid rgba(0, 0, 0, 0.2);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    margin-top: 30px ;
    margin-right: 1.5%;
    margin-left: 1.5%;
    padding-left: 5%;

    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: bolder;
`;

const Title = styled.div`
    font-size: 20px;
    display: flex;
    flex-wrap: wrap;
    width: auto;
    cursor: pointer;
`;

const Numb = styled.div`
    margin-right: 30px;
    margin-left: -30px;
`;

const Line = styled.div`
    margin-right: 30px;
`;

interface Props {
    label: string;
    onClick: () => void;
    myBoardList: MyBoardList;
}

const MyPost: React.FC<Props> = ({ myBoardList, label, onClick }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const { title, postId } = myBoardList; // 게시물의 ID를 받아옵니다.
    const navigate = useNavigate();

    const onClickBtn = () => {
        setModalOpen(true);
    };

    return (
        <Container>
            <div onClick={onClick}>
                <Title>
                    {title} ➡️
                </Title>
            </div>
            <Button label="신청 현황" onClick={onClickBtn} backgroundColor="#6868AC"/>
            {modalOpen && (
                <Modal
                    open={modalOpen}
                    onClose={() => {
                        setModalOpen(false);
                    }}
                    postId={postId} // 게시물의 ID를 모달 컴포넌트로 전달합니다.
                />
            )}
        </Container>
    );
};

export default MyPost;
