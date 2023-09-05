import React from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import "./NavBar.css";
import defaultprofile from "../../assets/defaultprofile.jpeg";
import { useNavigate , Link} from "react-router-dom";

import {
  LogoutDetails,
  ClearPosition,
  ClearRole,
  CleatExperiences,
  ClearEducation,
  ClearLanguage,
  ClearSkills,
} from "../../Redux/UserSlice";

// Redux
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export function NavbarDefault() {
  const { UserInfo } = useSelector((state) => state.user);
  const [openNav, setOpenNav] = React.useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(LogoutDetails());
    dispatch(ClearPosition());
    dispatch(ClearRole());
    dispatch(CleatExperiences());
    dispatch(ClearEducation());
    dispatch(ClearLanguage());
    dispatch(ClearSkills());
    localStorage.removeItem("token");
    navigate("/login");
  };

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Link
      to ="/user/profile"
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal flex w-full items-center"
      >
        <div className="w-1/6">
          <img
            src={UserInfo == "" ? UserInfo.profile_image : defaultprofile}
            className="w-16 rounded-full border-2 border-purple-400"
            alt=""
          />
        </div>
        <div className="ms-4">
          <p className="font-bold text-purple-400">
            {UserInfo
              ? `${UserInfo.first_name} ${UserInfo.last_name}`
              : "Unauthorize"}
          </p>
        </div>
      </Link>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1"
      >
        <a href="#" className="flex items-center font-bold">
          Account
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1"
      >
        <a href="#" className="flex items-center font-bold">
          Blocks
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1"
      >
        <a href="#" className="flex items-center font-bold" onClick={logout}>
          Logout
        </a>
      </Typography>
    </ul>
  );

  return (
    <Navbar className="custom-navbar-width py-2 px-4 lg:px-8 lg:py-4 sticky top-0 left-0 right-0 z-50">
      <div className="lg:mx-28 flex items-center justify-between text-purple-400">
        <Typography
          as="a"
          href="#"
          className="mr-4 cursor-pointer py-2 font-bold text-2xl"
        >
          Career Bridge
        </Typography>

        <div className="hidden lg:block">
          <Menu
            animate={{
              mount: { y: 0 },
              unmount: { y: 25 },
            }}
          >
            <MenuHandler>
              <img
                src={UserInfo == "" ? UserInfo.profile_image : defaultprofile}
                className="w-8 rounded-full border-2 border-purple-300"
                alt=""
              />
            </MenuHandler>
            <MenuList className="rounded-xl text-black">
              <MenuItem className="flex justify-center items-center ">
                <img
                  src={UserInfo == "" ? UserInfo.profile_image : defaultprofile}
                  className="w-16 rounded-full border-2 border-purple-400"
                  alt=""
                />
              </MenuItem>
              <MenuItem className="text-center capitalize "onClick={()=>navigate('/user/profile')}>
                {UserInfo
                  ? `${UserInfo.first_name} ${UserInfo.last_name}`
                  : "Unauthorize"}
              </MenuItem>
              <hr className="mx-4" />
              <MenuItem className="my-1 text-center" onClick={logout}>
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        </div>

        <IconButton
          variant="text"
          className="ml-auto h-6 w-6  pb-5 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6 "
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </IconButton>
      </div>
      <MobileNav open={openNav}>
        <div className="container mx-auto">{navList}</div>
      </MobileNav>
    </Navbar>
  );
}
