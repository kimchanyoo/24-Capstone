import ResponseDto from "../response.dto";
import {ApplicationUser} from "types/interface"

export default interface GetApplyBoardResponseDto extends ResponseDto, ApplicationUser {
    applicantList : ApplicationUser[];
}
