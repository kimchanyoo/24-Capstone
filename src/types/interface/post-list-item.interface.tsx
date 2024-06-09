// 지원자가 보는 화면
export default interface PostListItem{
    userId: string;
    postId : number;
    nickName : string;
    recruitmentClassification : number;
    recruitmentPerson : number;
    processing : number;
    processingDuration : number;
    tech : number[];
    deadLine : string;
    field : number[];
    title : string;
    body : string;
}