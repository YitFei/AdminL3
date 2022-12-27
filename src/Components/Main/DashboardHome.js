import React from "react";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import NoImg from "../../Icons/NoImg.svg";

import clock from "../../Icons/clock.svg";
import lesson from "../../Icons/lesson.svg";
import star from "../../Icons/star.svg";
import Math from "../../Icons/Math.svg";
import English from "../../Icons/English.svg";
import Physics from "../../Icons/Physics.svg";
import BahasaMelayu from "../../Icons/BahasaMelayu.svg";
import API from "../../API";
import Image from "next/image";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import WeeklyCalendar from "./WeeklyCalender";
import Divider from "@mui/material/Divider";
import { MultiDatatable } from "../../Datatable";
import { ReportOptions } from "../Reports/_ReportsTabPanel";
import Boop from "../_General/IconRotateAnim";

function convertHHMM(timeData) {
  return (
    timeData.toFixed(0) +
    "h" +
    (timeData.toString().slice(-3, -2) === "."
      ? (parseInt(timeData.toString().slice(-2)) / 100) * 60 + "m"
      : "")
  );
}
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  backgroundColor: "#fff",
}));
const Item2 = styled(Paper)(({ theme }) => ({
  background: "none",
  ...theme.typography.body2,
  padding: theme.spacing(0),
  textAlign: "center",
  color: "#434343",
  fontSize: "1em",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));
const ColorButton = styled(Button)(({ theme }) => ({
  textTransform: "capitalize",
  width: "fit-content",
  height: "fit-content",
  color: "#000000DE",
  backgroundColor: "#4F46BA",
  fontFamily: "'Advent Pro', sans-serif",
  fontSize: "1em",
  paddingLeft: 18,
  paddingRight: 18,
  marginTop: 5,
  marginBottom: 5,
  borderRight: "15px solid rgb(249 137 107)",
  "&:hover": {
    backgroundColor: "#f52cae",
    boxShadow:
      "0 10px 16px 0 rgb(249 137 107 / 20%), 0 6px 20px 0 rgb(249 137 107 / 19%) !important",
  },
}));
const pageLimit = 3;

const DashboardHome = (props) => {
  const [Announcement, setAnnouncement] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [Activity, setActivity] = React.useState([]);
  const [Course, setCourse] = React.useState([]);
  const [courseList, setCourseList] = React.useState([]);
  const [showDetails, setShowDetails] = React.useState(false);
  const [courseListByDate, setCourseListByDate] = React.useState([]);
  // console.log(courseList);
  React.useEffect(() => {
    MultiDatatable(
      "select a.course_active, a.course_name,a.teacher_id, b.* from l3education.t_course a left join l3education.t_timetable b on a.id = b.course_id where a.course_active = 'Y';",
      [
        "course_active",
        "course_name",
        "teacher_id",
        "id",
        "cancel",
        "course_date",
        "course_id",
        "end_time",
        "finish",
        "start_time",
        "void_reason_id",
        "is_del",
        "create_by",
        "create_at",
        "update_by",
        "update_at",
      ]
    ).then((res) => {
      // console.log(res);
      setCourseList(res);
    });

    API("get", "/announcement/getAll/", props.token).then((res) => {
      // console.log(res);
      if (res.status === 200 && res.message === "NOT FOUND") {
        // console.log("not found");
      } else if (res.status == 200 && res.message === "FOUND") {
        // console.log("found");
        setAnnouncement(res.data);
      }
    });
    API("get", "/courseSubscription/list/", props.token).then((res) => {
      // console.log(res);
      if (res.status === 200 && res.message === "NOT FOUND") {
        // console.log("not found");
      } else if (res.status == 200 && res.message === "FOUND") {
        // console.log("found");
        setActivity(res.data);
      }
    });
    API("get", "/course/list/", props.token).then((res) => {
      if (res.status === 200 && res.message === "NOT FOUND") {
        // console.log("not found");
      } else if (res.status == 200 && res.message === "FOUND") {
        // console.log("found");
        setCourse(res.data);
      }
    });
  }, []);

  const [data, setData] = React.useState(null);

  const showDetailsHandle = (dayStr) => {
    setData(dayStr);
    setShowDetails(true);
  };

  let total = 0;
  function convertMonth(number) {
    if (number === 2) return "MON";
    else if (number === 3) return "TUE";
    else if (number === 4) return "WED";
    else if (number === 5) return "THUR";
    else if (number === 6) return "FRI";
    else if (number === 7) return "SAT";
    else if (number === 1) return "SUN";
  }
  function ClassroomLinkFetch(Id) {
    API("get", "/onlineClassroom/get/" + Id, props.token).then((res) => {
      // console.log(res);
      if (res.status === 200 && res.message === "NOT FOUND") {
        // console.log("not found");
      } else if (res.status == 200 && res.message === "FOUND") {
        // console.log("found");
        // console.log(res.data.googleClassroom);
        window.open(res.data.zoomUrl, "_blank");
      }
    });
  }
  function ShowCourseLayout(data) {
    // console.log(data);
  }
  React.useEffect(() => {
    if (props.token !== null && total === 0) {
      total += 1;

      // use API as a function to call API anywhere
      setInterval(() => setPage((prev) => (prev + 1) % pageLimit), 5000);
    }
  }, []);
  // React.useEffect(() => console.log(page), [page]);

  return (
    <>
      <Typography
        sx={{ fontFamily: "'Andada Pro', serif", fontWeight: "bold" }}
        component="h4"
        variant="h4"
        color="black"
        gutterBottom
      >
        Home
      </Typography>

      <WeeklyCalendar
        showDetailsHandle={showDetailsHandle}
        courseList={courseList}
      />

      <Divider sx={{ m: 2 }} variant="middle" />
      <Typography
        sx={{ fontFamily: "'Andada Pro', serif", fontWeight: "bold" }}
        component="h6"
        variant="h6"
        color="black"
        gutterBottom
      >
        Announcement
      </Typography>
      {Announcement.map(
        (data, index) =>
          index === page && (
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={0}
              key={index}
            >
              <Item
                elevetion={0}
                sx={{
                  wordBreak: "break-word",
                  width: 650,
                  height: 273,
                  borderBottomRightRadius: 0,
                  borderTopRightRadius: 0,
                  boxShadow: "none",
                }}
              >
                <Typography
                  component="h5"
                  variant="h5"
                  color="#AC6755"
                  gutterBottom
                  sx={{
                    fontFamily: "'Andada Pro', serif",
                    fontWeight: "bold",
                  }}
                >
                  {data.title}
                </Typography>

                <Typography
                  component="p"
                  variant="body1"
                  color="#51459E"
                  gutterBottom
                  sx={{
                    fontFamily: "'Andada Pro', serif",
                    fontWeight: "bold",
                  }}
                >
                  {data.description}
                </Typography>
              </Item>
              <Item
                elevetion={0}
                sx={{
                  borderBottomLeftRadius: 0,
                  borderTopLeftRadius: 0,
                  boxShadow: "none",
                }}
              >
                <Image
                  onMouseEnter={() => console.log("enter")}
                  src={data.imageUrl ? data.imageUrl : NoImg}
                  height={250}
                  width={250}
                  layout={"fixed"}
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                />
              </Item>
            </Stack>
          )
      )}
      <Stack
        my={1}
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={0}
      >
        {Announcement.map((data, index) => (
          <Item
            elevation={0}
            sx={{ mx: 1, backgroundColor: "#FFFFFF" }}
            key={index}
          >
            <Button
              variant="contained"
              sx={{
                borderRadius: 500,
                width: 25,
                height: 10,
                backgroundColor: page === index ? "#4F46BA" : "#FBE081",
                "&:hover": {
                  backgroundColor: "#4F46BA",
                },
              }}
              onClick={() => setPage(index)}
              onMouseEnter={() => setPage(index)}
            ></Button>
          </Item>
        ))}
      </Stack>
      <Divider sx={{ m: 2 }} variant="middle" />
      <Typography
        sx={{ fontFamily: "'Andada Pro', serif", fontWeight: "bold" }}
        component="h6"
        variant="h6"
        color="black"
        gutterBottom
      >
        Reports
      </Typography>

      <Box sx={{ height: 250, border: 1, borderColor: "#d6d6d6" }}>
        {ReportOptions.map((report) => {
          return (
            <Boop rotation={20} timing={200}>
              <Button
                variant="contained"
                sx={{
                  m: 4,
                  width: 150,
                  height: 60,
                }}
                style={{
                  borderRadius: 25,
                  backgroundColor: report.color,
                }}
                onClick={() => {
                  props.setIndex(report.index);
                  props.setAppBarStatus("Reports");
                }}
              >
                {report.name}
              </Button>
            </Boop>
          );
        })}
      </Box>
      <Divider sx={{ m: 2 }} variant="middle" />
      <Typography
        sx={{ fontFamily: "'Andada Pro', serif", fontWeight: "bold" }}
        component="h6"
        variant="h6"
        color="black"
        gutterBottom
      >
        Recomended /videos(Junior/Senior)
      </Typography>
    </>
  );
};

export default DashboardHome;
