import * as React from "react";
import MuiToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ConsoleLogger } from "@aws-amplify/core";

const DAYS = [
  {
    key: 7,
    label: "Sun",
  },
  {
    key: 1,
    label: "Mon",
  },
  {
    key: 2,
    label: "Tues",
  },
  {
    key: 3,
    label: "Wed",
  },
  {
    key: 4,
    label: "Thu",
  },
  {
    key: 5,
    label: "Fri",
  },
  {
    key: 6,
    label: "Sat",
  },
];

const ToggleButton = styled(MuiToggleButton)(() => ({
  "&.Mui-selected, &.Mui-selected:hover": {
    color: "white",
    backgroundColor: "#00abc0",
  },
}));

const theme = createTheme({
  palette: {
    text: {
      primary: "#00ff00",
    },
  },
});

export default function DayOfWeekPicker(props) {
  const [days, setDays] = React.useState(props.defaultValue);

  const handleChange = (event, day) => {
    setDays(day);

    props.setData((p) => ({
      ...p,
      dayOfWeek: day,
    }));
  };

  return (
    <Grid>
      {/* <Typography align="center" sx={{ marginTop: "5%", marginBottom: "5%" }}>
        Day of Week
      </Typography> */}

      <ThemeProvider theme={theme}>
        <ToggleButtonGroup
          arial-label="Days of the week"
          value={days}
          onChange={handleChange}
          exclusive
          sx={{
            marginLeft: "5%",
            marginRight: "5%",
            marginTop: "5%",
            width: "90%",
          }}
          fullWidth
        >
          {DAYS.map((day, index) => (
            <ToggleButton
              key={index}
              value={day.key}
              sx={{ borderColor: "Purple" }}
            >
              {day.label}{" "}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </ThemeProvider>
    </Grid>
  );
}
