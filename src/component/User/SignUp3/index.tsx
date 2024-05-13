import styled from '@emotion/styled';
import React, { useCallback, useState } from 'react';
import { Title } from 'component/User/Title';
import { Button } from '../Button';
import { LogoImage } from '../Logo';
import {useNavigate} from "react-router-dom";

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
`;

const InterGroup = styled.div`
    margin-bottom: 70px;
`;

const Group2 = styled.div`
    margin-right: 270px;
`;

const ButtonGroup = styled.div`
    margin-top: 80px;
`;

export const SignUpPage3 = () => {
    const [checkedInputs, setCheckedInputs] = useState<string[]>([]);
    const [nextSignupState, setNextSignupState] = useState(false);
    const navigate = useNavigate();

    const allCheckClick = (checked: boolean) => {
        if (checked) {
            setCheckedInputs(['ageCheck', 'usingListCheck', 'personalInfoCheck', 'marketingInfoCheck']);
        } else {
            setCheckedInputs([]);
        }
    };

    const onCheckHandler = useCallback((checked: boolean, id: string) => {
        if (checked) {
            setCheckedInputs((prev) => [...prev, id]); // 현재 상태를 기반으로 새 배열 생성
            console.log('체크 반영 완료');
        } else {
            setCheckedInputs((prev) => prev.filter((el) => el !== id)); // id가 일치하지 않는 요소만 남김
            console.log('체크 해제 반영 완료');
        }
    }, []); // 의존성 배열

    const onClickAgree = () => {
        if (
            checkedInputs.includes('ageCheck') &&
            checkedInputs.includes('usingListCheck') &&
            checkedInputs.includes('personalInfoCheck')
        ) {
            setNextSignupState(true);
            navigate('/SignUp4'); // 조건에 따른 페이지 리다이렉션
        } else {
            alert('[필수]약관을 모두 동의 해주셔야 가입절차가 진행됩니다.');
        }
    };

    return (
        <Container>
            <header>
                <LogoImage />
            </header>
            <Content>
                <Group2>
                    <Title label="약관 동의" color="#000000"/>
                </Group2>
                <InterGroup />
                <div>
                    <label>
                        <input
                            type="checkbox"
                            id="allCheck"
                            onChange={(e) => allCheckClick(e.currentTarget.checked)}
                            checked={checkedInputs.length === 4}/>
                        <p>모두 동의합니다.</p>
                    </label>
                    <div>
                        <div>
                            <label>
                                <input
                                    type="checkbox"
                                    id="ageCheck"
                                    onChange={(e) => {
                                        onCheckHandler(e.currentTarget.checked, 'ageCheck');
                                    }}
                                    checked={checkedInputs.includes('ageCheck') ? true : false}
                                />
                                <p>[필수] 만 14세 이상입니다.</p>
                            </label>
                        </div>
                        <div>
                            <label>
                                <input
                                    type="checkbox"
                                    id="usingListCheck"
                                    onChange={(e) => {
                                        onCheckHandler(e.currentTarget.checked, 'usingListCheck');
                                    }}
                                    checked={checkedInputs.includes('usingListCheck') ? true : false}
                                />
                                <p>[필수] 티미 서비스 이용약관 동의</p>
                            </label>
                        </div>
                        <div>
                            <label>
                                <input
                                    type="checkbox"
                                    id="personalInfoCheck"
                                    onChange={(e) => {
                                        onCheckHandler(e.currentTarget.checked, 'personalInfoCheck');
                                    }}
                                    checked={checkedInputs.includes('personalInfoCheck') ? true : false}
                                />
                                <p>[필수] 개인정보 수집 및 이용 동의</p>
                            </label>
                        </div>
                    </div>
                </div>
                <ButtonGroup>
                    <Button label="다음" color="#7C7FD1" onClick={onClickAgree}/>
                </ButtonGroup>
            </Content>
        </Container>
    );
};
