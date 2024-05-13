import {ResponseCode} from "../../component/types/enum";

export default interface ResponseDto {
    code: ResponseCode;
    message: string;
}
