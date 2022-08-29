import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

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
import Checkbox from "@mui/material/Checkbox";
import MultiSelectionList from "./MultiSelectionList";
import InputLabel from "@mui/material/InputLabel";

const options = ["Option 1", "Option 2"];

export default function EditDataCard({ isEdit, item, data, setData, token }) {
  const [enable, setEnable] = React.useState(true);
  const [value, setValue] = React.useState(data[item.fieldName]);
  const [courseList, setCourseList] = React.useState([]);

  React.useEffect(() => {
    // if (!isEdit) {
    //   setEnable(true);
    // }
  }, [isEdit]);

  React.useEffect(() => {
    if (item.fieldName === "allow_on_course") {
      API("get", "/course/admin/list", token).then((response) => {
        setCourseList(response.data);
      });
    }
  }, []);

  var uiControl;

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
    // if (!Array.isArray(item.fieldName)) {
    //   if (item.fieldName === "teacherId") {
    //     return optionTeacherList.find((teacher) => {
    //       return teacher.id === data[fieldName];
    //     });
    //   }
    //   return value;
    // } else {
    //   return data[getFieldName(fieldName)];
    // }
    return data[item.fieldName];
  }

  const handleChange = (event, fieldName) => {
    setData((p) => ({
      ...p,
      [fieldName]: event.target.value,
    }));

    setValue(event.target.value);
  };

  const handleOnEditClick = () => {
    setEnable(true);
  };

  let inputField = null;
  if (item.fieldName === "validDate") {
    inputField = (
      <Grid container xs={12}>
        <Grid item xs={5}>
          <TextField
            sx={{
              backgroundColor: enable ? enableColor : disableColor,
              "& legend": { display: "none" },
              "& fieldset": { top: 0 },
            }}
            fullWidth
            type={item.inputType}
            value={valueData("valid_from")}
            onChange={(e) => handleChange(e, "valid_from")}
            disabled={!enable}
          />
        </Grid>
        <Grid item xs={2}>
          <Typography sx={{ marginTop: 2 }} align="center">
            {" "}
            to{" "}
          </Typography>
        </Grid>
        <Grid item xs={5}>
          <TextField
            sx={{
              backgroundColor: enable ? enableColor : disableColor,
              "& legend": { display: "none" },
              "& fieldset": { top: 0 },
            }}
            fullWidth
            type={item.inputType}
            value={valueData("valid_until")}
            onChange={(e) => handleChange(e, "valid_until")}
            disabled={!enable}
          />
        </Grid>
      </Grid>
    );
  } else {
    if (item.fieldName !== "allow_on_course") {
      inputField = (
        <TextField
          variant="outlined"
          sx={{
            backgroundColor: enable ? enableColor : disableColor,
            "& legend": { display: "none" },
            "& fieldset": { top: 0 },
          }}
          fullWidth
          id={item.inputType}
          type={item.inputType}
          value={valueData(item.fieldName)}
          onChange={(e) => handleChange(e, item.fieldName)}
          disabled={!enable}
        />
      );
    } else {
      inputField = (
        <MultiSelectionList
          sx={{ width: 1 }}
          courseList={courseList}
          setData={setData}
        />
        //   <Autocomplete
        //     disablePortal
        //     id="combo-box-demo"
        //     isOptionEqualToValue={(option, value) => option.id === value.id}
        //     onChange={(_, newValue) => {
        //       setData((p) => ({
        //         ...p,
        //         teacherId: newValue === null ? null : newValue.id,
        //       }));
        //       // setTeacherValue(newValue);
        //     }}
        //     options={courseList}
        //     getOptionLabel={(option) => option.name}
        //     renderOption={(props, option) => (
        //       <li {...props} key={option.id}>
        //         <Box
        //           sx={{
        //             flexGrow: 1,
        //             borderBottom: 1,
        //           }}
        //         >
        //           <Grid container xs={12}>
        //             <Grid item xs={2}>
        //               <Checkbox> </Checkbox>
        //             </Grid>
        //             <Grid item xs={10}>
        //               <Typography variant="subtitle1">
        //                 {option.courseName}
        //               </Typography>
        //               <Typography variant="body2" color="text.secondary">
        //                 {option.description}
        //               </Typography>
        //             </Grid>
        //           </Grid>
        //         </Box>
        //       </li>
        //     )}
        //     sx={{
        //       marginLeft: "5%",
        //       marginRight: "5%",
        //       width: "90%",
        //       backgroundColor: enable ? enableColor : disableColor,
        //     }}
        //     renderInput={(params) => <TextField {...params} disabled={!enable} />}
        //   />
      );
    }
  }
  console.log(data);
  return (
    <Grid key={item.fieldName} fullWidth fullHeight sx={{ boxShadow: 0 }}>
      {/* <Card sx={{ minWidth: 10, border: 0 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            <Grid sx={{ marginTop: "2%" }}>
              <Typography align="center">{item.displayName}</Typography>
            </Grid>
            <Grid sx={{ marginTop: "2%" }}> {inputField}</Grid>
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

      <Grid container direction="row" alignItems="center">
        <Grid item sx={{ border: 0, width: 150 }}>
          {item.displayName}:
        </Grid>
        <Grid item sx={{ border: 0, width: 400 }}>
          {" "}
          {inputField}
        </Grid>
      </Grid>
    </Grid>
  );
}
