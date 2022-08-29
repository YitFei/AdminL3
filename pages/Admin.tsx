import { NextPage } from "next";
import { Layout } from "../components/Layout";
import { useKeycloakContext, useServerContext } from "../utils/context";
import React, { useState, useEffect } from "react";
import Dashboard from "../src/Dashboard/Dashboard.js";
import { Main_URL } from "../src/_URL.js";

const ProfilePage: NextPage = () => {
  const { keycloak, keycloakInitialized } = useKeycloakContext();
  const { isServer, isAuthenticated, setIsAuthenticated } = useServerContext();
  const parsedToken: any = keycloak.tokenParsed;

  useEffect(() => {
    const isKeycloakAuthenticated = keycloak.authenticated ? "true" : "false";
    if (keycloakInitialized && isKeycloakAuthenticated !== isAuthenticated) {
      setIsAuthenticated(isKeycloakAuthenticated);
    }
  }, []);

  useEffect(() => {
    window.location.href = keycloak.createLoginUrl({
      redirectUri: Main_URL + "/Main",
    });
  }, []);

  return <div></div>;
};

export default ProfilePage;
