export default interface BoardInsertListItem {
    title : string;
    body : string;
    recruitmentClassification : number;
    recruitmentPerson : number;
    processing : number;
    processingDuration : number;
    tech : string[];
    deadLine : string;
    field : string[]
    contact : number;
}