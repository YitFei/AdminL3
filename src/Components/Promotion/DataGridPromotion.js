import React from "react";
import { APIByQuery } from "../../API";
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
import PromotionDialog from "./PromotionDialog.jsx";
import Datatable from "../../Datatable";
import ConfirmDialog from "../_General/ConfirmDialog";
import { string } from "prop-types";
import DropDownMenu from "./DropDownMenu";

const ODD_OPACITY = 0.2;

var defaultData = {
  allow_on_course: [],
  code: "",
  discount_amount: 0,
  valid_from: "2022-08-01",
  valid_until: "2022-08-31",
};

export default function DataGridPromotion(props) {
  const [promotionList, setPromotionList] = React.useState([]);
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
  const [courseList, setCourseList] = React.useState([]);

  React.useEffect(() => {
    Datatable("t_promotion_code").then((res) => {
      console.log(res);
      setPromotionList(res);
    });
    Datatable("t_promotion_code_restriction").then((res) => {
      setCourseList(res);
    });
  }, [alert]);

  const filterData = (query, data) => {
    if (!query) {
      return data;
    } else {
      return data.filter((d) => d.code.toLowerCase().includes(query));
    }
  };

  const dataFiltered = filterData(query, promotionList);

  const columns = [
    { field: "id", headerName: "ID", width: 150, hide: true },
    {
      field: "code",
      headerName: "Promotion Code",
      maxWidth: 250,
      flex: 1,
    },
    {
      field: "discount_amount",
      headerName: "Discount Amount",
      width: 250,
    },

    {
      field: "ex",
      headerName: "Date Valid",
      width: 300,

      renderCell: (cellValue) => {
        return (
          <div>
            <Typography variant="body2">
              From Date: <strong>{cellValue.row.valid_from}</strong>
            </Typography>

            <Typography variant="body2">
              Until Date: <strong>{cellValue.row.valid_until}</strong>
            </Typography>
          </div>
        );
      },
    },

    {
      field: "courseList",
      headerName: "Course List",
      minWidth: 150,

      renderCell: (cellValue) => {
        const onHover = (e) => {
          e.stopPropagation(); // don't select this row after hover
        };

        let currentSubscrioption = courseList.filter((data) => {
          return data.promotion_code_id === cellValue.row.id;
        });
        console.log(currentSubscrioption);
        return (
          <DropDownMenu
            onHover={onHover}
            currentSubscrioption={currentSubscrioption}
          />
        );
      },
    },
    {
      field: "delete",
      headerName: "Delete",
      sortable: false,
      minWidth: 80,
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

    // API("Delete", "/announcement/delete/" + selectedRow.id, props.token).then(
    //   (res) => {
    //     setAlertInfo({
    //       severity: res.status === 200 ? "success" : "error",
    //       message:
    //         res.status === 200
    //           ? `Remove Promotion Success!`
    //           : `"Delete Promotion Failed!"`,
    //     });
    //     setAlert(true);
    //     setConfirm(false);
    //   }
    // );
  }, [confirm]);

  return (
    <div>
      <Alert setAlert={setAlert} alert={alert} alertInfo={alertInfo} />

      <PromotionDialog
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
            Promotion Listing
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
              rowHeight={100}
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
