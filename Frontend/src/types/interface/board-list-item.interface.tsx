// 메인페이지에 나오는 post
export default interface BoardListItem {
    postId : number;
    nickName : string;
    recruitmentClassification : number;
    recruitmentPerson : number;
    deadLine : string;
    title : string;
    termination: boolean;
}