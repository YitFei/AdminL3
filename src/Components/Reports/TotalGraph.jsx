import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
export default function TotalGraph(props) {
  return (
    <div border={1} style={{ height: 600, width: "100%" }}>
      <Grid container xs={12}>
        <Grid item xs={4} sx={{ border: 1, borderRight: 0 }}>
          <Typography align={"center"}></Typography>
        </Grid>
        <Grid item xs={4} sx={{ border: 1, borderRight: 0 }}>
          <Typography align={"center"}>初中</Typography>
        </Grid>
        <Grid item xs={4} sx={{ border: 1 }}>
          <Typography align={"center"}>高中</Typography>
        </Grid>
      </Grid>
    </div>
  );
}
