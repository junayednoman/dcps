"use client";
import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Link from "next/link";
import { GoGear } from "react-icons/go";
import { FaHistory } from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";
import { Backdrop, Fade, Modal, Tooltip } from "@mui/material";
import NotificationDropdown from "../components/NotificationDropdown";
import ProfileDropdown from "../components/ProfileDropdown";
import localFont from "next/font/local";
import { FaCirclePlus, FaRegCircleQuestion } from "react-icons/fa6";
import { MdOutlineLogout } from "react-icons/md";
import logo from "@/media/ps.svg";
import Image from "next/image";
import SearchableSelect from "../components/SearchableSelect";
import { IoCloseSharp, IoListSharp } from "react-icons/io5";
import { MdOutlineStickyNote2 } from "react-icons/md";
import MobileDrawer from "../components/MobileDrawer";
import { AuthContext } from "@/authContext/AuthContext";
import Loading from "../components/Loading";
import { LuUsers } from "react-icons/lu";
import handleLogout from "@/lib/handleLogout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

// font
const notoBengali = localFont({
  src: [
    {
      path: "../../../public/fonts/NotoSansBengali-Regular.ttf",
      weight: "400",
    },
    { path: "../../../public/fonts/NotoSansBengali-Medium.ttf", weight: "500" },
    {
      path: "../../../public/fonts/NotoSansBengali-SemiBold.ttf",
      weight: "600",
    },
    { path: "../../../public/fonts/NotoSansBengali-Bold.ttf", weight: "700" },
  ],
  display: "swap",
});

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});
const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

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
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const subMenuItems = [
  {
    label: "সেটিংস",
    link: "/dashboard/settings",
    icon: <GoGear className="text-xl" />,
  },
  {
    label: "সাহায্য ও সহযোগিতা",
    link: "/dashboard/help",
    icon: <FaRegCircleQuestion className="text-xl" />,
  },
];

// modal
const yearOptions = [
  { value: "2020", label: "২০২০" },
  { value: "2021", label: "২০২১" },
  { value: "2022", label: "২০২২" },
  { value: "2023", label: "২০২৩" },
  { value: "2024", label: "২০২৪" },
  { value: "2025", label: "২০২৫" },
  { value: "2026", label: "২০২৬" },
  { value: "2027", label: "২০২৭" },
  { value: "2028", label: "২০২৮" },
  { value: "2029", label: "২০২৯" },
  { value: "2030", label: "২০৩০" },
  { value: "2031", label: "২০৩১" },
  { value: "2032", label: "২০৩২" },
  { value: "2033", label: "২০৩৩" },
];

const monthOptions = [
  { value: "January", label: "জানুয়ারী" },
  { value: "February", label: "ফেব্রুয়ারী" },
  { value: "March", label: "মার্চ" },
  { value: "April", label: "এপ্রিল" },
  { value: "May", label: "মে" },
  { value: "June", label: "জুন" },
  { value: "July", label: "জুলাই" },
  { value: "August", label: "আগস্ট" },
  { value: "September", label: "সেপ্টেম্বর" },
  { value: "October", label: "অক্টোবর" },
  { value: "November", label: "নভেম্বর" },
  { value: "December", label: "ডিসেম্বর" },
];
export default function DashboardLayout({ children }) {
  const { role, loading } = React.useContext(AuthContext);
  const router = useRouter();
  const { userName, setHistoryData } = React.useContext(AuthContext);
  // modal related
  const [modalOpen, setModalOpen] = React.useState(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  const [yearSelectedOption, setyearSelectedOption] = React.useState(null);
  const handleYearSelectChange = (yearSelectedOption) => {
    setyearSelectedOption(yearSelectedOption);
  };

  const [monthSelectedOption, setMonthSelectedOption] = React.useState(null);
  const handleMonthSelectChange = (monthSelectedOption) => {
    setMonthSelectedOption(monthSelectedOption);
  };

  const [schoolSelectedOption, setSchoolSelectedOption] = React.useState(null);
  console.log("schoolSelectedOption,", schoolSelectedOption, role);
  const handleSchoolSelectChange = (schoolSelectedOption) => {
    setSchoolSelectedOption(schoolSelectedOption);
  };

  /////////////////////// HANDLE HISTORY FORM SUBMIT ///////////////////////
  const handelFormSubmit = (e) => {
    e.preventDefault();
    const formData = {
      date: `${monthSelectedOption.value} ${yearSelectedOption.value}`,
      school: role === "head-master" ? userName : schoolSelectedOption.value,
    };

    const a = 4; // Your variable
    router.push(
      `/dashboard/bill-return-history?date=${formData.date}&school=${formData.school}`
    );
    handleModalClose();
    setyearSelectedOption(null);
    setMonthSelectedOption(null);
    setSchoolSelectedOption(null);
  };
  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 430,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  const theme = useTheme();
  const [activeMenuItem, setActiveMenuItem] = React.useState("");
  React.useEffect(() => {
    const location = window.location.pathname;

    if (location.includes("submit")) {
      setActiveMenuItem("submit");
    } else if (location.includes("history")) {
      setActiveMenuItem("history");
    } else if (location.includes("list")) {
      setActiveMenuItem("list");
    } else if (location.includes("summery")) {
      setActiveMenuItem("summery");
    } else if (location.includes("users")) {
      setActiveMenuItem("users");
    }
  }, [role, userName]);

  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [schoolOptions, setSchoolOptions] = React.useState(null);
  const handleHistoryClick = () => {
    handleModalOpen();
    if (role === "aueo" && !schoolOptions) {
      const apiUrl = "http://localhost:3000/api/clusters";
      fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userName),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data.data);
          if (data.success) {
            const schoolOptions = data.data.schools.map((school) => ({
              value: school.name,
              label: school.name,
            }));
            setSchoolOptions(schoolOptions);
          }
        })
        .catch((error) => {
          toast.error("There was an error!");
          console.error("There was an error!", error);
        })
        .finally(() => {
          // setLoading(false);
        });
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <main className={notoBengali.className}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Toolbar className="topbar">
            <div>
              <IconButton
                className="text-primaryColor"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{
                  marginRight: 5,
                  ...(open && { display: "none" }),
                }}
              >
                <MenuIcon />
              </IconButton>
            </div>
            <div className="flex justify-between items-center min-w-full">
              <div className="flex gap-6 items-center">
                <h1
                  style={{ display: open ? "none" : "block" }}
                  className="text-[#008B4C] font-bold md:text-[26px] text-xl"
                >
                  <a href="/">
                    <Image src={logo} alt="logo" width={50} height={50}></Image>
                  </a>
                </h1>
                <form className="md:block hidden">
                  <div className="relative">
                    <IoMdSearch className="text-[#888] text-xl absolute top-[8px] left-[10px]" />
                    <input
                      type="text"
                      placeholder="Search..."
                      className="border-[#ccc] border pl-9 pr-4 py-[6px] rounded-md text-textColor focus:outline-textColor focus:outline-1 w-[230px]"
                    />
                  </div>
                </form>
              </div>
              <div className="flex items-center ml-auto text-black">
                <div className="flex items-center justify-center">
                  <IconButton size="large">
                    <Tooltip title="Theme">
                      <label className="swap swap-rotate text-textColor">
                        {/* this hidden checkbox controls the state */}
                        <input
                          type="checkbox"
                          className="theme-controller"
                          value="synthwave"
                        />
                        {/* sun icon */}
                        <svg
                          className="swap-off fill-current md:w-6 w-5 md:h-6 h-5"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                        </svg>

                        {/* moon icon */}
                        <svg
                          className="swap-on fill-current md:w-6 w-5 md:h-6 h-5"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                        </svg>
                      </label>
                    </Tooltip>
                  </IconButton>
                </div>
                <div>
                  <NotificationDropdown />
                </div>
                <div>
                  <ProfileDropdown role={role} />
                </div>
              </div>
            </div>
          </Toolbar>

          {/* mobile top bar */}
          <div className="mobiletopbar">
            <div className="flex justify-between items-center w-full px-4">
              <div className="flex gap-6 items-center">
                <h1
                  style={{ display: open ? "none" : "block" }}
                  className="text-[#008B4C] font-bold md:text-[26px] text-xl"
                >
                  <a href="/">
                    <Image src={logo} alt="logo" width={50} height={50}></Image>
                  </a>
                </h1>
                <form className="ml-16 md:block hidden">
                  <div className="relative">
                    <IoMdSearch className="text-[#888] text-xl absolute top-[8px] left-[10px]" />
                    <input
                      type="text"
                      placeholder="Search..."
                      className="border-[#ccc] border pl-9 pr-4 py-[6px] rounded-md text-textColor focus:outline-textColor focus:outline-1 w-[230px]"
                    />
                  </div>
                </form>
              </div>
              <div className="flex items-center ml-auto text-black">
                <div className="flex items-center justify-center">
                  <IconButton size="large">
                    <Tooltip title="Theme">
                      <label className="swap swap-rotate text-textColor">
                        {/* this hidden checkbox controls the state */}
                        <input
                          type="checkbox"
                          className="theme-controller"
                          value="synthwave"
                        />
                        {/* sun icon */}
                        <svg
                          className="swap-off fill-current md:w-6 w-5 md:h-6 h-5"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                        </svg>

                        {/* moon icon */}
                        <svg
                          className="swap-on fill-current md:w-6 w-5 md:h-6 h-5"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                        </svg>
                      </label>
                    </Tooltip>
                  </IconButton>
                </div>
                <div>
                  <NotificationDropdown />
                </div>
                <div>
                  <ProfileDropdown role={role} />
                </div>
              </div>
            </div>
          </div>
        </AppBar>

        <Drawer variant="permanent" open={open} className="lg:block hidden">
          <DrawerHeader>
            <IconButton
              className="text-primaryColor"
              onClick={handleDrawerClose}
            >
              {theme.direction === "rtl" ? <MenuIcon /> : <MenuIcon />}
            </IconButton>
          </DrawerHeader>
          <h1 className=" font-bold text-[25px] absolute top-3 left-7 text-[#008B4C]">
            <a href="https://www.dpe.gov.bd/" target="_blank">
              <Image src={logo} alt="logo" width={70} height={70}></Image>
            </a>
          </h1>

          <div className="menuItems">
            <List>
              {role === "head-master" && (
                <ListItem
                  onClick={() => setActiveMenuItem("submit")}
                  disablePadding
                  sx={{ display: "block" }}
                >
                  <Link href={"/dashboard/bill-return-submit"}>
                    <ListItemButton
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? "initial" : "center",
                        px: 2.5,
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : "auto",
                          justifyContent: "center",
                        }}
                      >
                        <FaCirclePlus
                          className="text-xl"
                          style={{
                            color: activeMenuItem === "submit" && "#008B4C",
                          }}
                        />
                      </ListItemIcon>
                      <ListItemText
                        className={`capitalize mt-2`}
                        style={{
                          color: activeMenuItem === "submit" && "#008B4C",
                        }}
                        primary={"বিল রিটার্ন সাবমিট"}
                        sx={{ opacity: open ? 1 : 0 }}
                      />
                    </ListItemButton>
                  </Link>
                </ListItem>
              )}
              {role === "aueo" || role === "ueo" ? (
                <>
                  <ListItem
                    onClick={() => setActiveMenuItem("list")}
                    disablePadding
                    sx={{ display: "block" }}
                  >
                    <Link href={"/dashboard/bill-return-list"}>
                      <ListItemButton
                        sx={{
                          minHeight: 48,
                          justifyContent: open ? "initial" : "center",
                          px: 2.5,
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            minWidth: 0,
                            mr: open ? 3 : "auto",
                            justifyContent: "center",
                          }}
                        >
                          <IoListSharp
                            className="text-xl"
                            style={{
                              color: activeMenuItem === "list" && "#008B4C",
                            }}
                          />
                        </ListItemIcon>
                        <ListItemText
                          className={`capitalize mt-2`}
                          style={{
                            color: activeMenuItem === "list" && "#008B4C",
                          }}
                          primary={"বিল রিটার্ন তালিকা"}
                          sx={{ opacity: open ? 1 : 0 }}
                        />
                      </ListItemButton>
                    </Link>
                  </ListItem>
                  <ListItem
                    onClick={() => setActiveMenuItem("summery")}
                    disablePadding
                    sx={{ display: "block" }}
                  >
                    <Link href={"/dashboard/bill-return-summery"}>
                      <ListItemButton
                        sx={{
                          minHeight: 48,
                          justifyContent: open ? "initial" : "center",
                          px: 2.5,
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            minWidth: 0,
                            mr: open ? 3 : "auto",
                            justifyContent: "center",
                          }}
                        >
                          <MdOutlineStickyNote2
                            className="text-xl"
                            style={{
                              color: activeMenuItem === "summery" && "#008B4C",
                            }}
                          />
                        </ListItemIcon>
                        <ListItemText
                          className={`capitalize mt-2`}
                          style={{
                            color: activeMenuItem === "summery" && "#008B4C",
                          }}
                          primary={"বিল রিটার্ন সারাংশ"}
                          sx={{ opacity: open ? 1 : 0 }}
                        />
                      </ListItemButton>
                    </Link>
                  </ListItem>
                </>
              ) : (
                ""
              )}
              {role === "ueo" || role === "aueo" ? (
                <ListItem
                  onClick={() => setActiveMenuItem("users")}
                  disablePadding
                  sx={{ display: "block" }}
                >
                  <Link href={"/dashboard/users"}>
                    <ListItemButton
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? "initial" : "center",
                        px: 2.5,
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : "auto",
                          justifyContent: "center",
                        }}
                      >
                        <LuUsers
                          className="text-xl"
                          style={{
                            color: activeMenuItem === "users" && "#008B4C",
                          }}
                        />
                      </ListItemIcon>
                      <ListItemText
                        className={`capitalize mt-2`}
                        style={{
                          color: activeMenuItem === "users" && "#008B4C",
                        }}
                        primary={"ইউজারস"}
                        sx={{ opacity: open ? 1 : 0 }}
                      />
                    </ListItemButton>
                  </Link>
                </ListItem>
              ) : (
                ""
              )}

              {role && role !== "ueo" && (
                <ListItem
                  onClick={() => setActiveMenuItem("history")}
                  disablePadding
                  sx={{ display: "block" }}
                >
                  <ListItemButton
                    onClick={handleHistoryClick}
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      <FaHistory
                        style={{
                          color: activeMenuItem === "history" && "#008B4C",
                        }}
                        className="text-xl"
                      />
                    </ListItemIcon>
                    <ListItemText
                      style={{
                        color: activeMenuItem === "history" && "#008B4C",
                      }}
                      className={`capitalize mt-2`}
                      primary={"বিল রিটার্ন ইতিহাস"}
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </ListItem>
              )}
            </List>

            <div>
              <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={modalOpen}
                onClose={handleModalClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                  backdrop: {
                    timeout: 500,
                  },
                }}
              >
                <Fade in={modalOpen}>
                  <Box sx={modalStyle}>
                    <button className="w-full cursor-default">
                      <IoCloseSharp
                        onClick={handleModalClose}
                        className="text-2xl ml-auto cursor-pointer"
                      />
                    </button>
                    <form className="mt-3">
                      <SearchableSelect
                        options={yearOptions}
                        onChange={handleYearSelectChange}
                        value={yearSelectedOption}
                        label={"বিল সাবমিটের বছর*"}
                        placeholder={"বিল সাবমিটের বছর সিলেক্ট করুন"}
                      />
                      <SearchableSelect
                        options={monthOptions}
                        onChange={handleMonthSelectChange}
                        value={monthSelectedOption}
                        label={"বিল সাবমিটের মাস*"}
                        placeholder={"বিল সাবমিটের মাস সিলেক্ট করুন"}
                      />
                      {role !== "head-master" && (
                        <SearchableSelect
                          options={role === "aueo" && schoolOptions}
                          onChange={handleSchoolSelectChange}
                          value={schoolSelectedOption}
                          label={"বিদ্যালয়*"}
                          placeholder={"বিদ্যালয় সিলেক্ট করুন"}
                        />
                      )}
                      <div className="mt-7">
                        {role === "head-master" ? (
                          <Tooltip
                            placement="right"
                            title={`${
                              !yearSelectedOption || !monthSelectedOption
                                ? "Select all options"
                                : ""
                            }`}
                          >
                            <button
                              disabled={
                                !yearSelectedOption || !monthSelectedOption
                              }
                              onClick={handelFormSubmit}
                              href={"/dashboard/bill-return-history"}
                              className={`px-4 py-[6px] pt-2 bg-primaryColor border border-primaryColor hover:bg-textColor text-white rounded-md font-medium capitalize ${
                                !yearSelectedOption || !monthSelectedOption
                                  ? "cursor-not-allowed opacity-75"
                                  : "cursor-pointer opacity-100"
                              }`}
                            >
                              সার্চ করুন
                            </button>
                          </Tooltip>
                        ) : (
                          <Tooltip
                            placement="right"
                            title={`${
                              !yearSelectedOption ||
                              !monthSelectedOption ||
                              !schoolSelectedOption
                                ? "Select all options"
                                : ""
                            }`}
                          >
                            <button
                              disabled={
                                !yearSelectedOption ||
                                !monthSelectedOption ||
                                !schoolSelectedOption
                              }
                              onClick={handelFormSubmit}
                              href={"/dashboard/bill-return-history"}
                              className={`px-4 py-[6px] pt-2 bg-primaryColor border border-primaryColor hover:bg-textColor text-white rounded-md font-medium capitalize ${
                                !yearSelectedOption ||
                                !monthSelectedOption ||
                                !schoolSelectedOption
                                  ? "cursor-not-allowed opacity-75"
                                  : "cursor-pointer opacity-100"
                              }`}
                            >
                              সার্চ করুন
                            </button>
                          </Tooltip>
                        )}
                      </div>
                    </form>
                  </Box>
                </Fade>
              </Modal>
            </div>

            <Divider />
            <List>
              {subMenuItems.map((item, index) => (
                <ListItem key={index} disablePadding sx={{ display: "block" }}>
                  <Link href={item.link}>
                    <ListItemButton
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? "initial" : "center",
                        px: 2.5,
                      }}
                    >
                      {/* {item.icon} */}
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : "auto",
                          justifyContent: "center",
                        }}
                      >
                        {/* render the icons here */}
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText
                        className="capitalize"
                        primary={item.label}
                        sx={{ opacity: open ? 1 : 0 }}
                      />
                    </ListItemButton>
                  </Link>
                </ListItem>
              ))}
              {/* { label: "লগ আউট", link: "/dashboard/help", icon: <MdOutlineLogout className='text-xl' /> }, */}
              <ListItem
                onClick={handleLogout}
                disablePadding
                sx={{ display: "block" }}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <MdOutlineLogout
                      className="text-xl"
                      style={{
                        color: activeMenuItem === "logout" && "#008B4C",
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    className={`capitalize mt-2`}
                    style={{ color: activeMenuItem === "logout" && "#008B4C" }}
                    primary={"লগ আউট"}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            </List>
          </div>
        </Drawer>
        <div className="mobile_drawer_items">
          <MobileDrawer />
        </div>
        <Box
          className="bg-[#FAFAFA] min-h-screen"
          component="main"
          sx={{ flexGrow: 1, p: 3 }}
        >
          <DrawerHeader />
          {children}
        </Box>
      </Box>
      <ToastContainer autoClose={1600} />
    </main>
  );
}
