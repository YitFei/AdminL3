import { LocalGasStation } from "@mui/icons-material";
import React from "react";
import { API_URL } from "./_URL";

var axios = require("axios");

export default async function API(method, path, token, data, debug = false) {
  if (debug) {
    console.log(path);
  }

  try {
    let res = await axios({
      method: method,
      // url: API_URL + path,
      url: "https://api.l3education.com.my" + path,
      headers: {
        Authorization: "Bearer " + token,
      },
      data: data,
    });

    if (res.status == 200) {
      // test for status you want, etc
      if (debug) {
        console.log(res.status);
      }
    }
    // Don't forget to return something
    return res.data;
  } catch (err) {
    console.error(err);
  }
}

export async function APIByQuery(method, path, token, data, debug = false) {
  if (debug) {
    console.log(path);
  }

  try {
    let res = await axios({
      method: method,
      // url: API_URL + path,
      url: "https://api.l3education.com.my" + path,
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "text/plain",
      },
      data: data,
    });

    if (res.status == 200) {
      // test for status you want, etc
      if (debug) {
        console.log(res.status);
      }
    }
    // Don't forget to return something
    return res.data;
  } catch (err) {
    console.error(err);
  }
}

export async function KeycloakAPI(data) {
  try {
    let res = await axios({
      method: "Post",

      url: "https://auth.l3education.com.my/auth/admin/realms/l3-education/users",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      data: data,
    });

    return res.data;
  } catch (err) {
    console.error(err);
  }
}
