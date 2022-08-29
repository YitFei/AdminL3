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

import InputLabel from "@mui/material/InputLabel";

const options = ["Option 1", "Option 2"];
import Datatable, { MultiDatatable } from "../../Datatable";

export default function EditDataCard({ isEdit, item, data, setData, token }) {
  const [enable, setEnable] = React.useState(true);
  const [value, setValue] = React.useState(data[item.fieldName]);
  const [list, setList] = React.useState([]);

  React.useEffect(() => {
    // if (!isEdit) {
    //   setEnable(true);
    // }
  }, [isEdit]);

  React.useEffect(() => {}, []);

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
    return data[item.fieldName];
  }

  const handleChange = (event, child) => {
    if (item.fieldName === "password") {
      setData((p) => ({
        ...p,
        ["credentials"]: [
          {
            type: "password",
            value: event.target.value,
            temporary: false,
          },
        ],
      }));
    } else {
      setData((p) => ({
        ...p,
        [item.fieldName]: event.target.value,
      }));
    }

    setValue(event.target.value);
  };

  const handleOnEditClick = () => {
    setEnable(true);
  };

  let inputField = null;

  inputField = (
    <TextField
      variant="outlined"
      sx={{
        backgroundColor: enable ? enableColor : disableColor,
        "& legend": { display: "none" },
        "& fieldset": { top: 0 },
      }}
      fullWidth
      id={item.fieldName}
      type={item.inputType}
      value={value}
      onChange={(e, child) => handleChange(e, child)}
      disabled={!enable}
    ></TextField>
  );

  // console.log(data);

  return (
    <Grid key={item.fieldName} fullWidth fullHeight sx={{ boxShadow: 0 }}>
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
