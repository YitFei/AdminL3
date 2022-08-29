import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Image from "next/image";
import { mainListItems, secondaryListItems } from "./listItems";
import Profile from "./Profile";
import Chart from "./Chart";
import Deposits from "./Deposits";
import Orders from "./Orders";
import MyInfo from "./MyInfo";
import MyCourse from "./MyCourse";
import MyActivity from "./MyActivity";
import AddCourse from "./AddCourse";
import DashboardHome from "../Components/Main/DashboardHome";
import Logo from "../Icons/LOGO.svg";
import L3EDUCATION from "../Icons/L3_EDUCATION.svg";
import ONLINETUITION from "../Icons/ONLINE_TUITION.svg";
import Dashboardsvg from "../Icons/Home.svg";
import COURSES from "../Icons/Calendar.svg";
import EXCERCISE from "../Icons/Tick_Square.svg";
import Bookmarks from "../Icons/Bookmark.svg";
import AddCoursesvg from "../Icons/Add_Course.svg";
import InviteFriends from "../Icons/+.svg";
import down from "../Icons/down.svg";
import right from "../Icons/right.svg";
import left from "../Icons/left.svg";
import Settingssvg from "../Icons/Setting.svg";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import Head from "next/head";
import { Button } from "@mui/material";
import DataGridUserDetail from "../Components/UsersInformation/DataGridUserDetail";
import UsersIcon from "../Icons/Users.svg";
import DataGridCourses from "../Components/Courses/DataGridCourses";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import DataGridAnnouncement from "../Components/Anouncement/DataGridAnnouncement";
import NotificationImportantIcon from "@mui/icons-material/NotificationImportant";
import DataGridPromotion from "../Components/Promotion/DataGridPromotion";
import DiscountIcon from "@mui/icons-material/Discount";
import { useKeycloakContext } from "../../utils/context";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { Main_URL } from "../_URL";
import ReportsTabPanel from "../Components/Reports/_ReportsTabPanel";
import AssessmentIcon from "@mui/icons-material/Assessment";
import StarIcon from "@mui/icons-material/Star";
import DataGridVIPStudent from "../Components/VIPStudent/DataGridVipStudent";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const drawerWidth = 295;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    width: drawerWidth,
    backgroundColor: "#FBE081",
    // transition: theme.transitions.create("width", {
    //   easing: theme.transitions.easing.sharp,
    //   duration: theme.transitions.duration.enteringScreen,
    // }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const mdTheme = createTheme();

function DashboardContent(props) {
  const { keycloak } = useKeycloakContext();

  const [open, setOpen] = React.useState(true);
  const [AppBarStatus, setAppBarStatus] = React.useState("Dashboard");
  const [RightSideBarOpen, setRightSideBarOpen] = React.useState(true);
  const [index, setIndex] = React.useState(0);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const btnList = [
    {
      navTo: "UsersInfo",
      displayName: "User Listing",
      btnIcon: <Image src={UsersIcon} height={30} width={30} />,
      component: <DataGridUserDetail token={props.token} />,
    },
    {
      navTo: "CourseList",
      displayName: "Course Listing",
      btnIcon: <LibraryBooksIcon sx={{ color: "#000000" }} />,
      component: <DataGridCourses token={props.token} />,
    },
    {
      navTo: "VIPStudent",
      displayName: "VIP Student",
      btnIcon: <StarIcon sx={{ color: "#000000" }} />,
      component: <DataGridVIPStudent token={props.token} />,
    },

    {
      navTo: "AnnouncementList",
      displayName: "Announcement Listing",
      btnIcon: <NotificationImportantIcon sx={{ color: "#000000" }} />,
      component: <DataGridAnnouncement token={props.token} />,
    },

    {
      navTo: "PromotionList",
      displayName: "Promotion Listing",
      btnIcon: <DiscountIcon sx={{ color: "#000000" }} />,
      component: <DataGridPromotion token={props.token} />,
    },
  ];

  React.useEffect(() => {
    let openProfile = localStorage.getItem("openProfile");
    if (openProfile !== null) {
      setRightSideBarOpen(JSON.parse(openProfile) === true);
    }
  }, []);

  return (
    <>
      <Head>
        <title>ALL COURSES </title>
      </Head>
      <ThemeProvider theme={mdTheme}>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />

          <Drawer variant="permanent" open={open}>
            <Toolbar
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                px: [1],
              }}
            >
              <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  spacing={1}
                  onClick={() => {
                    window.location.href = Main_URL;
                  }}
                  sx={{
                    ":hover": {
                      cursor: "pointer",
                    },
                  }}
                >
                  <Image src={Logo} height={53} width={56} />
                  <Stack
                    direction="column"
                    justifyContent="center"
                    alignItems="flex-start"
                    spacing={1}
                  >
                    <Image src={L3EDUCATION} height={16} width={132} />
                    <Image src={ONLINETUITION} height={22} width={144} />
                  </Stack>
                </Stack>
              </Container>
            </Toolbar>
            <Divider />
            <List component="nav">
              <ListItemButton
                sx={{ marginTop: 8, marginBottom: 2 }}
                onClick={() => setAppBarStatus("Dashboard")}
              >
                <ListItemIcon>
                  <Image src={Dashboardsvg} height={30} width={30} />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <span style={{ fontFamily: "'Advent Pro', sans-serif" }}>
                      Home
                    </span>
                  }
                />
              </ListItemButton>

              <ListItemButton onClick={() => setAppBarStatus("Reports")}>
                <ListItemIcon>
                  <AssessmentIcon sx={{ color: "#000000" }}></AssessmentIcon>
                </ListItemIcon>
                <ListItemText
                  primary={
                    <span style={{ fontFamily: "'Advent Pro', sans-serif" }}>
                      Reports
                    </span>
                  }
                />
              </ListItemButton>

              <ListSubheader
                component="div"
                sx={{
                  marginTop: 6,
                  fontFamily: "'Advent Pro', sans-serif",
                  backgroundColor: "#FBE081",
                  fontSize: "1.1em",
                  px: 3,
                }}
              >
                <Stack
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center"
                  spacing={1}
                >
                  Management&nbsp;&nbsp;
                  <Image src={down} height={12} width={9.6} />
                </Stack>
              </ListSubheader>
              {btnList.map((item) => (
                <ListItemButton
                  sx={{ my: 1 }}
                  onClick={() => {
                    setAppBarStatus(item.navTo);
                  }}
                >
                  <ListItemIcon>{item.btnIcon}</ListItemIcon>
                  <ListItemText
                    primary={
                      <span style={{ fontFamily: "'Advent Pro', sans-serif" }}>
                        {item.displayName}
                      </span>
                    }
                  />
                </ListItemButton>
              ))}

              <ListSubheader
                component="div"
                sx={{
                  marginTop: 6,
                  fontFamily: "'Advent Pro', sans-serif",
                  backgroundColor: "#FBE081",
                  fontSize: "1.1em",
                  px: 3,
                }}
              >
                <Stack
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center"
                  spacing={1}
                >
                  Other&nbsp;&nbsp;
                  <Image src={right} height={12} width={9.6} />
                </Stack>
              </ListSubheader>

              <ListItemButton
                sx={{ my: 1 }}
                onClick={() => {
                  window.location.href = keycloak.createAccountUrl();
                }}
              >
                <ListItemIcon>
                  <Image src={Settingssvg} height={30} width={30} />,
                </ListItemIcon>
                <ListItemText
                  primary={
                    <span style={{ fontFamily: "'Advent Pro', sans-serif" }}>
                      My Account
                    </span>
                  }
                />
              </ListItemButton>

              <ListItemButton
                sx={{ my: 1 }}
                onClick={() => {
                  window.location.href =
                    "https://auth.l3education.com.my/auth/";
                }}
              >
                <ListItemIcon>
                  <AdminPanelSettingsIcon sx={{ color: "#000000" }} />,
                </ListItemIcon>
                <ListItemText
                  primary={
                    <span style={{ fontFamily: "'Advent Pro', sans-serif" }}>
                      Admin Panel Console
                    </span>
                  }
                />
              </ListItemButton>
              <ListSubheader
                component="div"
                sx={{
                  marginTop: 6,
                  fontFamily: "'Advent Pro', sans-serif",
                  backgroundColor: "#FBE081",
                  fontSize: "1.1em",
                  px: 3,
                }}
              >
                <Stack
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center"
                  spacing={1}
                >
                  Payment&nbsp;&nbsp;
                  <Image src={right} height={12} width={9.6} />
                </Stack>
              </ListSubheader>
              <ListItemButton sx={{ my: 1 }}>
                <ListItemIcon>
                  <Image src={InviteFriends} height={30} width={30} />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <span style={{ fontFamily: "'Advent Pro', sans-serif" }}>
                      Invite Teacher & Student
                    </span>
                  }
                />
              </ListItemButton>
            </List>
          </Drawer>

          <Box
            component="main"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === "light"
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
              flexGrow: 1,
              height: "100vh",
              overflow: "auto",
            }}
          >
            <Toolbar />
            <Container maxWidth="lg" sx={{ mt: 0, mb: 4 }}>
              <Grid container spacing={3}>
                {AppBarStatus === "Dashboard" && (
                  <Grid item xs={12}>
                    <Paper
                      sx={{ p: 2, display: "flex", flexDirection: "column" }}
                    >
                      {/* GET */}
                      <DashboardHome
                        token={props.token}
                        setAppBarStatus={setAppBarStatus}
                        setIndex={setIndex}
                      />
                    </Paper>
                  </Grid>
                )}
                {AppBarStatus === "Reports" && (
                  <Grid item xs={12}>
                    <Paper
                      sx={{ p: 2, display: "flex", flexDirection: "column" }}
                    >
                      {/* GET */}
                      <ReportsTabPanel token={props.token} index={index} />
                    </Paper>
                  </Grid>
                )}
              </Grid>

              {btnList.map((item) => {
                return (
                  AppBarStatus === item.navTo && (
                    <Grid item xs={12}>
                      <Paper
                        sx={{ p: 2, display: "flex", flexDirection: "column" }}
                      >
                        {item.component}
                      </Paper>
                    </Grid>
                  )
                );
              })}
              <Copyright sx={{ pt: 4 }} />
            </Container>
          </Box>
          <Drawer
            sx={{
              width: RightSideBarOpen ? drawerWidth + 130 : 60,
              flexShrink: 0,
              "& .MuiDrawer-paper": {
                width: RightSideBarOpen ? drawerWidth + 130 : 60,
                backgroundColor: "#FFFFFF",
              },
            }}
            variant="permanent"
            anchor="right"
            open={open}
          >
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
              <Grid container spacing={3}>
                {/* Profile */}
                <Grid item xs={1} my={"auto"}>
                  <Paper
                    elevation={0}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Button
                      onClick={() => {
                        localStorage.setItem("openProfile", !RightSideBarOpen);
                        setRightSideBarOpen(!RightSideBarOpen);
                      }}
                    >
                      <Image src={left} height={25} width={25} />
                    </Button>
                  </Paper>
                </Grid>
                {RightSideBarOpen && (
                  <Grid
                    item
                    xs={11}
                    sx={{ height: "90vh", overflowY: "scroll" }}
                  >
                    <Paper
                      sx={{
                        p: 2,
                        display: "flex",
                        flexDirection: "column",
                        wordBreak: "break-all",
                      }}
                    >
                      <Profile token={props.token} />
                    </Paper>
                  </Grid>
                )}
              </Grid>
            </Container>
          </Drawer>
        </Box>
      </ThemeProvider>
    </>
  );
}

export default function Dashboard(props) {
  return <DashboardContent userData={props.userData} token={props.token} />;
}
