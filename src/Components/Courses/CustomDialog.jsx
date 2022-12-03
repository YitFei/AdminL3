import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import * as React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import SchoolIcon from "@mui/icons-material/School";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import BookAnimation from "./BookAnimation";
import CourseCard from "./CourseCard";
import API from "../../API.js";
const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle
      sx={{
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 2,
        p: 2,
        borderBottom: 0,
      }}
      {...other}
    >
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

const shape = {
  color: "white",
  backgroundColor: "DodgerBlue",
  padding: "10px",
  fontFamily: "Arial",
};

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
  tag: "",
};

export default function CustomDialog(props) {
  const handleClose = (action) => {
    let responseResult = false;

    console.log(props.data);
    if (action === "Confirm") {
      if (props.isEdit) {
        let updateData = {
          courseActive: props.data.courseActive,
          courseCost: props.data.courseCost,
          courseName: props.data.courseName,
          dayOfWeek: props.data.dayOfWeek,
          description: props.data.description,
          endDate: props.data.endDate,
          endTime: props.data.timetableCreateVM.endTime,
          startDate: props.data.startDate,
          startTime: props.data.timetableCreateVM.startTime,
          teacherId: props.data.teacherId,
          tag: props.data.tag,
        };

        responseResult = API(
          "Put",
          "/course/updateAdvance/" + props.data.timetableCreateVM.courseId,
          props.token,
          updateData
        ).then((res) => {
          return res.status === 200;
        });
      } else {
        responseResult = API(
          "Post",
          "/course/create",
          props.token,
          props.data
        ).then((res) => {
          return res.status === 200;
        });
      }
      props.setAlertInfo({
        severity: responseResult ? "success" : "error",
        message: responseResult
          ? `${props.isEdit ? "Update" : "Create"} Course Success!`
          : `"${props.isEdit ? "Update" : "Create"} Course Failed!"`,
      });
      props.setAlert(true);
    }
    props.setData(defaultData);
    props.setOpenDialog(false);
  };

  return (
    <Dialog
      open={props.openDialog}
      onClose={handleClose}
      fullScreen
      PaperProps={{
        sx: {
          width: "60%",
          height: "80%",
          border: 1,
          borderRadius: 5,
          maheight: "fit-content",
          maxHeight: "95vh",
          overflow: "auto",
        },
      }}
    >
      <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
        <strong
          style={{
            display: "flex",
            justifyContent: "center",

            borderRadius: 10,
            borderBottom: "1",
          }}
        >
          {props.isEdit ? "Edit Course Setting" : "Create Course"}
        </strong>
      </BootstrapDialogTitle>
      <DialogContent>
        <Grid container>
          <Grid item xs={12} sx={{ border: 0 }}>
            {" "}
            <CourseCard
              token={props.token}
              isEdit={props.isEdit}
              data={props.data}
              setData={props.setData}
            />
          </Grid>
        </Grid>
      </DialogContent>
     { props.isEdit == false  && <DialogActions>
        <Button onClick={() => handleClose("Confirm")}>
          <Typography sx={{ color: "red" }}>确认</Typography>
        </Button>
        <Button onClick={() => handleClose("")}>取消</Button>
      </DialogActions>}
    </Dialog>
  );
}
