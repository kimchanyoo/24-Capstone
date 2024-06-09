import { BoardListItem } from "types/interface";
import ResponseDto from "../response.dto";

export default interface GetProjectBoardListResponseDto extends ResponseDto {
    latestList: BoardListItem[];
}