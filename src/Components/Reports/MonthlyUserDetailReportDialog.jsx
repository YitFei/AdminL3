import Grid from "@mui/material/Grid";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import SchoolIcon from "@mui/icons-material/School";
import CloseIcon from "@mui/icons-material/Close";
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
import * as React from "react";
import API from "../../API";
import { GetSingleProperTime } from "../_General/GetProperTime";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import Paper from "@mui/material/Paper";
import {
  DataGrid,
  gridClasses,
  GridApi,
  GridCellValue,
} from "@mui/x-data-grid";
import { alpha, styled } from "@mui/material/styles";
import { MultiDatatable } from "../../Datatable";
import StarIcon from "@mui/icons-material/Star";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";

const ODD_OPACITY = 0.2;

export default function MonthlyUserDetailReportDialog(props) {
  let URL_GetTeacherAttendanceByCourseId =
    "/attendance/admin/getTeacherAttendanceByCourseId/";

  let URL_GetAllSubcriptionStudent = "/courseSubscription/admin/list/";
  let URL_GetStudentAttendance =
    "/attendance/admin/getStudentAttendanceByCourseId/";

  const [teacherAttendance, setTeacherAttendance] = React.useState([]);
  const [studentAttendance, setStusdentAttendance] = React.useState([]);
  const [attendanceDetail, setAttendanceDetail] = React.useState([]);
  const [studentList, setStudentList] = React.useState([]);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    backgroundColor: "#fff",
  }));

  React.useEffect(() => {
    //props.data.id === course ID
    API(
      "get",
      URL_GetTeacherAttendanceByCourseId + props.data.id,
      localStorage.getItem("token")
    ).then((res) => {
      setTeacherAttendance(res.data === null ? [] : res.data);
    });
    API(
      "get",
      URL_GetAllSubcriptionStudent + props.data.id,
      localStorage.getItem("token")
    ).then((res) => {
      setStudentList(res.data);
    });
    MultiDatatable(
      `
    Select a.student_id as id, b.name, b.email from l3education.t_attendance a
    left join l3education.t_student b
    on a.student_id = b.id
    where  a.attend = "Y" and a.is_del ="N"  and a.course_id = '${props.data.id}'
    group by  a.student_id, b.name, b.email`,
      ["id", "name", "email"]
    ).then((res) => {
      setStusdentAttendance(res);
    });
    MultiDatatable(
      `select a.id,a.student_id, b.name,b.email, a.timetable_id, a.course_id, a.create_at as attendTime from l3education.t_attendance a left join l3education.t_student b on a.student_id = b.id where  a.attend = 'Y' and a.is_del ='N'  and course_id = '${props.data.id}' `,
      [
        "id",
        "student_id",
        "name",
        "email",
        "timetable_id",
        "course_id",
        "attendTime",
      ]
    ).then((res) => {
      setAttendanceDetail(res);
    });
  }, [props.openDialog]);
  const columns = [
    { field: "name", headerName: "学生名字", width: 200 },
    { field: "email", headerName: "Email", width: 200 },

    {
      field: "action",
      headerName: "详情",
      sortable: false,
      width: 100,
      flex: 0.3,
      renderCell: (cellValue) => {
        return (
          <Stack direction="row" spacing={1}>
            {attendanceDetail
              .filter((f) => f.student_id === cellValue.row.id)
              .map((d) => {
                return (
                  <Tooltip title={d.attendTime}>
                    <StarIcon
                      sx={{
                        color: "#34eb8f",
                        ":hover": {
                          cursor: "pointer",
                        },
                      }}
                    >
                      {" "}
                    </StarIcon>
                  </Tooltip>
                );
              })}
          </Stack>
        );
      },
    },
  ];
  const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;

    return (
      <DialogTitle
        sx={{
          marginLeft: 5,
          marginRight: 5,
          marginBottom: 5,
          p: 2,
          borderBottom: 0,
        }}
        {...other}
      >
        {/* 课程月报表 */}
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
    );
  };

  const handleClose = () => {
    props.setOpenDialog(false);
  };

  function getDayOfWeek() {
    let result = [];

    var startDate = new Date(props.data.startDate);
    let startDay = startDate.getDate();
    var endDate = new Date(props.data.endDate);
    let endDay = endDate.getDate();

    for (let i = startDay - 1; i <= endDay - 1; i++) {
      let currentDate = addDays(startDate, i);
      if (currentDate.getDay() !== props.data.dayOfWeek) continue;
      result.push(format(currentDate, "dd/MM"));
      // result += format(currentDate, "dd/MM") + ", ";
    }

    return result;
  }

  function getClassCount() {
    let result = [];

    var startDate = new Date(props.data.startDate);
    let startDay = startDate.getDate();
    var endDate = new Date(props.data.endDate);
    let endDay = endDate.getDate();

    for (let i = startDay - 1; i <= endDay - 1; i++) {
      let currentDate = addDays(startDate, i);
      if (currentDate.getDay() !== props.data.dayOfWeek) continue;

      result = [...result, format(currentDate, "dd/MM")];
    }
    // console.log(result);
    return result.length;
  }
  function getFormatDateTime(datetime, formatPattern) {
    return format(new Date(datetime), formatPattern);
  }

  return (
    <Dialog
      open={props.openDialog}
      onClose={handleClose}
      fullScreen
      PaperProps={{
        sx: {
          width: "60%",
          border: 1,
          borderRadius: 5,
          maheight: "fit-content",
          maxHeight: "95vh",
          overflow: "auto",
        },
      }}
    >
      <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
        <Typography align={"center"} variant={"h4"}>
          {" "}
          {props.data.courseName}
        </Typography>
      </BootstrapDialogTitle>

      <DialogContent>
        <Grid container xs={12} sx={{ border: 0 }} spacing={{ xs: 2 }}>
          <Grid item fullWitdh xs={12} sx={{ mb: 0.5 }}>
            {" "}
            <Grid container direction="row" alignItems="center">
              <Grid item sx={{ border: 0, width: 100 }}>
                授课老师 ：
              </Grid>
              <Grid item sx={{ border: 0, width: 400 }}>
                {props.data.teacherName}
              </Grid>
            </Grid>
            <Grid item fullWidth xs={12} sx={{ mb: 0.5 }}>
              <Grid container direction="row" alignItems="center">
                <Grid item sx={{ border: 0, width: 100 }}>
                  上课日期 ：
                </Grid>
                <Grid item sx={{ border: 0, width: 400 }}>
                  星期{props.data.dayOfWeek}
                </Grid>
              </Grid>
            </Grid>
            <Grid item fullWidth xs={12} sx={{ mb: 0.8 }}>
              <Grid container direction="row" alignItems="center">
                <Grid item sx={{ border: 0, width: 100 }}>
                  上课时间 ：
                </Grid>
                <Grid item sx={{ border: 0, width: 400 }}>
                  {GetSingleProperTime(props.data.startTime)} -{" "}
                  {GetSingleProperTime(props.data.endTime)}
                </Grid>
              </Grid>
            </Grid>
            <Grid item fullWidth xs={12} sx={{ mb: 0.5 }}>
              <Grid container direction="row" alignItems="center">
                <Grid item sx={{ border: 0, width: 120 }}>
                  本月上课日期 ：
                </Grid>
                <Grid
                  item
                  sx={{
                    width: 400,
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  {getDayOfWeek().map((date) => {
                    return (
                      <Item
                        m={2}
                        sx={{
                          minWidth: 65,
                          mr: 2,
                          fontFamily: "'Advent Pro'",
                          border: "1px solid #A0A0A0",
                        }}
                      >
                        {date}
                      </Item>
                    );
                  })}
                </Grid>
              </Grid>
            </Grid>
            {/* <Grid item fullWidth xs={12} sx={{ mb: 0.5 }}>
              <Grid container direction="row" alignItems="center">
                <Grid item sx={{ border: 0, width: 120 }}>
                  签到 ：
                </Grid>
                <Grid
                  item
                  sx={{
                    width: 400,
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  {teacherAttendance
                    // .filter((r) => r.finish === "Y")
                    .map((r) => {
                      return (
                        <Item
                          m={2}
                          sx={{
                            minWidth: 65,
                            mr: 2,
                            fontFamily: "'Advent Pro'",
                            border: "1px solid #A0A0A0",
                            clear: "both",
                            display: "inline-block",

                            whiteSpace: "nowrap",
                          }}
                        >
                          {GetSingleProperTime(r.startTime)}
                        </Item>
                      );
                    })}
                </Grid>
              </Grid>
            </Grid> */}
            <Grid item fullWidth xs={12} sx={{ mb: 0.8 }}>
              <Grid container direction="row" alignItems="center">
                <Grid item sx={{ border: 0, width: 120 }}>
                  签退 ：
                </Grid>
                <Grid
                  item
                  sx={{
                    width: 400,
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  {teacherAttendance
                    // .filter((r) => r.finish === "Y")
                    .map((r) => {
                      return (
                        <Item
                          m={2}
                          sx={{
                            minWidth: 65,
                            mr: 2,
                            fontFamily: "'Advent Pro'",
                            border: "1px solid #A0A0A0",
                            clear: "both",
                            display: "inline-block",

                            whiteSpace: "nowrap",
                          }}
                        >
                          {GetSingleProperTime(r.endTime)}
                        </Item>
                      );
                    })}
                </Grid>
              </Grid>
            </Grid>
            <Grid item fullWidth xs={12} sx={{ mb: 0.5 }}>
              <Grid container direction="row" alignItems="center">
                <Grid item sx={{ border: 0, width: 120 }}>
                  学生签到情况 ：
                </Grid>
                <Grid item sx={{ border: 0, width: 600, height: 400, mt: 2 }}>
                  <StripedDataGrid
                    sx={{ border: 0, borderColor: "#4da0e3", boxShadow: 5 }}
                    getRowClassName={(params) =>
                      params.indexRelativeToCurrentPage % 2 === 0
                        ? "even"
                        : "odd"
                    }
                    rowHeight={50}
                    pageSize={100}
                    columns={columns}
                    rows={studentAttendance}
                    rowsPerPageOptions={[100]}
                  ></StripedDataGrid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions></DialogActions>
    </Dialog>
  );
}

const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
  [`& .${gridClasses.row}.even`]: {
    backgroundColor: "#fff3d1", //theme.palette.grey[200],
    "&:hover, &.Mui-hovered": {
      backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
      "@media (hover: none)": {
        backgroundColor: "transparent",
      },
    },
    "&.Mui-selected": {
      backgroundColor: alpha(
        theme.palette.primary.main,
        ODD_OPACITY + theme.palette.action.selectedOpacity
      ),
      "&:hover, &.Mui-hovered": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          ODD_OPACITY +
            theme.palette.action.selectedOpacity +
            theme.palette.action.hoverOpacity
        ),
        // Reset on touch devices, it doesn't add specificity
        "@media (hover: none)": {
          backgroundColor: alpha(
            theme.palette.primary.main,
            ODD_OPACITY + theme.palette.action.selectedOpacity
          ),
        },
      },
    },
  },
}));
