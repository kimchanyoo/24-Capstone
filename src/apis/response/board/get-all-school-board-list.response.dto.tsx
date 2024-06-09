import { SchoolBoardListItem } from "types/interface";
import ResponseDto from "../response.dto";
export default interface GetAllSchoolBoardListResponseDto extends ResponseDto {
    boardListItem: SchoolBoardListItem[];
}