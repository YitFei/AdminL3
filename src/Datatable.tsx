import { APIByQuery } from "./API";
import {
  format,
  subMonths,
  addMonths,
  startOfWeek,
  addDays,
  isSameDay,
  lastDayOfWeek,
  getWeek,
  addWeeks,
  subWeeks,
} from "date-fns";

export default async function Datatable(rowTableName: string) {
  try {
    let sqlQueryGetRows = `select * from l3education.${rowTableName}`;

    let sqlQueryGetColumns = `SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = '${"l3education"}' AND TABLE_NAME = '${rowTableName}'`;

    let result = await APIByQuery(
      "Post",
      "/custom/search",
      localStorage.getItem("token"),
      sqlQueryGetColumns
    ).then((resColumnName) => {
      // setPromotionList(res.data);
      return APIByQuery(
        "Post",
        "/custom/search",
        localStorage.getItem("token"),
        sqlQueryGetRows
      ).then((res) => {
        let colName = resColumnName.data;
        let rowData = res.data;

        rowData = rowData.map((row) => {
          let newRow = [];

          for (let i = 0; i < row.length; i++) {
            // assign row data based on the column name
            let curColName: string = colName[i];
            var curRowData = row[i];
            if (getFormatDateRowDate(curColName, curRowData) !== null) {
              curRowData = getFormatDateRowDate(curColName, curRowData);
            }
            newRow = { ...newRow, [curColName]: curRowData };
          }

          return newRow;
        });

        return rowData;
      });
    });

    return result;
  } catch (err) {
    console.error(err);
  }
}

export async function MultiDatatable(
  sqlQuery: string,
  columnNames: Array<string>
) {
  try {
    // console.log(sqlQuery);
    // console.log(columnNames);
    let result = await APIByQuery(
      "Post",
      "/custom/search",
      localStorage.getItem("token"),
      sqlQuery
    ).then((res) => {
      return res.data.map((row) => {
        let newRow = [];
        for (let i = 0; i < columnNames.length; i++) {
          let curColName: string = columnNames[i];
          var curRowData = row[i];
          if (getFormatDateRowDate(curColName, curRowData) !== null) {
            curRowData = getFormatDateRowDate(curColName, curRowData);
          }

          newRow = { ...newRow, [curColName]: curRowData };
        }

        return newRow;
      });
    });

    return result;
  } catch (error) {
    console.error(error);
  }
}

function formatDate(date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

function getFormatDateRowDate(curColName: string, row) {
  if (
    curColName === "valid_from" ||
    curColName === "valid_until" ||
    curColName === "course_date" ||
    curColName === "create_at" ||
    curColName === "dob" ||
    curColName === "attendTime"
  ) {
    let unix_timestamp = row;
    // Create a new JavaScript Date object based on the timestamp
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    var date = new Date(unix_timestamp);
    // Hours part from the timestamp
    var hours = date.getHours();
    // Minutes part from the timestamp
    var minutes = "0" + date.getMinutes();
    // Seconds part from the timestamp
    var seconds = "0" + date.getSeconds();

    // Will display time in 10:30:23 format
    var formattedTime =
      hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);
    return formatDate(date);
    //  date
  }
  return null;
}
