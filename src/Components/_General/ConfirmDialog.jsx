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
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle
      sx={{
        // marginLeft: 5,
        // marginRight: 5,
        marginBottom: 3.5,
        // p: 2,
        borderBottom: 0,
      }}
      {...other}
    >
      <IconButton
        aria-label="close"
        sx={{
          position: "absolute",
          left: 0,
          top: 4,

          color: (theme) => theme.palette.grey[500],
        }}
      >
        <DeleteOutlineIcon fontSize="large" />
      </IconButton>

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

export default function ConfirmDialog(props) {
  const handleClose = (action) => {
    props.setConfirm(action === "Confirm");
    props.setConfirmDialog(false);
  };

  return (
    <Dialog open={props.confirmDialog} onClose={handleClose}>
      <BootstrapDialogTitle
        id="customized-dialog-title"
        onClose={handleClose}
      ></BootstrapDialogTitle>
      <DialogContent>
        <Typography>
          Do you confirm to {props.action || "delete"} this record ?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose("Confirm")}>
          <Typography variant={"body1"} sx={{ color: "red" }}>
            {" "}
            Confirm
          </Typography>
        </Button>
        <Button onClick={() => handleClose("")}>
          <Typography variant={"body1"}> Cancel</Typography>
        </Button>
      </DialogActions>
    </Dialog>
  );
}
