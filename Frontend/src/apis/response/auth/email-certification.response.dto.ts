import ResponseDto from "../response.dto";
import {ResponseCode} from "../../../types/enum";

export default interface EmailCertificationResponseDto extends ResponseDto {
    code: ResponseCode;
    message: string;
}
