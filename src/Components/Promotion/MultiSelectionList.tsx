import * as React from "react";
import { Theme, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

export default function MultipleSelectChip({ courseList, setData }) {
  const theme = useTheme();
  const [name, setName] = React.useState<string[]>([]);

  function getStyles(
    name: string,
    personName: readonly string[],
    theme: Theme
  ) {
    return {
      fontWeight:
        courseList.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  const handleChange = (event, child) => {
    const {
      target: { value },
    } = event;

    let id = child.key.slice(2, child.key.length);
    console.log(child.key);
    console.log(id);
    setData((p) => ({
      ...p,
      allow_on_course: [...p.allow_on_course, id],
    }));
    setName(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, marginLeft: -0.5, width: 1 }}>
        <InputLabel id="demo-multiple-chip-label">Course</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={name}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Course" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {courseList.map((course) => (
            <MenuItem
              key={course.id}
              value={course.courseName}
              //  style={getStyles(course.courseName, name, theme)}
            >
              <Grid container xs={12}>
                <Grid item xs={12}>
                  {" "}
                  <Typography variant="subtitle1">
                    {course.courseName}
                  </Typography>
                </Grid>

                <Grid
                  item
                  xs={12}
                  sx={{ borderBottom: 1, borderColor: "#828282" }}
                >
                  {" "}
                  <Typography variant="body2" color="text.secondary">
                    {course.description}
                  </Typography>
                </Grid>
              </Grid>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
