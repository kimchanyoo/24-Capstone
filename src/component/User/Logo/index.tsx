import React from 'react';
import styled from '@emotion/styled';
import {useNavigate} from "react-router-dom";

const Container = styled.div`
    display: flex;
    cursor: pointer;
`;

const ImageLogo = styled.div`
  margin-right: 80vw;
`;

export const LogoImage = () => {
    const navigate = useNavigate(); // useHistory 훅을 사용하여 history 인스턴스를 생성합니다.

    const handleMain = () => {
        navigate('/'); // 메인페이지로 페이지를 리다이렉트합니다.
    };
    return (
        <Container>
            <ImageLogo>
                <img src="/Logo.png" width="197px" height="67px" onClick={handleMain}></img>
            </ImageLogo>
        </Container>
    );
};
