import React, {useRef, useState} from "react";
import styled from "@emotion/styled";
import {Button} from "../Button";
import {Modal} from "../Modal";

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
interface Props {
    readonly label: string;
    readonly onClick: () => void;
}

export const MyPost = ({ label, onClick }: Props) => {

    const [modalOpen, setModalOpen] = useState(false);
    const onClickBtn = () => {
      setModalOpen(true);
    };

    return (
        <Container onClick={onClick}>
            <label>{label}</label>
            <Button label="신청 현황"  onClick={onClickBtn} backgroundColor="#6868AC"/>
            {modalOpen && (<Modal
                open={modalOpen}
                onClose={()=> {
                    setModalOpen(false);
                }}/>)}
        </Container>

    )
}