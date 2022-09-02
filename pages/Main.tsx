import { useState, useEffect } from "react";

import Button from "@mui/material/Button";
// import Link from "../src/Link";
import Dashboard from "../src/Dashboard/Dashboard.js";
import RegisterForm from "../src/RegisterForm.js";
import API from "../src/API.js";
import CustomAlert from "../src/Components/_General/Alert";
import { useKeycloakContext } from "../utils/context";
import { setCookie, getCookie } from "../utils/cookies";
import { Main_URL } from "../src/_URL";
import Link from "@mui/material/Link";

import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import * as React from "react";

function Profile() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [NewUser, setNewUser] = useState(false);
  const [userData, setUserData] = useState(null);
  const [alert, setAlert] = useState(false);
  const [alertInfo, setAlertInfo] = useState({
    severity: "error",
    message: "Current account don't have access rights!",
  });

  const [done, setDone] = useState(false);
  const { keycloak } = useKeycloakContext();
  const [auth, setAuth] = useState(true);

  function newUserState(state) {
    setNewUser(state);
  }

  useEffect(() => {
    if (keycloak.token !== undefined) {
      //console.log(keycloak.realmAccess.roles.includes("admin"));
      if (!keycloak.realmAccess.roles.includes("admin")) {
        setAlert(true);
      } else {
        localStorage.setItem("token", keycloak.token);
      }
    } else {
      // window.location.href = Main_URL + "/Admin";
    }
  }, [keycloak.token]);
  useEffect(() => {
    setTimeout(() => {
      if (!keycloak.authenticated) {
        setAuth(false);
      }
    }, 3000);
  }, []);

  useEffect(() => {
    if (!done) return;
    setCookie("isAuthenticated", "false");
    setDone(false);

    window.location.href = keycloak.createLogoutUrl({
      redirectUri: Main_URL + "/Admin",
    });
  }, [done]);

  return (
    <div>
      <CustomAlert
        interval={5000}
        setAlert={setAlert}
        alert={alert}
        alertInfo={alertInfo}
        setDone={setDone}
      />

      {keycloak.token && keycloak.realmAccess.roles.includes("admin") ? (
        <Dashboard userData={null} token={keycloak.token} />
      ) : !auth ? (
        <div>
          <Alert sx={{ marginBottom: "1%" }} severity={"warning"}>
            <AlertTitle>Warning</AlertTitle>
            <strong>
              {" "}
              User session has been expired.{" "}
              <Link href="/Admin">Please relogin.</Link>
            </strong>
          </Alert>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default Profile;
