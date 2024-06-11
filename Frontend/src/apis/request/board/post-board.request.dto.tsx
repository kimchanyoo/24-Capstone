export default interface PostBoardRequestDto {
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