import React from "react";
import { data } from "tailwindcss/defaultTheme";
import { LoadingState } from "~/components/loading-state/LoadingState";
import { api } from "~/utils/api";

const Calendar = () => {
  const { data: CalendarNameByDob, isLoading } =
    api.famMember.getCalendarDates.useQuery(null);

  const renderCalendar = () => (
    <div className="space-y-8 pb-40">
      {CalendarNameByDob?.map((item, idx) => (
        <div key={idx}>
          <h4 className="text-3xl font-semibold">{item.month}</h4>

          <div className="flex flex-wrap space-x-5 pt-4">
            {item.birthdays.length > 0 ? (
              item.birthdays.map((item, idx) => (
                <div key={idx} className="rounded-md border-2 border-black p-4">
                  <div>{item.date}</div>
                  <div>{item.memberName}</div>
                </div>
              ))
            ) : (
              <span>No Birthdays in this month</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );

  return <>{isLoading ? <LoadingState /> : renderCalendar()}</>;
};

export default Calendar;
