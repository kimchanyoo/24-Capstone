import './App.css';
import { BrowserRouter, Router, Routes, Route } from 'react-router-dom';
import { LoginPage } from './component/User/LoginPage';
import React from "react";
import { useEffect } from 'react';
import { SignUpPage } from './component/User/SignUp';
import { SignUpPage2 } from './component/User/SignUp2';
import { SignUpPage3 } from './component/User/SignUp3';
import { SignUpPage4 } from './component/User/SignUp4';
import { SignUpPage5 } from './component/User/SignUp5';
import {FindIDPage} from "./component/User/FindID";
import {FindPWPage} from "./component/User/FindPW";
import {MainPage} from "./component/Team/MainPage";
import {TeamRegister} from "./component/Team/TeamRegister";
import {ProjectField} from "./component/Team/ProjectField";
import {StudyField} from "./component/Team/StudyField";
import {MyField} from "./component/Team/MyField";
import {PostIn} from "./component/Team/PostIn";
import {MyPage} from "./component/Team/MyPage";
import {MyPageUpdate} from "./component/Team/MyPageUpdate";
import {TeamUpdate} from "./component/Team/TeamUpdate";
import {useCookies} from "react-cookie";
import { getSignInUserRequest } from 'apis';
import { GetSignInUserResponseDto } from 'apis/response/user';
import { ResponseDto } from 'apis/response';
import { User } from 'types/interface';
import Container from 'layouts/Container';
import { useLoginUserStore } from "stores";
import { ResetPWPage } from "./component/User/ResetPW";
import { ResetPWPage2 } from "./component/User/ResetPW2";
import { ShowFindIDPage } from "./component/User/ShowFindID";

function App() {

    // state: 로그인 유저 전역 상태
    const { setLoginUser, resetLoginUser } = useLoginUserStore();
    // state: cookie 상태
    const  [cookies, setCookie] = useCookies();
    // function: get sign in user response 처리 함수
    const getSignInUserReseponse = (responseBody: GetSignInUserResponseDto | ResponseDto | null) => {
        if (!responseBody) return;
        const { code } = responseBody;
        if (code === "AF" || code === "NU" || code === "DBE") {
            resetLoginUser();
            return;
        }
        const loginUser: User = { ...responseBody as GetSignInUserResponseDto }
        setLoginUser(loginUser);
    }
    // effect: accessToken cookie 값이 변경될 때마다 실행할 함수
    useEffect(() => {
        if (!cookies.accessToken) {
            resetLoginUser();
            return;
        }
        getSignInUserRequest(cookies.accessToken).then(getSignInUserReseponse)
    }, [cookies.accessToken]);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/SignUp" element={<SignUpPage/>}/>
                <Route path="/SignUp2" element={<SignUpPage2/>}/>
                <Route path="/SignUp3" element={<SignUpPage3/>}/>
                <Route path="/SignUp4" element={<SignUpPage4/>}/>
                <Route path="/SignUp5" element={<SignUpPage5/>}/>
                <Route path="/FindID" element={<FindIDPage/>}/>
                <Route path="/FindPW" element={<FindPWPage/>}/>
                <Route path="/ResetPW" element={<ResetPWPage/>}/>
                <Route path="/ResetPW2" element={<ResetPWPage2/>}/>
                <Route path="/ShowFindID" element={<ShowFindIDPage/>}/>
            </Routes>
            <div className="Container">
                <Routes>
                    <Route element={<Container/>}>
                        <Route path="/" element={<MainPage/>}/>
                        <Route path="/MainPage" element={<MainPage/>}/>
                        <Route path="/TeamRegister" element={<TeamRegister/>}/>
                        <Route path="/ProjectField" element={<ProjectField/>}/>
                        <Route path="/StudyField" element={<StudyField/>}/>
                        <Route path="/TeamUpdate/:postId" element={<TeamUpdate/>}/>
                        <Route path="/MyField" element={<MyField/>}/>
                        <Route path="/PostIn/:postId" element={<PostIn/>}/>
                        <Route path="/MyPage" element={<MyPage/>}/>
                        <Route path="/MyPageUpdate" element={<MyPageUpdate/>}/>
                    </Route>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
