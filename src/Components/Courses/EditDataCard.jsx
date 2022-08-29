import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import DayOfWeekPicker from "./DayOfWeekPicker";
import TextField from "@mui/material/TextField";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import * as React from "react";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Autocomplete from "@mui/material/Autocomplete";
import { SliderValueLabelUnstyled } from "@mui/base";
import API from "../../API.js";

const options = ["Option 1", "Option 2"];

export default function EditDataCard({ isEdit, item, data, setData, token }) {
  const [optionTeacherList, setOptionTeacherList] = React.useState([]);
  const [enable, setEnable] = React.useState(true);
  const [value, setValue] = React.useState(data[item.fieldName]);

  const defaultTeacherValue = {
    id: "008da73a-e174-4b52-be3c-3d4e75719d70",
    name: "Chan Yit Fei",
    email: "yifei970309@gmail.com",
    cognitoId: "008da73a-e174-4b52-be3c-3d4e75719d70",
    description: "teacher",
    age: 18,
    dob: "1998-12-31",
    active: "Y",
    isDel: "N",
    createBy: "008da73a-e174-4b52-be3c-3d4e75719d70",
    createAt: "2022-08-11T20:05:38.000+00:00",
    updateBy: "008da73a-e174-4b52-be3c-3d4e75719d70",
    updateAt: "2022-08-11T20:05:38.000+00:00",
  };

  const [teacherValue, setTeacherValue] = React.useState();
  const [defaultValue, setDefaultValue] = React.useState();

  let url_getTeacherList = "/teacher/admin/get/list";

  React.useEffect(() => {
    if (item.fieldName === "teacherId") {
      API("get", url_getTeacherList, token).then((response) => {
        setOptionTeacherList(response.data);
      });
    }
  }, []);
  React.useEffect(() => {
    if (optionTeacherList !== undefined) {
      setTeacherValue(
        optionTeacherList.filter((t) => t.id === data.teacherId)[0]
      );
    }
  }, [optionTeacherList]);

  React.useEffect(() => {
    // if (!isEdit) {
    //   setEnable(true);
    // }
  }, [isEdit]);

  var uiControl;
  var uiTextField;
  var bottomTextField;
  let disableColor = "#c4c1c0";
  let enableColor = { red: 0, green: 0, blue: 0 };

  // to search field name is field name list contain multiple fields
  function getFieldName(fieldName) {
    if (item.fieldName.length === 0) return fieldName;
    return item.fieldName.find((name) => {
      return name === fieldName;
    });
  }

  //get the data by fieldname
  function valueData(fieldName) {
    if (!Array.isArray(item.fieldName)) {
      if (item.fieldName === "teacherId") {
        return optionTeacherList.find((teacher) => {
          return teacher.id === data[fieldName];
        });
      }
      return value;
    } else {
      if (fieldName === "startTime") {
        return data.timetableCreateVM.startTime;
      } else if (fieldName === "endTime") {
        return data.timetableCreateVM.endTime;
      } else {
        return data[getFieldName(fieldName)];
      }
    }
  }

  let IsSelectionTextField = item.inputType === "select";
  const handleChange = (event, fieldName) => {
    if (
      fieldName === "courseDate" ||
      fieldName === "startTime" ||
      fieldName === "endTime"
    ) {
      let name = `timetableCreateVM.${fieldName}`;

      setData((p) => ({
        ...p,
        ["timetableCreateVM"]: {
          ["courseDate"]: p["startDate"],
          ["courseId"]: p["timetableCreateVM"]["courseId"],
          ["startTime"]:
            fieldName === "startTime"
              ? event.target.value
              : p["timetableCreateVM"]["startTime"],
          ["endTime"]:
            fieldName === "endTime"
              ? event.target.value
              : p["timetableCreateVM"]["endTime"],
        },
      }));
      setValue(event.target.value);
      // setData((p) => ({ ...p, [name]: event.target.value }));
    } else {
      setData((p) => ({
        ...p,
        [fieldName]: event.target.value,
        ["timetableCreateVM"]: {
          ["courseDate"]:
            fieldName === "startDate" ? event.target.value : p["startDate"],
          ["courseId"]: p["timetableCreateVM"]["courseId"],
          ["startTime"]: p["timetableCreateVM"]["startTime"],
          ["endTime"]: p["timetableCreateVM"]["endTime"],
        },
      }));

      setValue(event.target.value);
    }
  };

  const handleOnEditClick = () => {
    setEnable(true);
  };

  if (item.inputType === "time" && item.fieldName.includes("dayOfWeek")) {
    uiControl = (
      <Grid container sx={{ border: 0 }}>
        <Grid item sx={{ border: 0, width: 150, paddingTop: 3 }}>
          Day Of Week :
        </Grid>
        <Grid item sx={{ border: 0, width: 400, paddingBottom: 2.5 }}>
          <DayOfWeekPicker
            setData={setData}
            defaultValue={valueData("dayOfWeek")}
          />
        </Grid>
      </Grid>
    );
  } else {
    uiControl = null;
  }

  if (IsSelectionTextField) {
    if (item.fieldName !== "teacherId") return;
    uiTextField = (
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        isOptionEqualToValue={(option, value) => option.id === value.id}
        value={teacherValue || null}
        onChange={(_, newValue) => {
          setData((p) => ({
            ...p,
            teacherId: newValue === null ? null : newValue.id,
          }));
          setTeacherValue(newValue);
        }}
        options={optionTeacherList}
        getOptionLabel={(option) => option.name}
        renderOption={(props, option) => (
          <li {...props} key={option.id}>
            <Box
              sx={{
                flexGrow: 1,
                borderBottom: 1,
              }}
            >
              <Typography variant="subtitle1">{option.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {option.description}
              </Typography>
            </Box>
          </li>
        )}
        sx={{
          marginLeft: "5%",
          marginRight: "5%",
          width: "90%",
          backgroundColor: enable ? enableColor : disableColor,
          "& legend": { display: "none" },
          "& fieldset": { top: 0 },
        }}
        renderInput={(params) => <TextField {...params} disabled={!enable} />}
      />
    );
  } else {
    uiTextField =
      (item.inputType !== "time" && item.inputType !== "date") ||
      item.fieldName === "classCancel" ? (
        <TextField
          sx={{
            "& legend": { display: "none" },
            "& fieldset": { top: 0 },
            marginLeft: "5%",
            marginRight: "5%",
            width: "90%",
            backgroundColor: enable ? enableColor : disableColor,
          }}
          id={item.inputType}
          type={item.inputType}
          select={IsSelectionTextField}
          value={valueData()}
          onChange={(e) => handleChange(e, item.fieldName)}
          disabled={!enable}
        ></TextField>
      ) : (
        <Grid container sx={{ marginLeft: 2.5 }} xs={12}>
          <Grid item xs={5}>
            <TextField
              sx={{
                "& legend": { display: "none" },
                "& fieldset": { top: 0 },
                backgroundColor: enable ? enableColor : disableColor,
              }}
              fullWidth
              id={item.inputType}
              type={item.inputType}
              select={IsSelectionTextField}
              value={
                item.isCourseExpired
                  ? valueData("startDate")
                  : valueData("startTime")
                //       value
              }
              onChange={(e) =>
                handleChange(
                  e,
                  item.isCourseExpired ? "startDate" : "startTime"
                )
              }
              disabled={!enable}
            ></TextField>
          </Grid>
          <Grid item xs={2} sx={{ marginTop: "3%", border: 0 }}>
            <Typography align="center">To</Typography>
          </Grid>
          <Grid item xs={5}>
            <TextField
              sx={{
                "& legend": { display: "none" },
                "& fieldset": { top: 0 },
                backgroundColor: enable ? enableColor : disableColor,
              }}
              fullWidth
              id={item.inputType}
              type={item.inputType}
              select={IsSelectionTextField}
              value={
                item.isCourseExpired
                  ? valueData("endDate")
                  : valueData("endTime")
              }
              onChange={(e) =>
                handleChange(e, item.isCourseExpired ? "endDate" : "endTime")
              }
              disabled={!enable}
            ></TextField>
          </Grid>
        </Grid>
      );
  }

  return (
    <Grid key={item.fieldName} fullWidth fullHeight sx={{ boxShadow: 0 }}>
      {/* <Card sx={{ minWidth: 10 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            <Grid sx={{ border: 0 }}>{uiControl}</Grid>

            <Grid sx={{ marginTop: "5%" }}>
              <Typography align="center">{item.displayName}</Typography>
            </Grid>
            <Grid sx={{ marginTop: "5%" }}>{uiTextField}</Grid>
          </Typography>
        </CardContent>
        {isEdit && (
          <CardActions>
            <Button
              sx={{ p: 1, m: 1, mx: "auto" }}
              size="small"
              onClick={handleOnEditClick}
            >
              Edit {item.displayName}
            </Button>
          </CardActions>
        )}
      </Card> */}
      <Grid sx={{ border: 0 }}>{uiControl}</Grid>
      <Grid container direction="row" alignItems="center">
        <Grid item sx={{ border: 0, width: 150 }}>
          {item.displayName}:
        </Grid>
        <Grid item sx={{ border: 0, width: 400 }}>
          {" "}
          {uiTextField}
        </Grid>
      </Grid>
    </Grid>
  );
}
