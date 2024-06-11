import ResponseDto from "../response.dto";
import {ResponseCode} from "../../../types/enum";

export default interface CheckPasswordResponseDto extends ResponseDto {
    code: ResponseCode;
    message: string;
}