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

const options = ["Option 1", "Option 2"];

export default function EditDataCard({ isEdit, item, data, setData, token }) {
  const [enable, setEnable] = React.useState(true);
  const [value, setValue] = React.useState(data[item.fieldName]);

  React.useEffect(() => {
    // if (!isEdit) {
    //   setEnable(true);
    // }
  }, [isEdit]);

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
  function valueData(isDate = false) {
    if (item.fieldName === "showUntil") {
      let ExpiredDateTime = data.showUntil;
      let expiredDate = ExpiredDateTime.slice(0, 10);
      let expiredTime = ExpiredDateTime.slice(11, 16);

      return isDate ? expiredDate : expiredTime;
    }
    //console.log(item.fieldName);
    return data[item.fieldName];
  }
  console.log(data);
  const handleChange = (event, fieldName, isDate = false) => {
    if (fieldName === "showUntil") {
      let ExpiredDateTime = data.showUntil;
      let expiredDate = ExpiredDateTime.slice(0, 10);
      let expiredTime = ExpiredDateTime.slice(11, 19);
      let currentData = event.target.value;

      setData((p) => ({
        ...p,
        [fieldName]: isDate
          ? currentData + " " + expiredTime
          : expiredDate + " " + currentData + ":59",
      }));
    } else {
      setData((p) => ({
        ...p,
        [fieldName]: event.target.value,
      }));
    }

    setValue(event.target.value);
  };

  const handleOnEditClick = () => {
    setEnable(true);
  };

  let InputField = null;
  if (item.fieldName === "imageUrl") {
    InputField = (
      <div>
        <TextField
          sx={{
            marginTop: "6%",
            marginLeft: "5%",
            marginRight: "5%",
            width: "90%",
            backgroundColor: enable ? enableColor : disableColor,
            "& legend": { display: "none" },
            "& fieldset": { top: 0 },
          }}
          id={item.inputType}
          type={item.inputType}
          value={valueData()}
          onChange={(e) => handleChange(e, item.fieldName)}
          disabled={!enable}
        />
        <Box
          component="img"
          sx={{
            marginTop: "5%",
            marginLeft: "5%",
            marginRight: "5%",
            marginBottom: "2%",
            height: 150,
            width: "90%",
          }}
          alt="img"
          src={data["imageUrl"]}
        />
      </div>
    );
  } else {
    InputField = (
      <TextField
        sx={{
          marginLeft: item.fieldName === "showUntil" ? 0 : "5%",
          marginRight: "5%",
          "& legend": { display: "none" },
          "& fieldset": { top: 0 },
          width: "90%",
          backgroundColor: enable ? enableColor : disableColor,
        }}
        id={item.inputType}
        type={item.inputType}
        value={valueData()}
        onChange={(e) => handleChange(e, item.fieldName)}
        disabled={!enable}
        multiline={item.fieldName === "description"}
        rows={4}
        maxRows={8}
      />
    );
  }
  return (
    <Grid key={item.fieldName} fullWidth fullHeight sx={{ boxShadow: 0 }}>
      {/* <Card sx={{ minWidth: 10 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            <Grid sx={{ marginTop: "5%" }}>
              <Typography align="center">{item.displayName}</Typography>
            </Grid>
            {item.fieldName === "showUntil" && (
              <Grid sx={{ border: 0 }}>
                {" "}
                <TextField
                  sx={{
                    marginLeft: "5%",
                    marginRight: "5%",
                    width: "90%",
                    backgroundColor: enable ? enableColor : disableColor,
                  }}
                  id={100}
                  type={"date"}
                  value={valueData(true)}
                  onChange={(e) => handleChange(e, item.fieldName, true)}
                  disabled={!enable}
                />
              </Grid>
            )}
            <Grid sx={{ marginTop: "5%" }}> {InputField}</Grid>
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
        <Grid item sx={{ border: 0, width: 200 }}>
          {item.displayName}:
        </Grid>
        {item.fieldName === "showUntil" && (
          <Grid sx={{ border: 0, width: 400 }}>
            {" "}
            <TextField
              sx={{
                width: "90%",
                marginLeft: "5%",
                marginRight: "5%",
                backgroundColor: enable ? enableColor : disableColor,
                "& legend": { display: "none" },
                "& fieldset": { top: 0 },
              }}
              id={100}
              type={"date"}
              value={valueData(true)}
              onChange={(e) => handleChange(e, item.fieldName, true)}
              disabled={!enable}
            />
          </Grid>
        )}
        <Grid
          item
          sx={{
            border: 0,
            border: 0,
            width: item.fieldName === "showUntil" ? 200 : 400,
          }}
        >
          {" "}
          {InputField}
        </Grid>
      </Grid>
    </Grid>
  );
}
