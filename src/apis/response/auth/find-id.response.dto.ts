import ResponseDto from "../response.dto";
import {ResponseCode} from "../../../types/enum";

export default interface FindIdResponseDto extends ResponseDto {
    code: ResponseCode;
    message: string;
    userId: string;
}