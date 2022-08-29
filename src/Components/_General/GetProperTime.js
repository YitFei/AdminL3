export default function GetProperTime(startTime, endTime) {
  if (startTime === undefined || endTime === undefined) return "";
  var startTime_AMPM = startTime.slice(0, 2) >= 12 ? " pm" : " am";
  var endTime_AMPM = endTime.slice(0, 2) >= 12 ? " pm" : " am";
  //   console.log(startTime_AMPM);

  startTime =
    startTime.slice(0, 2) > 12
      ? startTime.slice(0, 2) - 12 + startTime.slice(2, 5)
      : startTime.slice(0, 5);

  endTime =
    endTime.slice(0, 2) > 12
      ? endTime.slice(0, 2) - 12 + endTime.slice(2, 5)
      : endTime.slice(0, 5);

  return (
    startTime.slice(0, 5) +
    startTime_AMPM +
    " - " +
    endTime.slice(0, 5) +
    endTime_AMPM
  );
}

export function GetSingleProperTime(endTime) {
  if (endTime === undefined) return "";

  var endTime_AMPM = endTime.slice(0, 2) >= 12 ? " pm" : " am";

  endTime =
    endTime.slice(0, 2) > 12
      ? endTime.slice(0, 2) - 12 + endTime.slice(2, 5)
      : endTime.slice(0, 5);

  return endTime.slice(0, 5) + endTime_AMPM;
}
