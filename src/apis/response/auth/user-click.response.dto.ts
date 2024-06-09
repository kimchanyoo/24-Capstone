import ResponseDto from "../response.dto";
import {ResponseCode} from "../../../types/enum";

export default interface UserClickResponseDto extends ResponseDto {
    code: ResponseCode;
    message: string;
    nickName: string;
    email: string;
    schoolName: string;
    department: string;
    field: number;
    tech: number[];
    career: string;
}