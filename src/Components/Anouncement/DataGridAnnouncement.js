import React from "react";
import API from "../../API.js";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { alpha, styled } from "@mui/material/styles";
import { DataGrid, gridClasses, GridApi } from "@mui/x-data-grid";

import SearchBar from "../_General/SearchBar";
import Image from "next/image";
import Box from "@mui/material/Box";
import Alert from "../_General/Alert";
import TocIcon from "@mui/icons-material/Toc";
import DeleteIcon from "@mui/icons-material/Delete";
import { GetSingleProperTime } from "../_General/GetProperTime.js";
import AnnouncementDialog from "./AnnouncementDialog.jsx";

import ConfirmDialog from "../_General/ConfirmDialog";
const ODD_OPACITY = 0.2;

var defaultData = {
  description: "",
  isOver: "N",
  showUntil: "2022-05-31 23:59:59",
  title: "",
  imageUrl: "",
};

export default function DataGridAnnouncement(props) {
  const [announcementList, setAnnouncementList] = React.useState([]);
  const [query, setQuery] = React.useState("");
  const [selectedRow, setSelectedRow] = React.useState([]);
  const [action, setAction] = React.useState("");
  const [alert, setAlert] = React.useState(false);
  const [isEdit, setIsEdit] = React.useState(false);
  const [alertInfo, setAlertInfo] = React.useState({
    severity: "success",
    message: "Update Success!",
  });
  const [updateData, setUpdateData] = React.useState([]);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [data, setData] = React.useState(defaultData);

  React.useEffect(() => {
    API("get", "/announcement/getAll", props.token).then((res) => {
      if (res.status === 200 && res.message === "NOT FOUND") {
      } else if (res.status == 200 && res.message === "FOUND") {
        setAnnouncementList(res.data);
      }
    });
  }, [alert]);

  //get action from custom menu and do update logic here
  //active, inactive, upgrade teacher

  async function PostAPI(data) {
    let timetable = await Promise.resolve(
      API("Post", "/student/create", props.token, data).then((res) => {
        if (res.status == 200) {
          console.log("update ok");
          return res.data;
        }
      })
    );
    return timetable;
  }

  const filterData = (query, data) => {
    data = data.map((d) => {
      let expiredDate = d.showUntil.slice(0, 10);
      let expiredTime = GetSingleProperTime(d.showUntil.slice(11, 19));

      let newData = {
        ...d,
        showUntil: expiredDate + " " + expiredTime,
        expiredDate: expiredDate,
        expiredTime: expiredTime,
      };

      return newData;
    });

    if (!query) {
      return data;
    } else {
      return data.filter((d) => d.title.toLowerCase().includes(query));
    }
  };

  const dataFiltered = filterData(query, announcementList);
  const columns = [
    { field: "id", headerName: "ID", width: 150, hide: true },
    {
      field: "imageUrl",
      headerName: "Image",
      minWidth: 250,
      renderCell: (cellValue) => {
        return (
          <Box
            component="img"
            sx={{
              marginLeft: "5%",
              marginRight: "5%",
              marginBottom: "2%",
              height: 150,
              width: "90%",
            }}
            alt="img"
            src={cellValue.row.imageUrl}
          />
        );
        return <img src={cellValue.row.imageUrl} alt="new" />;
      },
    },
    {
      field: "titleA",
      headerName: "Title",
      width: 150,
      renderCell: (cellValue) => {
        return (
          <Typography variant="body1">
            <strong>{cellValue.row.title}</strong>
          </Typography>
        );
      },
    },
    { field: "description", headerName: "Content", minWidth: 200, flex: 1 },
    {
      field: "ex",
      headerName: "Expired Date",
      width: 150,

      renderCell: (cellValue) => {
        return (
          <div>
            <Typography variant="body2">
              Date: <strong>{cellValue.row.expiredDate}</strong>
            </Typography>

            <Typography variant="body2">
              Time: <strong>{cellValue.row.expiredTime}</strong>
            </Typography>
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "Edit/ View",
      sortable: false,
      minWidth: 100,

      renderCell: (cellValue) => {
        const onClick = (e) => {
          e.stopPropagation();

          let row = cellValue.row;

          row = announcementList.filter((r) => r.id === row.id)[0];

          console.log(row);
          setSelectedRow(row);
          setData(row);
          setIsEdit(true);
          setOpenDialog(true);
        };
        return (
          <Button fullWidth sx={{ height: 1 }} onClick={onClick}>
            <TocIcon></TocIcon>
          </Button>
        );
      },
    },

    {
      field: "delete",
      headerName: "Delete",
      sortable: false,
      minWidth: 100,
      flex: 0.2,
      renderCell: (cellValue) => {
        const onClick = (e) => {
          setSelectedRow(cellValue.row);
          setConfirmDialog(true);
        };

        return (
          <Button fullWidth sx={{ height: 1 }} onClick={onClick}>
            <DeleteIcon sx={{ color: "red" }}></DeleteIcon>
          </Button>
        );
      },
    },
  ];
  const [confirmDialog, setConfirmDialog] = React.useState(false);
  const [confirm, setConfirm] = React.useState(false);

  React.useEffect(() => {
    if (!confirm) return;

    API("Delete", "/announcement/delete/" + selectedRow.id, props.token).then(
      (res) => {
        setAlertInfo({
          severity: res.status === 200 ? "success" : "error",
          message:
            res.status === 200
              ? `Remove Announcement Success!`
              : `"Delete Announcement Failed!"`,
        });
        setAlert(true);
        setConfirm(false);
      }
    );
  }, [confirm]);

  return (
    <div>
      <Alert setAlert={setAlert} alert={alert} alertInfo={alertInfo} />

      <AnnouncementDialog
        isEdit={isEdit}
        setOpenDialog={setOpenDialog}
        openDialog={openDialog}
        token={props.token}
        setData={setData}
        data={data}
        setAlert={setAlert}
        setAlertInfo={setAlertInfo}
      />

      <ConfirmDialog
        setConfirmDialog={setConfirmDialog}
        confirmDialog={confirmDialog}
        setConfirm={setConfirm}
      />

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography
            sx={{ fontFamily: "'Andada Pro', serif", fontWeight: "bold" }}
            component="h4"
            variant="h4"
            color="black"
            gutterBottom
          >
            Announcement Listing
          </Typography>
        </Grid>
        <Grid item xs={4} sx={{ border: 0 }}>
          <Box
            display="flex"
            justifyContent="flex-start"
            alignItem="flex-start"
            sx={{}}
          >
            <Button
              sx={{
                marginLeft: "5%",
                backgroundColor: "#f5be18",
                "&:hover": {
                  backgroundColor: "#dea600",
                  boxShadow: "none",
                },
              }}
              variant="contained"
              onClick={() => {
                setIsEdit(false);
                setOpenDialog(true);
              }}
            >
              Create
            </Button>
          </Box>
        </Grid>

        <Grid item xs={6}>
          <SearchBar query={query} setQuery={setQuery} />
        </Grid>
        <Grid item xs={12}>
          <div border={1} style={{ height: 600, width: "100%" }}>
            <StripedDataGrid
              sx={{ border: 0, borderColor: "#4da0e3", boxShadow: 5 }}
              getRowClassName={(params) =>
                params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
              }
              rowHeight={150}
              pageSize={100}
              columns={columns}
              rows={dataFiltered}
              rowsPerPageOptions={[5]}
            />
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
  [`& .${gridClasses.row}.even`]: {
    backgroundColor: "#fff3d1", //theme.palette.grey[200],
    "&:hover, &.Mui-hovered": {
      backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
      "@media (hover: none)": {
        backgroundColor: "transparent",
      },
    },
    "&.Mui-selected": {
      backgroundColor: alpha(
        theme.palette.primary.main,
        ODD_OPACITY + theme.palette.action.selectedOpacity
      ),
      "&:hover, &.Mui-hovered": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          ODD_OPACITY +
            theme.palette.action.selectedOpacity +
            theme.palette.action.hoverOpacity
        ),
        // Reset on touch devices, it doesn't add specificity
        "@media (hover: none)": {
          backgroundColor: alpha(
            theme.palette.primary.main,
            ODD_OPACITY + theme.palette.action.selectedOpacity
          ),
        },
      },
    },
  },
}));
