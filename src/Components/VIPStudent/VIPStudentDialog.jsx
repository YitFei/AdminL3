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
import API from "../../API.js";
import EditDataCard from "./EditDataCard";

const columns = [
  {
    id: 0,
    fieldName: "cost",
    displayName: "Offer Price",
    inputType: "text",
    xs: 12,
  },

  {
    id: 3,
    fieldName: "courseId",
    displayName: "Course Name",
    inputType: "select",
    xs: 12,
  },

  {
    id: 2,
    fieldName: "userId",
    displayName: "Student",
    inputType: "select",
    xs: 12,
  },
];
var defaultData = {
  cost: 0,
  courseId: "",
  promotionCode: "",
  userId: "",
};

export default function AnnouncementDialog(props) {
  const handleClose = (action) => {
    let responseResult = false;
    let resMsg = "";
    if (action === "Confirm") {
      if (props.isEdit) {
        // let updateData = {
        //   description: props.data.description,
        //   isOver: props.data.isOver,
        //   showUntil: props.data.showUntil,
        //   title: props.data.title,
        //   imageUrl: props.data.imageUrl,
        // };
        // //if fail maybe the image
        // responseResult = API(
        //   "Put",
        //   "/announcement/update/" + props.data.id,
        //   props.token,
        //   updateData,
        //   true
        // ).then((res) => {
        //   console.log(res);
        //   if (res.message.includes("FAILED")) {
        //     props.setAlertInfo({
        //       severity: "error",
        //       message:
        //         "Update Announcement Failed (Please reupload the image)!",
        //     });
        //     props.setAlert(true);
        //     props.setData(defaultData);
        //     props.setOpenDialog(false);
        //     return false;
        //   }
        //   return res.status === 200;
        // });
      } else {
        responseResult = API(
          "Post",
          "/courseSubscription/admin/enrol",
          props.token,
          props.data
        ).then((res) => {
          return res.status === 200;
        });
      }

      props.setAlertInfo({
        severity: responseResult ? "success" : "error",
        message: responseResult
          ? `${props.isEdit ? "Update" : "Create"} VIP Student Success!`
          : `"${props.isEdit ? "Update" : "Create"} VIP Student Failed!"`,
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
          // width: "60%",
          // height: "80%",
          width: 800,
          height: "52%",
          border: 0,
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
          {props.isEdit ? "Edit VIP Student Setting" : "Create VIP Student"}
        </strong>
      </BootstrapDialogTitle>

      <DialogContent>
        <Box
          sx={{
            flexGrow: 1,
            marginTop: 0,
            marginLeft: 2,
            marginRight: 2,
            border: 0,
          }}
        >
          <Grid container xs={12} sx={{ border: 0 }} spacing={{ xs: 2 }} r>
            {columns.map((item, index) => (
              <Grid
                item
                fullWitdh
                sx={{ border: 0, borderColor: "red" }}
                xs={item.xs}
              >
                <EditDataCard
                  key={item.id}
                  isEdit={props.isEdit}
                  item={item}
                  data={props.data}
                  setData={props.setData}
                  token={props.token}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose("Confirm")}>
          <Typography sx={{ color: "red" }}>Confirm</Typography>
        </Button>
        <Button onClick={() => handleClose("")}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}

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
