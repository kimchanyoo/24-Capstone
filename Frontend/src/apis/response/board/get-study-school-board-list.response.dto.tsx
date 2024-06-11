import { SchoolBoardListItem } from "types/interface";
import ResponseDto from "../response.dto";

export default interface GetStudySchoolBoardListResponseDto extends ResponseDto {
    boardListItem: SchoolBoardListItem[];
}