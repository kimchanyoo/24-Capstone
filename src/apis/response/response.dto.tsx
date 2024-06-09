import {ResponseCode} from "types/enum";

export default interface ResponseDto {
    code: ResponseCode;
    message: string;
    success: boolean;
    userId: string;
    nickName: string;
}
