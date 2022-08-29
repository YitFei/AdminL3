import React from "react";
import { APIByQuery } from "../../API";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { alpha, styled } from "@mui/material/styles";
import { DataGrid, gridClasses, GridApi, GridToolbar } from "@mui/x-data-grid";
import SearchBar from "../_General/SearchBar";
import Image from "next/image";
import Box from "@mui/material/Box";
import Alert from "../_General/Alert";
import TocIcon from "@mui/icons-material/Toc";
import DeleteIcon from "@mui/icons-material/Delete";
import { GetSingleProperTime } from "../_General/GetProperTime.js";
import Datatable, { MultiDatatable } from "../../Datatable";
import { string } from "prop-types";

const ODD_OPACITY = 0.2;

var defaultData = {
  cost: 0,
  courseId: "",
  promotionCode: "",
  userId: "",
};

export default function DataGridVIPStudent(props) {
  const [studentList, setStudentList] = React.useState([]);
  const [courseSubscription, setCourseSubcription] = React.useState([]);
  const [courseList, setCourseList] = React.useState([]);
  const [query, setQuery] = React.useState("");

  function defaultDateFilter(fieldName) {
    var today = new Date();
    var currentDate = String(today.getDate()).padStart(2, "0");
    var currentMonth = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var currentYear = today.getFullYear();
    var firstOfMonth = new Date(currentYear, currentMonth - 1, 1);
    var lastDayOfMonth = new Date(currentYear, currentMonth, 1).addDays(-1);

    firstOfMonth =
      currentYear +
      "-" +
      String(firstOfMonth.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(firstOfMonth.getDate()).padStart(2, "0");
    lastDayOfMonth =
      currentYear +
      "-" +
      String(lastDayOfMonth.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(lastDayOfMonth.getDate()).padStart(2, "0");
    return fieldName === "dateFrom" ? firstOfMonth : lastDayOfMonth;
  }

  Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  };

  const [filter, setFilter] = React.useState({
    dateFrom: defaultDateFilter("dateFrom"),
    dateTo: defaultDateFilter("dateTo"),
  });

  React.useEffect(() => {
    Datatable("t_student").then((res) => {
      setStudentList(res);
    });
  }, [filter]);

  React.useEffect(() => {
    MultiDatatable(
      `select id,id as course_id,course_cost,course_name,description,start_date,end_date,teacher_id  from l3education.t_course where course_active = 'Y' and is_del='N' and start_date >= '${filter.dateFrom}' and end_date <= '${filter.dateTo}';`,
      [
        "id",
        "course_id",
        "course_cost",
        "course_name",
        "description",
        "start_date",
        "end_date",
        "teacher_id",
      ]
    ).then((res) => {
      setCourseList(res);
    });
    MultiDatatable(
      `select a.id ,a.course_id,a.user_id, a.cost,a.discount_amount,b.code as promotionCode from l3education.t_course_subscription a left join l3education.t_promotion_code b on a.promotion_code_id= b.id  left join l3education.t_course c on a.course_id = c.id  where a.is_del = 'N' and start_date >= '${filter.dateFrom}' and end_date <= '${filter.dateTo}'`,
      ["id", "course_id", "user_id", "cost", "discount_amount", "promotionCode"]
    ).then((res) => {
      setCourseSubcription(res);
    });
  }, [filter]);

  function getRows() {
    return studentList.map((studentInfo, index) => {
      let subscription = courseSubscription.filter((f) => {
        return studentInfo.id === f.user_id;
      });

      if (subscription === undefined) return { ...studentInfo, no: index + 1 };
      if (subscription.length === 0) return { ...studentInfo, no: index + 1 };

      let result;
      var totalAmt = 0;
      let promotionUsed = "";
      for (let i = 0; i < subscription.length; i++) {
        totalAmt = Number(subscription[i]["cost"]) + totalAmt;
        promotionUsed =
          String(promotionUsed) +
          (subscription[i]["promotionCode"] === null
            ? ""
            : String(subscription[i]["promotionCode"]) + ",");

        result = {
          ...result,
          [subscription[i]["course_id"]]: subscription[i]["cost"],
        };
      }

      result = { ...studentInfo, ...result };

      return {
        ...result,
        no: index + 1,
        total: totalAmt,
        promotionUsed: promotionUsed,
      };
    });
  }

  const additionalColumns = [
    { field: "total", headerName: "总额" },
    { field: "promotionUsed", headerName: "福利" },
  ];
  function getDyamicColumns() {
    let allColumns;
    let courseColumns = courseList.map((courseInfo) => {
      return {
        field: courseInfo.course_id,
        headerName: courseInfo.course_name,
        width: 100,
      };
    });

    allColumns = [...columns, ...courseColumns, ...additionalColumns];

    return allColumns;
  }

  const columns = [
    { field: "no", headerName: "序", width: 60 },
    { field: "tag", headerName: "年段", width: 50 },
    { field: "class_in_school", headerName: "班级", width: 200 },
    {
      field: "name",
      headerName: "名字",

      width: 200,
    },
    { field: "dob", headerName: "生日日期", width: 100 },
    { field: "hp_no", headerName: "电话号码", width: 150 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "school", headerName: "学校" },
    { field: "parentName", headerName: "家长名字", width: 200 },
    { field: "parentHpNo", headerName: "家长号码", width: 200 },
    { field: "create_at", headerName: "加入时间", width: 150 },
  ];

  React.useEffect(() => {
    if (!confirm) return;
  }, [confirm]);

  const handleChangeFilter = (e, fieldName) => {
    setFilter((p) => ({
      ...p,
      [fieldName]: e.target.value,
    }));
  };

  return (
    <Grid container xs={12}>
      <Grid
        item
        xs={12}
        sx={{ border: 1, borderRadius: 0.5, borderColor: "#c7c7c7" }}
      >
        <Grid sx={{ p: 1 }} container direction="row" alignItems="center">
          <Typography sx={{ mr: 1 }}>Date From :</Typography>

          <TextField
            sx={{ "& legend": { display: "none" }, "& fieldset": { top: 0 } }}
            type={"date"}
            value={filter.dateFrom}
            onChange={(e) => handleChangeFilter(e, "dateFrom")}
          ></TextField>

          <Typography sx={{ ml: 1, mr: 1 }}>To</Typography>

          <TextField
            sx={{ "& legend": { display: "none" }, "& fieldset": { top: 0 } }}
            type={"date"}
            value={filter.dateTo}
            onChange={(e) => handleChangeFilter(e, "dateTo")}
          ></TextField>
        </Grid>
      </Grid>
      <Grid item xs={12} sx={{ width: 1, height: 600, mt: 2 }}>
        <StripedDataGrid
          components={{ Toolbar: GridToolbar }}
          sx={{ border: 0, borderColor: "#4da0e3", boxShadow: 5 }}
          getRowClassName={(params) =>
            params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
          }
          rowHeight={50}
          pageSize={100}
          columns={getDyamicColumns()}
          rows={getRows()}
          rowsPerPageOptions={[100]}
        />
      </Grid>
    </Grid>
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
