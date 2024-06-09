import { SchoolBoardListItem } from "types/interface";
import ResponseDto from "../response.dto";

export default interface GetProjectSchoolBoardListResponseDto extends ResponseDto {
    boardListItem: SchoolBoardListItem[];
}