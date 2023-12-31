import type { MonthwiseBirthDayCollectionType } from "~/types";

type NameByDobType = {
  FM_name: string;
  FM_dob: string | null;
}[];

export function getCalendarDates(NameByDob: NameByDobType) {
  const dates: MonthwiseBirthDayCollectionType[] = [
    {
      month: "January",
      birthdays: [],
    },
    {
      month: "February",
      birthdays: [],
    },
    {
      month: "March",
      birthdays: [],
    },
    {
      month: "April",
      birthdays: [],
    },
    {
      month: "May",
      birthdays: [],
    },
    {
      month: "June",
      birthdays: [],
    },
    {
      month: "July",
      birthdays: [],
    },
    {
      month: "August",
      birthdays: [],
    },
    {
      month: "September",
      birthdays: [],
    },
    {
      month: "October",
      birthdays: [],
    },
    {
      month: "November",
      birthdays: [],
    },
    {
      month: "December",
      birthdays: [],
    },
  ];

  NameByDob.map((date) => {
    if (date.FM_dob) {
      const month = date.FM_dob?.substring(4, 7);

      switch (month) {
        case "Jan":
          dates[0]?.birthdays.push({
            memberName: date.FM_name,
            date: date.FM_dob,
          });
          break;
        case "Feb":
          dates[1]?.birthdays.push({
            memberName: date.FM_name,
            date: date.FM_dob,
          });
          break;
        case "Mar":
          dates[2]?.birthdays.push({
            memberName: date.FM_name,
            date: date.FM_dob,
          });
          break;
        case "Arp":
          dates[3]?.birthdays.push({
            memberName: date.FM_name,
            date: date.FM_dob,
          });
          break;
        case "May":
          dates[4]?.birthdays.push({
            memberName: date.FM_name,
            date: date.FM_dob,
          });
          break;
        case "Jun":
          dates[5]?.birthdays.push({
            memberName: date.FM_name,
            date: date.FM_dob,
          });
          break;
        case "Jul":
          dates[6]?.birthdays.push({
            memberName: date.FM_name,
            date: date.FM_dob,
          });
          break;
        case "Aug":
          dates[7]?.birthdays.push({
            memberName: date.FM_name,
            date: date.FM_dob,
          });
          break;
        case "Sep":
          dates[8]?.birthdays.push({
            memberName: date.FM_name,
            date: date.FM_dob,
          });
          break;
        case "Oct":
          dates[9]?.birthdays.push({
            memberName: date.FM_name,
            date: date.FM_dob,
          });
          break;
        case "Nov":
          dates[10]?.birthdays.push({
            memberName: date.FM_name,
            date: date.FM_dob,
          });
          break;
        case "Dec":
          dates[11]?.birthdays.push({
            memberName: date.FM_name,
            date: date.FM_dob,
          });
          break;
      }
    }
  });

  return dates;
}
