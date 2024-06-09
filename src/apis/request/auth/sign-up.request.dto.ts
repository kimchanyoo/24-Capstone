export default interface SignUpRequestDto {
    userId: string;
    pwd: string;
    email: string;
    nickName: string;
    phoneNumber: string;
    name: string;
    schoolName: string;
    department: string;
    attendanceStatus: number;
    field: number;
    career: string;
    tech: number[];
}
