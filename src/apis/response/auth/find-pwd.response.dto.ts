import ResponseDto from "../response.dto";
import {ResponseCode} from "../../../types/enum";

export default interface FindPwdResponseDto extends ResponseDto {
    code: ResponseCode;
    message: string;
}