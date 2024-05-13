import React from "react";
import styled from "@emotion/styled";
import My from "../../stylesheet/My.module.css";
import {Button} from "../Button";
import CallImg from "../../img/call.png";

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
const Container=styled.div`
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
const List=styled.div`
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
}

export const Modal: React.FC<ModalProps> = ({open, onClose}) => {

    const handleClose = () => {
        onClose?.();
    };

    return (
        <Overlay>
            <ModalWrap>
                <h1>신청 현황</h1>
                <Container>
                    <List>
                        <span>닉네임</span>
                        <button className={My.CallBtn} onClick={() => onclick}>
                            <img src={CallImg} className={My.Img}/>
                        </button>
                    </List>
                </Container>
                <button className={My.Btn} onClick={handleClose}>닫기</button>
            </ModalWrap>
        </Overlay>
    );
}
