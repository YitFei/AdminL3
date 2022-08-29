import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { GetAPI } from "../../../globalFunctions/APIHelper";
import { GetCurrentUserCourseList } from "../../../globalFunctions/GetCurrentUserCourseList";
import Button from "@mui/material/Button";
import GetProperTime from "../../../globalFunctions/GetProperTime";
import CourseInfo from "../../CourseInfo/Body";
import WeeklyCalendar from "./WeeklyCalendar";
import "./styles.css";

export default function Timetable(props) {
  const [courseList, setCourseList] = React.useState([]);
  const [showDetails, setShowDetails] = React.useState(false);
  const [courseListByDate, setCourseListByDate] = React.useState([]);

  const userGroup = sessionStorage.getItem("userGroup");
  let URL_GetCourseDetailByDate =
    "https://api.l3education.com.my/timetable/list/";

  React.useEffect(() => {
    GetCurrentUserCourseList().then((result) => {
      // console.log(result);
      setCourseList(result);
    });
  }, []);

  const [data, setData] = React.useState(null);

  const showDetailsHandle = (dayStr) => {
    setData(dayStr);
    setShowDetails(true);
  };

  //logic had changed
  return (
    <div>
      {/* {console.log("=============")}
      {console.log(courseListByDate)} */}
      <WeeklyCalendar
        showDetailsHandle={showDetailsHandle}
        courseList={courseList}
      />
    </div>
  );
}
