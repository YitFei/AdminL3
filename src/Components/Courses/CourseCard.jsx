import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import * as React from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import EditDataCard from "./EditDataCard";
import Box from "@mui/material/Box";
import ManageClassroom from "./ManageClassroom";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import API from "../../API.js";
import BookAnimation from "./BookAnimation";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  textAlign: "center",
  borderRadius: 12,
  color: theme.palette.text.secondary,
  marginBottom: 5,
  marginRight: 6,
}));

const columns = [
  {
    id: 0,
    fieldName: "courseName",
    displayName: "Course",
    inputType: "text",
  },
  {
    id: 1,
    fieldName: "description",
    displayName: "Description",
    inputType: "text",
  },

  {
    id: 2,
    fieldName: ["startDate", "endDate"],
    displayName: "Date",
    inputType: "date",
    isCourseExpired: true,
  },
  {
    id: 3,
    fieldName: ["dayOfWeek", "startTime", "endTime"],
    displayName: "Time",
    inputType: "time",
    isCourseExpired: false,
  },
  {
    id: 4,
    fieldName: "teacherId",
    displayName: "Teacher",
    inputType: "select",
  },

  {
    id: 5,
    fieldName: "zoomUrl",
    displayName: "Zoom Link",
    inputType: "text",
  },
  {
    id: 6,
    fieldName: "googleClassroom",
    displayName: "Google Classroom Link",
    inputType: "text",
  },

  {
    id: 7,
    fieldName: "courseCost",
    displayName: "Cost",
    inputType: "text",
  },

  {
    id: 9,
    fieldName: "tag",
    displayName: "Year",
    inputType: "text",
  },
  {
    id: 8,
    fieldName: "classCancel",
    displayName: "Class Cancel",
    inputType: "date",
  },
];

export default function CourseCard(props) {
  const [isEditable, setIsEditable] = React.useState(false);
  const [teacherList, setTeacherList] = React.useState([]);
  const data = props.data;
  // let url_getTeacherList = "/teacher/admin/get/list";

  // React.useEffect(() => {
  //   API("get", url_getTeacherList, props.token).then((response) => {
  //     setTeacherList(response.data);
  //   });
  // }, []);

  const [values, setValues] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  var modifiers = {
    weekend: function (weekday) {
      return weekday == 0 || weekday == 6;
    },
  };

  return (
    <div>
      <Box
        sx={{
          flexGrow: 1,
          marginTop: 5,
          marginLeft: 2,
          marginRight: 2,
          border: 0,
        }}
      >
        <Grid
          container
          spacing={{ xs: 2 }}
          xs={12}
          //  columns={{ xs: 4, sm: 12, md: 12 }}
        >
          {columns.map((item, index) => (
            <Grid item sx={{ border: 0 }} xs={12}>
              <EditDataCard
                key={item.id}
                isEdit={props.isEdit}
                item={item}
                // teacherList={teacherList}
                data={props.data}
                setData={props.setData}
                token={props.token}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
}
