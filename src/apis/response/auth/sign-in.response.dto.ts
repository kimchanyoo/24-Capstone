import ResponseDto from "../response.dto";
import {ResponseCode} from "../../../types/enum";

export default interface SignInResponseDto extends ResponseDto {
    token: string;
    expirationTime: number;
    code: ResponseCode;
    message: string;
}
