import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import drop from "../../stylesheet/DropDown.module.css"

interface DatePickProps {
    value: string;
    onDateChange: (date: Date) => void;
}

export const DatePick: React.FC<DatePickProps> = ({ onDateChange }) => {
    const [endDate, setEndDate] = useState<Date>(new Date());

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        event.preventDefault();
    };

    // 날짜 선택이 변경될 때 호출되는 함수
    const handleDateChange = (date: Date) => {
        setEndDate(date); // 내부 상태 업데이트
        onDateChange(date); // 부모 컴포넌트로 선택한 날짜 전달
    };

    return (
        <div>
            <DatePicker
                className={drop.DateBtn}
                selected={endDate}
                onChange={handleDateChange} // 변경된 날짜를 처리하는 함수 설정
                dateFormat="yyyy-MM-dd"
                onKeyDown={handleKeyDown}
            />
        </div>
    );
};
