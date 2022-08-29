import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import GetProperTime from "../_General/GetProperTime";
// import CourseInfo from "../../CourseInfo/Body";
import TodayIcon from "@mui/icons-material/Today";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import Boop from "../_General/IconRotateAnim";
import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import { makeStyles } from "@material-ui/core/styles";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import Typography from "@mui/material/Typography";
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

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: "0%",
    top: 13,

    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

const useStyles = {
  root: {
    position: "relative",
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    fontSize: "2.5em",
  },
  count: {
    position: "absolute",
    lineHeight: 1,
    color: "#fff",
    top: "0.5em",
    fontSize: "1em",
  },
};
const Calendar = ({ showDetailsHandle, courseList }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [currentWeek, setCurrentWeek] = useState(getWeek(currentMonth));
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selected, setSelected] = useState();
  const [openDialog, setOpenDialog] = useState(false);
  const [disableBtn, setDisableBtn] = useState(false);
  const [courseInfoDetail, setCourseInfoDetail] = useState({});
  let userGroup = sessionStorage.getItem("userGroup");
  // console.log("==========================");
  // console.log(courseList);
  const onHandleClickCourse = (courseInfo, drDetail, disable) => {
    setSelected(courseInfo);
    setDisableBtn(disable);
    setCourseInfoDetail(drDetail);
    setOpenDialog(true);
  };

  const changeMonthHandle = (btnType) => {
    if (btnType === "prev") {
      setCurrentMonth(subMonths(currentMonth, 1));
    }
    if (btnType === "next") {
      setCurrentMonth(addMonths(currentMonth, 1));
    }
  };

  const changeWeekHandle = (btnType) => {
    //console.log("current week", currentWeek);
    if (btnType === "prev") {
      //console.log(subWeeks(currentMonth, 1));
      setCurrentMonth(subWeeks(currentMonth, 1));
      setCurrentWeek(getWeek(subWeeks(currentMonth, 1)));
    }
    if (btnType === "next") {
      //console.log(addWeeks(currentMonth, 1));
      setCurrentMonth(addWeeks(currentMonth, 1));
      setCurrentWeek(getWeek(addWeeks(currentMonth, 1)));
    }
  };

  const onDateClickHandle = (day, dayStr) => {
    setSelectedDate(day);
    showDetailsHandle(dayStr);
  };

  const iconStyles = {
    root: {
      position: "relative",
      display: "inline-flex",
      justifyContent: "center",
      alignItems: "center",
    },
    icon: {
      fontSize: "2.5em",
      width: 80,
      height: 80,
    },
    count: {
      position: "absolute",
      lineHeight: 1,
      color: "#fff",
      top: "0.5em",
      fontSize: "1em",
    },
  };

  function BookmarkIconWithNum({ size = 16, count = 0 }) {
    // const classes = useStyles();

    return (
      <div className={iconStyles.root} style={{ fontSize: size }}>
        <BookmarkIcon color="primary" className={iconStyles.icon} />
        <Typography component="span" className={iconStyles.count}>
          {count}
        </Typography>
      </div>
    );
  }
  const renderHeader = () => {
    const dateFormat = "MMM yyyy";
    // console.log("selected day", selectedDate);
    return (
      <div className="WeeklyCalendarheader WeeklyCalendarrow WeeklyCalendarflex-middle">
        <div className="WeeklyCalendarcol WeeklyCalendarcol-start">
          <Boop rotation={20} timing={200}>
            <div
              className="WeeklyCalendaricon"
              onClick={() => changeMonthHandle("prev")}
              style={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                justifyContent: "flex-start",
              }}
            >
              <NavigateBeforeIcon />
              Last Month
            </div>
          </Boop>
        </div>
        {/* <div className="WeeklyCalendarcol WeeklyCalendarcol-center">
          <span>{format(currentMonth, dateFormat)}</span>
        </div> */}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Boop rotation={20} timing={200}>
            <TodayIcon />
          </Boop>

          <span>{format(currentMonth, dateFormat)}</span>
        </div>
        <div className="WeeklyCalendarcol WeeklyCalendarcol-end">
          <Boop rotation={20} timing={200}>
            <div
              className="WeeklyCalendaricon"
              onClick={() => changeMonthHandle("next")}
              style={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                justifyContent: "flex-end",
              }}
            >
              Next Month
              <NavigateNextIcon />
            </div>
          </Boop>
        </div>
      </div>
    );
  };

  const renderDays = () => {
    const dateFormatDayOfWeek = "EEE";
    const dateFormatProper = "yyyyMMdd";
    const days = [];

    let startDate = startOfWeek(currentMonth, { weekStartsOn: 1 });

    const endDate = lastDayOfWeek(currentMonth, { weekStartsOn: 1 });
    const dateFormat = "d";
    const rows = [];

    let day = startDate;
    let formattedDate = "";

    for (let i = 0; i < 7; i++) {
      days.push(
        <div
          className={`WeeklyCalendarcol WeeklyCalendarcol-center WeeklyCalendarColStyle ${
            format(addDays(startDate, i), dateFormatProper) ===
            format(new Date(), dateFormatProper)
              ? "WeeklyCalendarColToday"
              : ""
          }`}
          key={i}
        >
          {format(addDays(startDate, i), dateFormat)}

          <br />
          <div className="WeeklyCalenderColWeek" key={i}>
            {format(addDays(startDate, i), dateFormatDayOfWeek)}
          </div>
        </div>
      );
    }
    return <div className="WeeklyCalendardays WeeklyCalendarrow">{days}</div>;
  };

  function checkIsDuringTime(drDetail) {
    try {
      if (drDetail === undefined) return "none";

      let formatStartTime = drDetail.start_time;
      let formatEndTime = drDetail.end_time;

      formatStartTime = Number(
        formatStartTime.slice(0, 2) + formatStartTime.slice(3, 5)
      );

      formatEndTime = Number(
        formatEndTime.slice(0, 2) + formatEndTime.slice(3, 5)
      );

      var today = new Date(), // get current date
        currentTime =
          today.getHours().toString() + today.getMinutes().toString();
      currentTime = Number(currentTime);

      var newTime = new Date();
      let startTimeHour = Number(drDetail.start_time.slice(0, 2));
      let startTimeMin = Number(drDetail.start_time.slice(3, 5));
      newTime.setHours(startTimeHour, startTimeMin - 30, 0, 0);

      let getProperMinutes =
        newTime.getMinutes() < 10
          ? "0" + newTime.getMinutes().toString()
          : newTime.getMinutes().toString();

      newTime = newTime.getHours().toString() + getProperMinutes.toString();
      newTime = Number(newTime);
      // console.log(newTime);

      if (
        currentTime >= newTime &&
        currentTime < formatStartTime &&
        currentTime <= formatEndTime
      ) {
        return "signIn";
      } else if (
        currentTime >= formatStartTime &&
        currentTime <= formatEndTime
      ) {
        return "duringTime";
      }

      return "none";
    } catch (error) {
      console.log("error :" + error);
      return "none";
    }
  }

  const renderCells = () => {
    try {
      const startDate = startOfWeek(currentMonth, { weekStartsOn: 1 });
      const endDate = lastDayOfWeek(currentMonth, { weekStartsOn: 1 });
      const dateFormat = "d";
      const dateFormatProper = "yyyyMMdd";
      const timeFormat = "HHmm";

      const rows = [];
      let days = [];
      let day = startDate;
      let formattedDate = "";

      //check count of course list
      // console.log(courseList);
      //for (let iData = 0; iData < courseList.length; iData++) {
      //dr master means data row master
      //let drMaster = courseList[iData];
      for (let iDetail = 0; iDetail < courseList.length; iDetail++) {
        //dr detail means data row detail

        let drDetail = courseList[iDetail];
        // if true then generate row
        let needGenerateRow = false;

        //to calculate how many row to generate
        // calculate each day of week 1 ~ 7
        for (let dayOfWeek = 1; dayOfWeek < 8; dayOfWeek++) {
          //get current detail course date
          let currentDetailCourseDate = format(
            new Date(drDetail["course_date"]),
            dateFormatProper
          );

          //date in timetable
          let dateInTimetable = format(
            addDays(startDate, dayOfWeek - 1),
            dateFormatProper
          );

          //check current detail course date matched with dateintimetable then set generate row equals to true
          if (currentDetailCourseDate === dateInTimetable) {
            needGenerateRow = true;
            break;
          }
        }

        //if need generate row is false then skip
        if (!needGenerateRow) continue;

        // set day of week 1 ~ 7
        for (let dayOfWeek = 1; dayOfWeek < 8; dayOfWeek++) {
          //get current detail course date
          let currentDetailCourseDate = format(
            new Date(drDetail["course_date"]),
            dateFormatProper
          );

          //date in timetable
          let dateInTimetable = format(
            addDays(startDate, dayOfWeek - 1),
            dateFormatProper
          );

          //check is is today
          let isToday =
            format(addDays(startDate, dayOfWeek - 1), dateFormatProper) ===
            format(new Date(), dateFormatProper);

          let isClassCancelled = drDetail.cancel === "Y";

          let isDuringTime = "none";

          if (isToday && currentDetailCourseDate === dateInTimetable) {
            isDuringTime = checkIsDuringTime(drDetail);
          }

          days.push(
            <div className={`WeeklyCalendarcol WeeklyCalendarcell`}>
              {currentDetailCourseDate === dateInTimetable ? (
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    position: "relative",
                  }}
                >
                  {(isClassCancelled || isDuringTime !== "none") && (
                    <div
                      style={{
                        position: "absolute",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <div style={{ width: "fit-content", height: "5vh" }}>
                        <BookmarkIcon
                          style={{
                            color: isClassCancelled
                              ? "red"
                              : isDuringTime === "duringTime"
                              ? "green"
                              : "#F99F00",
                            width: "auto",
                            height: "100%",
                          }}
                        />
                      </div>
                      <Typography
                        variant="body2"
                        style={{
                          position: "absolute",
                          lineHeight: 1,
                          color: "#fff",
                          top: "40%",
                          fontSize: "1.2vh",
                          width: "fit-content",
                        }}
                      >
                        {isClassCancelled
                          ? "取消"
                          : isDuringTime === "duringTime"
                          ? "上课"
                          : "签到"}
                      </Typography>
                    </div>
                  )}
                  <Button
                    disabled={isClassCancelled}
                    style={{
                      color: isToday ? "#000e4a" : "#bfbfbf",
                    }}
                    sx={{ height: 1, width: 1 }}
                    onClick={() =>
                      onHandleClickCourse(
                        // courseList[iData],
                        drDetail,
                        isDuringTime === "none"
                      )
                    }
                  >
                    <span style={{ transform: "scale(0.7)" }}>
                      {drDetail.course_name}
                      <br />{" "}
                      {GetProperTime(drDetail.startTime, drDetail.endTime)}
                    </span>
                  </Button>
                </div>
              ) : (
                // leave blank in row column
                ""
              )}
            </div>
          );
        }
      }
      // }

      rows.push(
        <div className="WeeklyCalendarrow" key={day}>
          {days}
        </div>
      );
      days = [];
      return <div className="WeeklyCalendarbody">{rows}</div>;
    } catch (error) {
      return <div></div>;
    }
  };
  const renderFooter = () => {
    return (
      <div className="WeeklyCalendarheader WeeklyCalendarrow WeeklyCalendarflex-middle">
        <div className="WeeklyCalendarcol WeeklyCalendarcol-start">
          <Boop rotation={20} timing={200}>
            <div
              className="WeeklyCalendaricon"
              onClick={() => changeWeekHandle("prev")}
              style={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                justifyContent: "flex-start",
              }}
            >
              <NavigateBeforeIcon />
              Last Week
            </div>
          </Boop>
        </div>
        {/* <div>{currentWeek}</div> */}
        <div
          className="WeeklyCalendarcol WeeklyCalendarcol-end"
          onClick={() => changeWeekHandle("next")}
        >
          <Boop rotation={20} timing={200}>
            <div
              className="WeeklyCalendaricon"
              style={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                justifyContent: "flex-end",
              }}
            >
              {" "}
              Next Week
              <NavigateNextIcon />
            </div>
          </Boop>
        </div>
      </div>
    );
  };
  return (
    <div className="WeeklyCalendarcalendar">
      {/* {selected !== undefined && (
        <CourseInfo
          readOnly={userGroup === "teacher"}
          setOpenDialog={setOpenDialog}
          openDialog={openDialog}
          Purchased={true}
          courseInfo={selected}
          time={GetProperTime(
            courseInfoDetail.startTime,
            courseInfoDetail.endTime
          )}
          courseInfoDetail={courseInfoDetail}
          disableBtn={disableBtn}
        />
      )} */}
      {renderHeader()}
      {renderDays()}
      {renderCells()}
      {renderFooter()}
    </div>
  );
};

export default Calendar;
/**
 * Header:
 * icon for switching to the previous month,
 * formatted date showing current month and year,
 * another icon for switching to next month
 * icons should also handle onClick events to change a month
 */

<div>
  <div>
    <div></div>
  </div>
</div>;
