import ResponseDto from "../response.dto";

export default interface SchoolEmailCertificationResponseDto extends ResponseDto {
    success: boolean;
    univName: string;
    certified_email: string;
    certified_date: string;
}