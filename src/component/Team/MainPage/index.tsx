import styled from "@emotion/styled";
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import main from "../../stylesheet/MainPage.module.css";
import img1 from "../../img/board.png";
import { BoardListItem, SchoolBoardListItem } from "types/interface";
import { useLoginUserStore } from "stores";
import { getAllBoardListRequest, getAllSchoolBoardListRequest, getProjcetBoardListRequest,getProjcetSchoolBoardListRequest,
    getStudyBoardListRequest, getStudySchoolBoardListRequest } from "apis";
import { GetAllBoardListResponseDto,
    GetAllSchoolBoardListResponseDto, GetProjectBoardListResponseDto,
    GetProjectSchoolBoardListResponseDto, GetStudyBoardListResponseDto, GetStudySchoolBoardListResponseDto } from "apis/response/board";
import { ResponseDto } from "apis/response";
import Post from "../Post";
import { useCookies } from "react-cookie";

const PostGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: left;
  flex-wrap: wrap;
  gap: 13px;
  border: 4px solid #B5B5B5;
  border-radius: 0 0 15px 15px;
  padding-left: 1.3%;
  padding-bottom: 2.5%;
`;

const TextGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 10%;
  margin-left: 10%;
`;

interface TabButtonProps {
    active: boolean;
}
const TabButton = styled.button<TabButtonProps>`
  border: none;
  padding: 20px 40px;
  cursor: pointer;
  border-radius: 15px 15px 0px 0px;
  font-size: 17px;
  font-weight: bolder;
  background-color: ${({ active }) => (active ? '#B5B5B5' : 'transparent')};
  color: ${({ active }) => (active ? 'black' : 'gray')};
`;

interface TabMenu {
    value: string;
    button: string;
}

export const MainPage: React.FC = () => {
    const [cookies, setCookie] = useCookies();
    const navigate = useNavigate();
    // state: 탭버튼 상태
    const [activeTab, setActiveTab] = useState<string>("all");
    // state: 로그인 유무 유저 상태
    const { loginUser } = useLoginUserStore();
    // state: 비로그인 화면 상태
    const [allBoardList, setAllBoardList] = useState<BoardListItem[]>([]);
    const [projectBoardList, setProjectBoardList] = useState<BoardListItem[]>([]);
    const [studyBoardList, setStudyBoardList] = useState<BoardListItem[]>([]);
    // state: 로그인 화면 상태
    const [allSchoolBoardList, setAllSchoolBoardList] = useState<SchoolBoardListItem[]>([]);
    const [projectSchoolBoardList, setProjectSchoolBoardList] = useState<SchoolBoardListItem[]>([]);
    const [studySchoolBoardList, setStudySchoolBoardList] = useState<SchoolBoardListItem[]>([]);
    // state: 로딩 상태
    const [loading, setLoading] = useState<boolean>(true);
    // state: 마감 여부 상태
    const [expiredPosts, setExpiredPosts] = useState<{ [key: number]: boolean }>({});

    const updateExpiredPosts = (boardList: BoardListItem[]) => {
        if (boardList && boardList.length > 0) {
            const updatedExpiredPosts: { [key: number]: boolean } = {};
            boardList.forEach(board => {
                updatedExpiredPosts[board.postId] = board.termination;
            });
            setExpiredPosts(updatedExpiredPosts);
        }
    };

    // event: 탭 버튼
    const handleExpiration = (postId: number) => {
        setExpiredPosts((prev) => ({ ...prev, [postId]: true }));
    };
    const handleTabClick = (value: string) => {
        setActiveTab(value);
    };
    const tabMenu: TabMenu[] = [
        { value: "all", button: "전체보기" },
        { value: "project", button: "프로젝트" },
        { value: "study", button: "스터디" }
    ];

    // 비로그인 시 response
    const getAllBoardListResponse = (responseBody: GetAllBoardListResponseDto | ResponseDto | null) => {
        if (!responseBody) return;
        const { code } = responseBody;
        if (code === 'DBE') alert('데이터베이스 오류입니다.');
        if (code !== 'SU') return;
        const { latestList } = responseBody as GetAllBoardListResponseDto;
        setAllBoardList(latestList);
        updateExpiredPosts(latestList);
    };
    const getProjectBoardListResponse = (responseBody: GetProjectBoardListResponseDto | ResponseDto | null) => {
        if (!responseBody) return;
        const { code } = responseBody;
        if (code === 'DBE') alert('데이터베이스 오류입니다.');
        if (code !== 'SU') return;
        const { latestList } = responseBody as GetProjectBoardListResponseDto;
        setProjectBoardList(latestList);
        updateExpiredPosts(latestList);
    };
    const getStudyBoardListResponse = (responseBody: GetStudyBoardListResponseDto | ResponseDto | null) => {
        if (!responseBody) return;
        const { code } = responseBody;
        if (code === 'DBE') alert('데이터베이스 오류입니다.');
        if (code !== 'SU') return;
        const { latestList } = responseBody as GetStudyBoardListResponseDto;
        setStudyBoardList(latestList);
        updateExpiredPosts(latestList);
    };
    const fetchAllBoardList = async () => {
        setLoading(true);
        await getAllBoardListRequest().then(getAllBoardListResponse);
        setLoading(false);
    };
    const fetchProjectBoardList = async () => {
        setLoading(true);
        await getProjcetBoardListRequest().then(getProjectBoardListResponse);
        setLoading(false);
    };
    const fetchStudyBoardList = async () => {
        setLoading(true);
        await getStudyBoardListRequest().then(getStudyBoardListResponse);
        setLoading(false);
    };

    // 로그인 시 response
    const getAllSchoolBoardListResponse = (responseBody: GetAllSchoolBoardListResponseDto | ResponseDto | null) => {
        console.log("API 응답 데이터:", responseBody); // API 응답 데이터를 확인
        if (!responseBody) return;
        const { code } = responseBody;
        if (code === 'DBE') alert('데이터베이스 오류입니다.');
        if (code !== 'SU') return;
        const { boardListItem } = responseBody as GetAllSchoolBoardListResponseDto;
        console.log("상태 업데이트할 데이터:", boardListItem); // 상태 업데이트에 사용할 데이터를 확인
        setAllSchoolBoardList(boardListItem); // 상태 업데이트 함수 호출
        updateExpiredPosts(boardListItem);
    };
    const getProjectSchoolBoardListResponse = (responseBody: GetProjectSchoolBoardListResponseDto | ResponseDto | null) => {
        if (!responseBody) return;
        const { code } = responseBody;
        if (code === 'DBE') alert('데이터베이스 오류입니다.');
        if (code !== 'SU') return;
        const { boardListItem } = responseBody as GetProjectSchoolBoardListResponseDto;
        setProjectSchoolBoardList(boardListItem);
        updateExpiredPosts(boardListItem);
    };
    const getStudySchoolBoardListResponse = (responseBody: GetStudySchoolBoardListResponseDto | ResponseDto | null) => {
        if (!responseBody) return;
        const { code } = responseBody;
        if (code === 'DBE') alert('데이터베이스 오류입니다.');
        if (code !== 'SU') return;
        const { boardListItem } = responseBody as GetStudySchoolBoardListResponseDto;
        setStudySchoolBoardList(boardListItem);
        updateExpiredPosts(boardListItem);
    };
    const fetchAllSchoolBoardList = async (accessToken: string) => {
        setLoading(true);
        await getAllSchoolBoardListRequest(accessToken).then(getAllSchoolBoardListResponse);
        setLoading(false);
    };
    const fetchProjectSchoolBoardList = async (accessToken: string) => {
        setLoading(true);
        await getProjcetSchoolBoardListRequest(accessToken).then(getProjectSchoolBoardListResponse);
        setLoading(false);
    };
    const fetchStudySchoolBoardList = async (accessToken: string) => {
        setLoading(true);
        await getStudySchoolBoardListRequest(accessToken).then(getStudySchoolBoardListResponse);
        setLoading(false);
    };

    useEffect(() => {
        const accessToken = cookies.accessToken;
        if (loginUser) {
            if (activeTab === "all") {
                fetchAllSchoolBoardList(accessToken);
            } else if (activeTab === "project") {
                fetchProjectSchoolBoardList(accessToken);
            } else if (activeTab === "study") {
                fetchStudySchoolBoardList(accessToken);
            }
        } else {
            if (activeTab === "all") {
                fetchAllBoardList();
            } else if (activeTab === "project") {
                fetchProjectBoardList();
            } else if (activeTab === "study") {
                fetchStudyBoardList();
            }
        }
    }, [activeTab, loginUser, cookies.accessToken]);

    return (
        <div>
            <div className={main.main}>
                <Link to={loginUser ? "/TeamRegister" : "/login"} style={{ textDecoration: "none" }}>
                    <div className={main.advertisement}>
                        <TextGroup>
                            <h1 className={main.text1}>티미에서 자신과 맞는 팀을 선택해보세요!</h1>
                            <h1 className={main.text2}>{loginUser ? "팀 구성하러 가기 🔥" : "로그인하러 가기 🔥"}</h1>
                        </TextGroup>
                        <img src={img1} className={main.img1} alt="Advertisement" />
                    </div>
                </Link>
                <div className={main.title}>
                    {tabMenu.map((tab) => (
                        <TabButton
                            key={tab.value}
                            active={activeTab === tab.value}
                            onClick={() => handleTabClick(tab.value)}
                        >
                            {tab.button}
                        </TabButton>
                    ))}
                </div>
                <PostGroup>
                    {/* 비로그인 상태 */}
                    {!loginUser && (
                        loading ? (
                            <div>Loading...</div>
                        ) : (
                            (activeTab === "all" ? allBoardList :
                                    activeTab === "project" ? projectBoardList : studyBoardList
                            ).map((boardListItem) => (
                                <Post
                                    key={boardListItem.postId}
                                    boardListItem={boardListItem}
                                    onClick={() => navigate(`/PostIn/${boardListItem.postId}`)}
                                    label=""
                                    expired={expiredPosts[boardListItem.postId]}
                                    onExpiration={handleExpiration} // onExpiration 함수 전달
                                />
                            ))
                        )
                    )}

                    {/* 로그인 상태 */}
                    {loginUser && (
                        loading ? (
                            <div>Loading...</div>
                        ) : (
                            (activeTab === "all" ? allSchoolBoardList :
                                    activeTab === "project" ? projectSchoolBoardList : studySchoolBoardList
                            )?.map((boardListItem) => (
                                <Post
                                    key={boardListItem.postId}
                                    boardListItem={boardListItem}
                                    onClick={() => navigate(`/PostIn/${boardListItem.postId}`)}
                                    label=""
                                    expired={expiredPosts[boardListItem.postId]}
                                    onExpiration={handleExpiration} // onExpiration 함수 전달
                                />
                            ))
                        )
                    )}
                </PostGroup>
            </div>
        </div>
    );
};