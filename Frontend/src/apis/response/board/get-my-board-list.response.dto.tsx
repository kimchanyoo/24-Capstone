import ResponseDto from '../response.dto'
import {MyBoardList} from 'types/interface';
export default interface GetMyBoardListResponseDto extends ResponseDto {
    uploadListItem: MyBoardList[];
}