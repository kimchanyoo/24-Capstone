import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import drop from "../../stylesheet/DropDown.module.css"

export const DatePick = () => {
    const [endDate, setEndDate] = useState(new Date());

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      event.preventDefault();
    };

    return (
        <div>
            <DatePicker
                className={drop.DateBtn}
                selected={endDate}
                onChange={(date: Date) => setEndDate(date)}
                dateFormat="yyyy-MM-dd"
                onKeyDown={handleKeyDown}
            />
        </div>
    );
};
