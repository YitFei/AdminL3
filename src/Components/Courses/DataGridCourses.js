import React from "react";
import API from "../../API.js";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { alpha, styled } from "@mui/material/styles";
import {
  DataGrid,
  gridClasses,
  useGridApiRef,
  GridApi,
  GridCellValue,
} from "@mui/x-data-grid";

import ClearIcon from "@mui/icons-material/Clear";
import SearchBar from "../_General/SearchBar";

import Image from "next/image";

import IsActiveIcon from "@mui/icons-material/Done";
import InactiveIcon from "@mui/icons-material/DoNotDisturbAlt";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";

import Box from "@mui/material/Box";
import Alert from "../_General/Alert";
import CustomDialog from "./CustomDialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import BookAnimation from "./BookAnimation.jsx";
import Slide from "@mui/material/Slide";
import PropTypes from "prop-types";
import Popper from "@mui/material/Popper";
import Paper from "@mui/material/Paper";
import { makeStyles, withStyles } from "@material-ui/core";
import TocIcon from "@mui/icons-material/Toc";
import DeleteIcon from "@mui/icons-material/Delete";
import ConfirmDialog from "../_General/ConfirmDialog";
import GetProperDayOfWeek from "../_General/GetProperDayOfWeek";
import GetProperTime from "../_General/GetProperTime";
const ODD_OPACITY = 0.2;

const useStyles = makeStyles((theme) => ({}));
const CustomColor = withStyles({
  root: {
    fontSize: 20,
    background: "-webkit-linear-gradient(45deg, #6b7afe 30%, #FF8E53 90%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    align: "center",
    justifyContent: "center",
    display: "flex",
  },
})(Typography);

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

export default function DataGridCourses(props) {
  const [allCourses, setAllCourses] = React.useState([]);
  const [query, setQuery] = React.useState("");
  const [selectedRow, setSelectedRow] = React.useState([]);
  const [action, setAction] = React.useState("");
  const [alert, setAlert] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [alertInfo, setAlertInfo] = React.useState({
    severity: "success",
    message: "Update Success!",
  });
  const [teacherList, setTeacherList] = React.useState([]);
  const [isEdit, setIsEdit] = React.useState(false);
  console.log("sini token");
  console.log(props.token);
  var defaultData = {
    courseActive: "Y",
    courseCost: 0,
    courseName: "",
    dayOfWeek: 1,
    description: "",
    endDate: "",
    id: "string",
    startDate: "",
    teacherId: "",
    timetableCreateVM: {
      courseDate: "",
      courseId: "string",
      endTime: "00:00",
      startTime: "00:00",
    },
    zoomUrl: "",
    googleClassroom: "",
  };

  const [checked, setChecked] = React.useState(false);
  const [data, setData] = React.useState(defaultData);
  const [confirmDialog, setConfirmDialog] = React.useState(false);
  const [confirm, setConfirm] = React.useState(false);

  React.useEffect(() => {
    if (!confirm) return;

    let updateData = {
      courseActive: "N",
      courseCost: selectedRow.courseCost,
      courseName: selectedRow.courseName,
      dayOfWeek: selectedRow.dayOfWeek,
      description: selectedRow.description,
      endDate: selectedRow.endDate,
      endTime: selectedRow.endTime,
      startDate: selectedRow.startDate,
      startTime: selectedRow.startTime,
      teacherId: selectedRow.teacherId,
    };

    API(
      "Put",
      "/course/updateAdvance/" + selectedRow.id,
      props.token,
      updateData
    ).then((res) => {
      setAlertInfo({
        severity: res.status === 200 ? "success" : "error",
        message:
          res.status === 200
            ? `Remove Course Success!`
            : `"Delete Course Failed!"`,
      });
      setAlert(true);
      setConfirm(false);
    });
  }, [confirm]);

  React.useEffect(() => {
    setAllCourses([]);
    API("get", "/course/admin/list", props.token).then((res) => {
      // console.log(res);
      if (res.status === 200 && res.message === "NOT FOUND") {
        // console.log("not found");
      } else if (res.status == 200 && res.message === "FOUND") {
        let result = res.data;

        result.forEach((course) => {
          let dataFetched = fetechData(course);

          dataFetched.then((r) => {
            let combine = {
              ...course,
              zoomUrl: r.zoomUrl,
              googleClassroom: r.googleClassroom,
            };
            setAllCourses((p) => [...p, combine]);
          });
        });
      }
    });

    API("get", "/teacher/admin/get/list", props.token).then((res) => {
      // console.log(res);
      if (res.status === 200 && res.message === "NOT FOUND") {
        // console.log("not found");
      } else if (res.status == 200 && res.message === "FOUND") {
        // console.log("found");
        setTeacherList(res.data);
      }
    });
  }, [alert]);

  let filterData = (query, data) => {
    data = data.map((course) => {
      let teacherInfo = teacherList.find((t) => t.id === course.teacherId);

      return {
        ...course,
        teacherName: teacherInfo !== undefined ? teacherInfo.name : "",
        teacherDesc: teacherInfo !== undefined ? teacherInfo.description : "",
        teacherEmail: teacherInfo !== undefined ? teacherInfo.email : "",
      };
    });

    data = data.filter((d) => d.courseActive === "Y");
    if (!query) {
      return data;
    } else {
      return data.filter((d) => d.courseName.toLowerCase().includes(query));
    }
  };
  async function fetechData(course, teacherInfo) {
    let result = await Promise.resolve(
      API("get", "/onlineClassroom/get/" + course.id, props.token).then(
        (res) => {
          return res.data;
        }
      )
    );
    return result;
  }

  const dataFiltered = filterData(query, allCourses);
  let Color = ["Blue, Grey, Orange"];

  const columns = [
    { field: "id", headerName: "ID", width: 150, hide: true },

    {
      field: "courseName",
      headerName: "Courses",
      minWidth: 220,
      maxWidth: 220,

      renderCell: (cellValue) => {
        return (
          <BookAnimation
            courseName={cellValue.row.courseName}
            desc={cellValue.row.description}
            color="Blue"
          ></BookAnimation>
        );
      },
    },
    {
      field: "teacher",
      headerName: "Teacher Detail",
      minWidth: 200,

      renderCell: (cellValue) => {
        return (
          <div>
            <Typography variant="body2">
              Name: <strong>{cellValue.row.teacherName}</strong>
            </Typography>

            <Typography variant="body2">
              Email: <strong>{cellValue.row.teacherEmail}</strong>
            </Typography>
          </div>
        );
      },
    },

    {
      field: "courseInfo",
      headerName: "Course Detail",
      minWidth: 200,
      flex: 1,
      renderCell: (cellValue) => {
        const onClick = (e) => {};

        return (
          <div>
            <Typography variant="body2">
              Day of week:{" "}
              <strong>{GetProperDayOfWeek(cellValue.row.dayOfWeek)}</strong>
            </Typography>
            <Typography variant="body2">
              Time:{" "}
              <strong>
                {" "}
                {GetProperTime(
                  cellValue.row.startTime,
                  cellValue.row.endTime
                )}{" "}
              </strong>
            </Typography>
            <Typography variant="body2">
              Course cost: <strong> {cellValue.row.courseCost} </strong>
            </Typography>
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "Edit/ View",
      sortable: false,
      minWidth: 100,

      renderCell: (cellValue) => {
        const onClick = (e) => {
          e.stopPropagation();

          let row = cellValue.row;
          let newData = {
            courseActive: row.courseActive,
            courseCost: row.courseCost,
            courseName: row.courseName,
            dayOfWeek: row.dayOfWeek,
            description: row.description,
            endDate: row.endDate,
            id: row.id,
            startDate: row.startDate,
            teacherId: row.teacherId,
            timetableCreateVM: {
              courseDate: row.startDate,
              courseId: row.id,
              endTime: row.endTime,
              startTime: row.startTime,
            },
            zoomUrl: row.zoomUrl,
            googleClassroom: row.googleClassroom,
          };
          setSelectedRow(cellValue.row);

          setData(newData);
          setIsEdit(true);
          setOpenDialog(true);
        };
        return (
          <Button fullWidth sx={{ height: 1 }} onClick={onClick}>
            <TocIcon></TocIcon>
          </Button>
        );
      },
    },

    {
      field: "delete",
      headerName: "Delete",
      sortable: false,
      minWidth: 100,
      flex: 0.2,
      renderCell: (cellValue) => {
        const onClick = (e) => {
          setSelectedRow(cellValue.row);
          setConfirmDialog(true);
        };

        return (
          <Button fullWidth sx={{ height: 1 }} onClick={onClick}>
            <DeleteIcon sx={{ color: "red" }}></DeleteIcon>
          </Button>
        );
      },
    },
  ];

  return (
    <div>
      <Alert setAlert={setAlert} alert={alert} alertInfo={alertInfo} />
      <CustomDialog
        isEdit={isEdit}
        setOpenDialog={setOpenDialog}
        openDialog={openDialog}
        token={props.token}
        setData={setData}
        data={data}
        setAlert={setAlert}
        setAlertInfo={setAlertInfo}
      />
      <ConfirmDialog
        setConfirmDialog={setConfirmDialog}
        confirmDialog={confirmDialog}
        setConfirm={setConfirm}
      />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography
            sx={{ fontFamily: "'Andada Pro', serif", fontWeight: "bold" }}
            component="h4"
            variant="h4"
            color="black"
            gutterBottom
          >
            Course Listing
          </Typography>
        </Grid>
        <Grid item xs={4} sx={{ border: 0 }}>
          <Box
            display="flex"
            justifyContent="flex-start"
            alignItem="flex-start"
            sx={{}}
          >
            <Button
              sx={{
                marginLeft: "5%",
                backgroundColor: "#f5be18",
                "&:hover": {
                  backgroundColor: "#dea600",
                  boxShadow: "none",
                },
              }}
              variant="contained"
              onClick={() => {
                setIsEdit(false);
                setOpenDialog(!openDialog);
              }}
            >
              Create
            </Button>
          </Box>
        </Grid>

        <Grid item xs={6}>
          <SearchBar query={query} setQuery={setQuery} />
        </Grid>
        <Grid item xs={12}>
          <div border={1} style={{ height: 600, width: "100%" }}>
            <StripedDataGrid
              sx={{ border: 0, borderColor: "#4da0e3", boxShadow: 5 }}
              getRowClassName={(params) =>
                params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
              }
              rowHeight={150}
              pageSize={10}
              columns={columns}
              rows={dataFiltered}
              rowsPerPageOptions={[5]}
            />
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
