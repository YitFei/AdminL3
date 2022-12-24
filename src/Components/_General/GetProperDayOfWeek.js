export default function dayOfWeekInTranslation(dayOfWeek) {
  switch (dayOfWeek) {
    case 2:
      return "Monday";
    case 3:
      return "Tuesday";
    case 4:
      return "Wednesday";
    case 5:
      return "Thursday";
    case 6:
      return "Friday";
    case 7:
      return "Saturday";
    case 1:
      return "Sunday";
    default:
      return "";
  }
}

export function dayOfWeekInTranslationCH(dayOfWeek) {
  switch (dayOfWeek) {
    case 2:
      return "星期一";
    case 3:
      return "星期二";
    case 4:
      return "星期三";
    case 5:
      return "星期四";
    case 6:
      return "星期五";
    case 7:
      return "星期六";
    case 1:
      return "星期日";
    default:
      return "";
  }
}
