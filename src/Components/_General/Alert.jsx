import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import * as React from "react";
import Slide from "@mui/material/Slide";

export default function CustomAlert(props) {
  const [showAlert, setShowAlert] = React.useState(false);
  //const [interval, setInterval] = React.useState(1500);
  let interval = 1500;
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  React.useEffect(() => {
    if (!props.alert) return;
    setShowAlert(true);
  }, [props.alert]);

  React.useEffect(() => {
    setTimeout(() => {
      if (showAlert) {
        setShowAlert(false);
        props.setAlert(false);
        if (props.setDone !== undefined) {
          props.setDone(true);
        }
      }
    }, interval);
  }, [showAlert]);

  return (
    <Slide direction="up" in={showAlert} mountOnEnter unmountOnExit>
      <Alert
        sx={{ marginBottom: "1%" }}
        onClose={() => {
          setShowAlert(false);
          props.setAlert(false);
        }}
        severity={props.alertInfo.severity}
      >
        <AlertTitle>
          {capitalizeFirstLetter(props.alertInfo.severity)}
        </AlertTitle>
        <strong>{[props.alertInfo.message]}</strong>
      </Alert>
    </Slide>
  );
}
