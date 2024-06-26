import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { getYear } from "date-fns";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { cn } from "~/lib/utils";
import { range } from "lodash";

interface DateOfBirthPickerProps {
  className?: string;
  getDateCallback: (date: Date | null) => void;
}
const DateOfBirthPicker = ({
  className,
  getDateCallback,
}: DateOfBirthPickerProps) => {
  const currentDate = new Date();
  const [selectedDate, setSelectedDate] = useState<Date | null>(currentDate);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const years: number[] = range(1800, new Date().getFullYear() + 1);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];


  const handlePrevYear = () => {
    const newDate = new Date(selectedDate || currentDate);
    newDate.setFullYear(newDate.getFullYear() - 1);
    setSelectedDate(newDate);
  };

  const handleNextYear = () => {
    const newDate = new Date(selectedDate || currentDate);
    newDate.setFullYear(newDate.getFullYear() + 1);
    setSelectedDate(newDate);
  };


  return (
    <div>
     
      <DatePicker
        showIcon
        selected={selectedDate || currentDate}
        onChange={(date) => {
          setSelectedDate(date);
          getDateCallback(date);
        }}
        dateFormat="yyyy-MM-dd"
        showYearDropdown
        scrollableYearDropdown
        yearDropdownItemNumber={15}
        scrollableMonthYearDropdown
        renderCustomHeader={({
          date,
          changeYear,
          changeMonth,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }) => (
          <div
            style={{
              margin: 10,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
              <ChevronLeftIcon className="h-4 w-4" />
            </button>
            <select
              value={getYear(date)}
              onChange={({ target: { value } }) => {
                const year = parseInt(value);
                changeYear(year);
              }}
            >
              {years.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>

            <select
              value={months[date.getMonth()]}
              onChange={({ target: { value } }) =>
                changeMonth(months.indexOf(value))
              }
            >
              {months.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>

            <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
              <ChevronRightIcon className="h-4 w-4" />
            </button>
          </div>
        )}
        className={cn("p-3", className)}
      />
    </div>
  );
};

export default DateOfBirthPicker;
