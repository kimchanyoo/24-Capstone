import React, { useEffect, useState } from "react";
import { GoBackBtn } from "../GoBackBtn";
import Reg from "../../stylesheet/TeamRegister.module.css";
import styled from "@emotion/styled";
import MyPost from "../MyPost";
import { GetMyBoardListResponseDto } from 'apis/response/board';
import { getMyBoardListRequest } from 'apis';
import { ResponseDto } from 'apis/response';
import { MyBoardList } from 'types/interface';
import { useNavigate, useParams } from 'react-router-dom';
import { useLoginUserStore } from "stores";
import { useCookies } from "react-cookie";


const Container = styled.div`
  width: auto;
  height: auto;
  margin-left: 10%;
  margin-right: 10%;
`;

export const MyField: React.FC = () => {
    const navigate = useNavigate();
    const [cookies, setCookie] = useCookies();
    const [myBoardList, setMyBoardList] = useState<MyBoardList[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const { loginUser } = useLoginUserStore();
    const { postId } = useParams();

    useEffect(() => {
        const fetchMyBoardList = async () => {
            try {
                setLoading(true);
                const accessToken = cookies.accessToken;
                const response = await getMyBoardListRequest(accessToken);
                if (!response) {
                    console.error('API 응답이 없습니다.');
                    return;
                }
                const { code, uploadListItem } = response as GetMyBoardListResponseDto;
                if (code === 'DBE') {
                    alert('데이터베이스 오류입니다.');
                    return;
                }
                if (code !== 'SU') {
                    console.error('API 응답 코드가 유효하지 않습니다:', code);
                    return;
                }
                setMyBoardList(uploadListItem || []);
            } catch (error) {
                console.error('게시물을 불러오는 중 오류가 발생했습니다:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMyBoardList();
    }, [loginUser, postId, cookies.accessToken]);

    return (
        <div>
            <GoBackBtn />
            <Container>
                <h1 className={Reg.title}>내 작성글 ✍️</h1>
                <hr className={Reg.line} />
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <>
                        {myBoardList.length === 0 ? (
                            <div>게시글이 없습니다.</div>
                        ) : (
                            myBoardList.map((myBoardItem) => (
                                <MyPost
                                    key={myBoardItem.postId}
                                    myBoardList={myBoardItem}
                                    onClick={() => navigate(`/PostIn/${myBoardItem.postId}`)}
                                    label="게시물 보기"
                                />
                            ))
                        )}
                    </>
                )}
            </Container>
        </div>
    );
};
