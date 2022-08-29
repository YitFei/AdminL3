import * as React from "react";
import {
  DataGrid,
  GridApi,
  gridClasses,
  GridToolbar,
  GridCellValue,
} from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import TocIcon from "@mui/icons-material/Toc";
import API from "../../API";
import { KeyboardReturnOutlined } from "@mui/icons-material";
import TodayIcon from "@mui/icons-material/Today";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import Boop from ".././_General/IconRotateAnim";
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
import MonthlyUserDetailReportDialog from "./MonthlyUserDetailReportDialog";
import { alpha, styled } from "@mui/material/styles";
const ODD_OPACITY = 0.2;

export default function MonthlyUserDetailReport() {
  let URL_GetAllCourseList = "/course/admin/list";
  let URL_GetTeacherInfo = "/teacher/get/";
  const [courseList, setCourseList] = React.useState([]);
  const [openDialog, setOpenDialog] = React.useState([]);
  const [selectedId, setSelectedId] = React.useState([]);
  const [currentMonth, setCurrentMonth] = React.useState(new Date());
  const [teacherInfo, setTeacherInfo] = React.useState();
  const [currentCourse, setCurrentCourse] = React.useState();

  const changeMonthHandle = (btnType) => {
    if (btnType === "prev") {
      setCurrentMonth(subMonths(currentMonth, 1));
    }
    if (btnType === "next") {
      setCurrentMonth(addMonths(currentMonth, 1));
    }
  };

  const courseColumn = [
    { field: "courseName", headerName: "课程名字", width: 200, flex: 1 },
    {
      field: "teacherName",
      headerName: "教师名字",
      width: 200,
      flex: 1,
    },

    {
      field: "action",
      headerName: "查看",
      sortable: false,
      width: 100,
      flex: 0.3,
      renderCell: (cellValue) => {
        const onClick = (e) => {
          e.stopPropagation(); // don't select this row after clicking
          setSelectedId(cellValue.id);
          setOpenDialog(true);
        };

        return (
          <Button fullWidth sx={{ height: 1 }} onClick={onClick}>
            <TocIcon></TocIcon>
          </Button>
        );
      },
    },
  ];

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
              上个月
            </div>
          </Boop>
        </div>

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
              下个月
              <NavigateNextIcon />
            </div>
          </Boop>
        </div>
      </div>
    );
  };

  React.useEffect(() => {
    API("get", URL_GetAllCourseList, localStorage.getItem("token")).then(
      (res) => {
        let data = res.data;
        setCourseList([]);
        data = data
          .filter((d) => {
            let startDate = d.startDate;
            var getDate = new Date(startDate);
            let getMonth = getDate.getUTCMonth() + 1;
            let getFilterMonth = currentMonth.getUTCMonth();

            return getMonth === getFilterMonth;
          })
          .map((courseInfo, index) => {
            if (courseInfo.teacherId === "") return courseInfo;

            let getData = GetTeacherName(courseInfo);

            getData.then((d) => {
              setCourseList((prev) => [...prev, d]);
            });

            return courseInfo;
          });
      }
    );
  }, [currentMonth]);

  async function GetTeacherName(courseInfo) {
    let teacherInfo = await Promise.resolve(
      API(
        "get",
        URL_GetTeacherInfo + courseInfo.teacherId,
        localStorage.getItem("token")
      ).then((res) => {
        return res.data;
      })
    );

    return { ...courseInfo, teacherName: teacherInfo.name };
  }

  return (
    <div border={1} style={{ height: 600, width: "100%" }}>
      {courseList
        .filter((course) => course.id === selectedId)
        .map((data) => {
          return (
            <MonthlyUserDetailReportDialog
              setOpenDialog={setOpenDialog}
              openDialog={openDialog}
              data={data}
            />
          );
        })}

      <div style={{ marginBottom: "1%" }}>{renderHeader()}</div>

      <StripedDataGrid
        sx={{ border: 0, borderColor: "#4da0e3", boxShadow: 5 }}
        components={{ Toolbar: GridToolbar }}
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
        }
        rows={courseList}
        rowHeight={50}
        columns={courseColumn}
        pageSize={100}
        rowsPerPageOptions={[5]}
      />
    </div>
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
