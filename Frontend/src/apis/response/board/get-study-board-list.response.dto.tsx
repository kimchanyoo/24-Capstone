import { BoardListItem } from "types/interface";
import ResponseDto from "../response.dto";

export default interface GetStudyBoardListResponseDto extends ResponseDto {
    latestList: BoardListItem[];
}