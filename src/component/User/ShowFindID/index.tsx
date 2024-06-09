import styled from "@emotion/styled";
import React, {useState} from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { Header } from "../Header";
import { Title } from "../Title";
import { Button } from '../Button';
import My from "../../stylesheet/My.module.css";

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

const Group = styled.div`
    margin-top: 80px;
`;

const Group2 = styled.div`
    margin-bottom: 100px;
`;

export const ShowFindIDPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [userId, setUserId] = useState(location.state?.userId || '');

    const onNextButtonClickHandler = () => {
        navigate('/login')
    }

    return (
        <>
            <Header />
            <Container>
                <Content>
                    <div>
                        <Title label="아이디 찾기" color="#6868AC"/>
                    </div>
                    <div className={My.idBody}>
                        <Group2>
                            {userId}
                        </Group2>
                    </div>
                    <div>
                        <Group>
                            <Button label="로그인" color="#7C7FD1" onClick={onNextButtonClickHandler}/>
                        </Group>
                    </div>
                </Content>
            </Container>
        </>
    )
}