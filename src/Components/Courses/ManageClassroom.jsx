import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import * as React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import StudentListTable from "./StudentListTable";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const StudentList = [
  {
    value: "Student1",
    label: "Student1",
  },
  {
    value: "Student2",
    label: "Student2",
  },
  {
    value: "Student3",
    label: "Student3",
  },
  {
    value: "Student4",
    label: "Student4",
  },
];

export default function ManageClassroom(props) {
  const handleClose = () => {
    props.setOpenStudentList(false);
  };

  return (
    <Dialog
      open={props.open}
      onClose={handleClose}
      PaperProps={{ sx: { width: "90%", border: 1, height: "80%" } }}
      fullScreen={true}
    >
      <DialogTitle>設置/修改教室设定</DialogTitle>

      <DialogContent>
        <Grid container spacing={{ xs: 2 }} columns={{ xs: 12 }}>
          <Grid item xs={8} sx={{ border: 0, width: 1, marginTop: 5 }}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={StudentList}
              sx={{
                border: 0,
                borderColor: "red",
                marginLeft: "15%",
                boxShadow: 7,
              }}
              renderInput={(params) => <TextField {...params} label="学生" />}
            ></Autocomplete>
          </Grid>
          <Grid
            item
            xs={4}
            sx={{
              border: 0,
              width: 1,
              marginTop: 5,
            }}
          >
            <Button
              sx={{
                marginRight: "4px",
                width: "35%",
                height: 1,
                border: 1,
                boxShadow: 7,
              }}
            >
              添加VIP学生
            </Button>
            <Button
              sx={{
                marginRight: "15%",
                width: "35%",
                height: 1,
                border: 1,
                boxShadow: 7,
              }}
            >
              移除VIP学生
            </Button>
          </Grid>

          <Grid
            item
            xs={10}
            sx={{
              border: 1,
              marginTop: 10,
              marginLeft: "10%",
              marginRight: "10%",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <h2>学生列表</h2>
            </div>
          </Grid>
          <Grid
            item
            xs={10}
            sx={{ border: 1, marginLeft: "10%", marginRight: "10%" }}
          >
            <StudentListTable />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>確認</Button>
        <Button onClick={handleClose}>取消</Button>
      </DialogActions>
    </Dialog>
  );
}
