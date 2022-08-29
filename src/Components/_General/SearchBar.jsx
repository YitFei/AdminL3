import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha, makeStyles } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import React from "react";
import { PropaneSharp } from "@mui/icons-material";
import TextField from "@mui/material/TextField";
import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";

export default function SearchBar(props) {
  const setQuery = (e) => {
    props.setQuery(e);
  };
  return (
    <TextField
      variant="standard"
      value={props.query}
      onChange={(e) => {
        setQuery(e.target.value);
        // requestSearch(e.target.value);
      }}
      placeholder="Search..."
      InputProps={{
        startAdornment: <SearchIcon fontSize="small" color="action" />,
        endAdornment: (
          <IconButton
            title="Clear"
            aria-label="Clear"
            size="small"
            style={{
              visibility: props.query ? "visible" : "hidden",
              borderRadius: "57%",
              paddingRight: "1px",
              margin: "0",
              fontSize: "1.25rem",
            }}
            onClick={(e) => {
              // setSearchText("");
              setQuery("");
              // setRows(platform);
            }}
          >
            <ClearIcon fontSize="small" color="action" />
          </IconButton>
        ),
      }}
      sx={{
        width: { xs: 1, sm: "auto" },
        m: (theme) => theme.spacing(1, 0.5, 1.5),
        "& .MuiSvgIcon-root": {
          mr: 0.5,
        },
        "& .MuiInput-underline:before": {
          borderBottom: 1,
          borderColor: "divider",
        },
      }}
    />
  );
}
