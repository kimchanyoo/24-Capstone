// 글 등록 인터페이스
export default interface BoardInsertListItem {
    postId : number;
    title : string;
    body : string;
    recruitmentClassification : number;
    recruitmentPerson : number;
    processing : number;
    processingDuration : number;
    tech : number[];
    deadLine : string;
    field : number[];
}