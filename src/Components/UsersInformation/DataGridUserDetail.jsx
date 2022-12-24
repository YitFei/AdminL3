import React from "react";
import API from "../../API.js";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { alpha, styled } from "@mui/material/styles";
import {
  DataGrid,
  gridClasses,
  GridApi,
  GridCellValue,
} from "@mui/x-data-grid";

import ClearIcon from "@mui/icons-material/Clear";
import SearchBar from "../_General/SearchBar";

import Image from "next/image";
import DropDownMenu from "./DropDownMenu";
import IsActiveIcon from "@mui/icons-material/Done";
import InactiveIcon from "@mui/icons-material/DoNotDisturbAlt";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import CustomMenu from "./CustomMenu";
import Box from "@mui/material/Box";
import Alert from "../_General/Alert";
import Slide from "@mui/material/Slide";
import AlertMUI from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { MultiDatatable } from "../../Datatable";
import CreateTeacherDialog from "./CreateTeacherDialog";
const ODD_OPACITY = 0.2;

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

var defaultData = {
  username: "yifei970309@gmail.com",
  enabled: true,
  firstName: "",
  lastName: "",
  email: "yifei970309@gmail.com",
  groups: ["teacher"],
  credentials: [
    {
      type: "password",
      value: "test",
      temporary: false,
    },
  ],
};

export default function DataGridUserDetail(props) {
  const [students, setStudents] = React.useState([]);
  const [teachers, setTeachers] = React.useState([]);
  const [query, setQuery] = React.useState("");
  const [allUsers, setAllUsers] = React.useState([]);
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [action, setAction] = React.useState("");
  const [alert, setAlert] = React.useState(false);
  const [alertInfo, setAlertInfo] = React.useState({
    severity: "success",
    message: "Update Success!",
  });
  const [updateData, setUpdateData] = React.useState([]);
  const [courseSubscriptionList, setCourseSubscriptionList] = React.useState(
    []
  );
  const [openDialog, setOpenDialog] = React.useState(false);
  const [data, setData] = React.useState(defaultData);

  React.useEffect(() => {
    API("get", "/student/admin/get/list", props.token).then((res) => {
      // console.log(res);
      if (res.status === 200 && res.message === "NOT FOUND") {
        // console.log("not found");
      } else if (res.status == 200 && res.message === "FOUND") {
        // console.log("found");
        setStudents(res.data);
      }
    });

    API("get", "/teacher/admin/get/list", props.token).then((res) => {
      // console.log(res);
      if (res.status === 200 && res.message === "NOT FOUND") {
        // console.log("not found");
      } else if (res.status == 200 && res.message === "FOUND") {
        // console.log("found");
        setTeachers(res.data);
      }
    });

    MultiDatatable(
      "select a.user_id,a.course_id, b.course_name from l3education.t_course_subscription a left join l3education.t_course b on a.course_id = b.id  where b.course_active = 'Y'",
      ["user_id", "course_id", "course_name"]
    ).then((res) => {
      // console.log(res);
      setCourseSubscriptionList(res);
    });
  }, []);

  React.useEffect(() => {
    setAllUsers(
      students
        .filter((itemA) => {
          return !teachers.find((itemB) => {
            // console.log(itemA);
            return itemA.cognitoId === itemB.cognitoId;
          });
        })
        .map((s) => {
          return { ...s, type: "Student" };
        })

        .concat(
          teachers.map((t) => {
            return { ...t, type: "Teacher" };
          })
        )
    );
  }, [teachers, students]);

  //get action from custom menu and do update logic here
  //active, inactive, upgrade teacher

  React.useEffect(() => {
    setUpdateData([]);
    if (action === "") return;
    // console.log(action);
    // console.log(selectedRows.length);
    if (selectedRows.length === 0) {
      setAlertInfo({
        severity: "warning",
        message: "Please select at least one record!",
      });
      setAlert(true);
      setAction("");
      return;
    }
    if (action === "Active" || action === "Inactive") {
      //activate

      //got problem
      for (let i = 0; i < selectedRows.length; i++) {
        let row = selectedRows[i];
        var data = {
          active: action === "Active" ? "Y" : "N",
          classInSchool: row.classInSchool,
          cognitoId: row.cognitoId,
          dob: row.dob,
          email: row.email,
          hpNo: row.hpNo,
          id: row.id,
          name: row.name,
          parentHpNo: row.parentHpNo,
          parentName: row.parentName,
          school: row.school,
        };
      }
    } else {
      for (let i = 0; i < selectedRows.length; i++) {
        let row = selectedRows[i];
        var data = {
          active: "Y",
          age: 18,
          cognitoId: row.cognitoId,
          description: "teacher",
          dob: row.dob,
          email: row.email,
          name: row.name,
        };

        API("Post", "/teacher/create", props.token, data).then((res) => {
          if (res.status == 200) {
            setAllUsers(
              allUsers.map((user) => {
                if (user.cognitoId !== data.cognitoId) return user;
                return {
                  ...user,
                  type: "Teacher",
                };
              })
            );
          } else {
            setAlertInfo({
              severity: "error",
              message: "Update failed",
            });
            setAlert(true);
            setAction("");
            return;
          }
        });
      }
    }
    setAlertInfo({
      severity: "success",
      message: "Update success",
    });
    setAlert(true);
    setAction("");
  }, [action]);

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
    if (!query) {
      return data;
    } else {
      return data.filter((d) => d.name.toLowerCase().includes(query.toLowerCase()));
    }
  };

  const dataFiltered = filterData(query, allUsers);
  const columns = [
    { field: "id", headerName: "ID", width: 150, hide: true },
    { field: "name", headerName: "Name", width: 150 },
    { field: "hpNo", headerName: "Phone No", width: 100 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "dob", headerName: "Birthday", width: 110 },
    { field: "school", headerName: "School", width: 100 },
    {
      field: "classInSchool",
      headerName: "Class In School",
      width: 150,
    },
    {
      field: "courseList",
      headerName: "Courses",
      width: 100,
      renderCell: (cellValue) => {
        const onHover = (e) => {
          e.stopPropagation(); // don't select this row after hover
        };

        let currentSubscrioption = courseSubscriptionList.filter((data) => {
          return data.user_id === cellValue.row.id;
        });

        return (
          <DropDownMenu
            onHover={onHover}
            currentSubscrioption={currentSubscrioption}
          />
        );
      },
    },

    {
      field: "active",
      headerName: "Active",
      width: 60,
      renderCell: (cellValue) => {
        return (
          <div>
            {cellValue.row.active === "Y" ? (
              <ToggleOnIcon sx={{ marginLeft: "5px", color: "#32a852" }} />
            ) : (
              <ToggleOffIcon sx={{ marginLeft: "5px", color: "#ff002b" }} />
            )}
          </div>
        );
      },
    },
    { field: "parentName", headerName: "Parent Name", width: 100 },
    {
      field: "parentHpNo",
      headerName: "Parent Phone No.",
      width: 150,
    },
    { field: "type", headerName: "Type", width: 100 },
  ];

  return (
    <div>
      <Alert setAlert={setAlert} alert={alert} alertInfo={alertInfo} />

      <CreateTeacherDialog
        isEdit={false}
        setOpenDialog={setOpenDialog}
        openDialog={openDialog}
        token={props.token}
        setData={setData}
        data={data}
        setAlert={setAlert}
        setAlertInfo={setAlertInfo}
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
            User Listing
          </Typography>
        </Grid>
        <Grid item xs={4} sx={{ border: 0 }}>
          <Box
            display="flex"
            justifyContent="flex-start"
            alignItem="flex-start"
            sx={{}}
          >
            <CustomMenu setAction={setAction} />
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
                setOpenDialog(true);
              }}
            >
              Create Teacher
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
              rowHeight={50}
              pageSize={100}
              columns={columns}
              rows={dataFiltered}
              rowsPerPageOptions={[5]}
              checkboxSelection
              onSelectionModelChange={(ids) => {
                const selectedIDs = new Set(ids);
                const selectedRows = dataFiltered.filter((row) =>
                  selectedIDs.has(row.id)
                );

                setSelectedRows(selectedRows);
              }}
            />
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
