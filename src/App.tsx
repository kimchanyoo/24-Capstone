import './App.css';
import styled from '@emotion/styled';
import { BrowserRouter, Router, Routes, Route } from 'react-router-dom';
import { LoginPage } from './component/User/LoginPage';
import React from 'react';
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

function App() {
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
        </Routes>
        <div className="Container">
          <Routes>
            <Route path="/" element={<MainPage/>}/>
            <Route path="/MainPage" element={<MainPage/>}/>
            <Route path="/TeamRegister" element={<TeamRegister/>}/>
            <Route path="/ProjectField" element={<ProjectField/>}/>
            <Route path="/StudyField" element={<StudyField/>}/>
            <Route path="/MyField" element={<MyField/>}/>
            <Route path="/PostIn" element={<PostIn/>}/>
            <Route path="/MyPage" element={<MyPage/>}/>
          </Routes>
        </div>
      </BrowserRouter>
  );
}

export default App;
