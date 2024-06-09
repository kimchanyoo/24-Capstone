import ResponseDto from "../response.dto";
import {ResponseCode} from "../../../types/enum";

export default interface ResetPwdResponseDto extends ResponseDto {
    code: ResponseCode;
    message: string;
}