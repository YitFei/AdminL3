import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MonthlyUserDetailReport from "./MonthlyUserDetailReport";
import StudentCourseAmountReport from "./StudentCourseAmountReport";
import NewStudentReport from "./NewStudentReport";
import ExitStudentReport from "./ExitStudentReport";
import TotalGraph from "./TotalGraph";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export const ReportOptions = [
  {
    name: "学生课程报告",
    index: 0,
    tab: <StudentCourseAmountReport />,
    color: "#4287f5",
  },
  {
    name: "新生报告",
    index: 1,
    tab: <NewStudentReport />,
    color: "#2600ff",
  },
  {
    name: "退出学生报告",
    index: 2,
    tab: <ExitStudentReport />,
    color: "#009c82",
  },
  {
    name: "课程月报表",
    index: 3,
    tab: <MonthlyUserDetailReport />,
    color: "#ff5e89",
  },
];
export default function ReportTabPanel(props) {
  const [value, setValue] = React.useState(props.index);
  const [removeClick, setRemoveClick] = React.useState(false);
  const [checkOut, setCheckOut] = React.useState(false);
  const [showAlert, setShowAlert] = React.useState(false);
  const [successAlert, setSuccessAlert] = React.useState(true);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        border: 0,
        marginTop: "1.5%",
      }}
    >
      <Box sx={{ borderBottom: 1, border: 0, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          centered
          sx={{
            border: 1,
            marginLeft: "1.5%",
            marginRight: "1.5%",
            borderColor: "#296a9e",
            borderRadius: 2,
            boxShadow: 5,
          }}
        >
          {ReportOptions.map((report) => {
            return <Tab label={report.name} {...a11yProps(report.index)} />;
          })}
        </Tabs>
      </Box>

      {ReportOptions.map((report) => {
        return (
          <TabPanel value={value} index={report.index}>
            {report.tab}
          </TabPanel>
        );
      })}
    </Box>
  );
}
