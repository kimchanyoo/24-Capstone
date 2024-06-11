import { BoardListItem } from "types/interface";
import ResponseDto from "../response.dto";
export default interface GetAllBoardListResponseDto extends ResponseDto {
    latestList: BoardListItem[];
}