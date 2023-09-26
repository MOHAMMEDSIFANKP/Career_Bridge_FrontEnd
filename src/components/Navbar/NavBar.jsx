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
import { useNavigate, Link } from "react-router-dom";

// Redux
import {
  LogoutDetails,
  ClearPosition,
  ClearRole,
  CleatExperiences,
  ClearEducation,
  ClearLanguage,
  ClearSkills,
} from "../../Redux/UserSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { LogoutCompanyDetails, CleartPosts } from "../../Redux/CompanySlice";
import NavBarSearching from "../NavBarSearching/NavBarSearching";

export function NavbarDefault() {
  // UserInfo Redux
  const { UserInfo } = useSelector((state) => state.user);
  // CompanyInfo Redux
  const { CompanyInfo } = useSelector((state) => state.company);
  const [openNav, setOpenNav] = React.useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(LogoutCompanyDetails());
    dispatch(CleartPosts());
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
        to={UserInfo.is_compeated === true ? "/user/profile" : ""}
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
            {UserInfo.first_name
              ? `${UserInfo.first_name} ${UserInfo.last_name}`
              : "Unauthorize"}
          </p>
        </div>
      </Link>
      <Typography as="li" variant="small" color="blue-gray" className="p-1">
        <a href="#" className="flex items-center font-bold">
          Account
        </a>
      </Typography>
      <Typography as="li" variant="small" color="blue-gray" className="p-1">
        <a href="#" className="flex items-center font-bold">
          Blocks
        </a>
      </Typography>
      <Typography as="li" variant="small" color="blue-gray" className="p-1">
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
          onClick={() => navigate("/user/")}
        >
          Career Bridge
        </Typography>
        <div className="flex w-3/12  justify-end items-center">
          <div className="md:w-full me-2 hidden lg:block w-4/12">
            <NavBarSearching />
          </div>
          <div className="hidden lg:block ">
            <Menu
              animate={{
                mount: { y: 0 },
                unmount: { y: 25 },
              }}
            >
              <MenuHandler>
                <div className="w-8 flex items-center justify-center h-8 rounded-full border-2 border-purple-300">
                  {UserInfo.profile_image ? (
                    <img
                      src={
                        UserInfo.profile_image
                          ? UserInfo.profile_image
                          : defaultprofile
                      }
                      className="w-8 rounded-full"
                      alt=""
                    />
                  ) : (
                    <img
                      src={
                        CompanyInfo.profile_image
                          ? CompanyInfo.profile_image
                          : defaultprofile
                      }
                      className="w-8 p-[2px] rounded-full"
                      alt=""
                    />
                  )}
                </div>
              </MenuHandler>
              <MenuList className="rounded-xl text-black">
                <MenuItem className="flex justify-center items-center ">
                  <div className="w-16 h-16 rounded-full border-2 border-purple-400">
                    {UserInfo.profile_image ? (
                      <img
                        src={
                          UserInfo.profile_image
                            ? UserInfo.profile_image
                            : defaultprofile
                        }
                        className="w-16 rounded-full"
                        alt=""
                      />
                    ) : (
                      <img
                        src={
                          CompanyInfo.profile_image
                            ? CompanyInfo.profile_image
                            : defaultprofile
                        }
                        className="w-16 p-[3px] rounded-full"
                        alt=""
                      />
                    )}
                  </div>
                </MenuItem>
                {UserInfo.email ? (
                  <MenuItem
                    className="text-center capitalize "
                    onClick={() =>
                      navigate(UserInfo.is_compleated ? "/user/profile" : "")
                    }
                  >
                    {UserInfo.first_name
                      ? `${UserInfo.first_name} ${UserInfo.last_name}`
                      : "Unauthorize"}
                  </MenuItem>
                ) : (
                  <>
                    <MenuItem
                      className="text-center capitalize "
                      onClick={() =>
                        navigate(
                          CompanyInfo.is_compleated ? "/company/profile" : ""
                        )
                      }
                    >
                      {CompanyInfo.first_name
                        ? `${CompanyInfo.first_name} ${CompanyInfo.last_name}`
                        : "Unauthorize"}
                    </MenuItem>
                    <hr className="mx-4" />
                    <MenuItem
                      className="text-center capitalize "
                      onClick={() => navigate("/company/dashboard/")}
                    >
                      Dashboard
                    </MenuItem>
                  </>
                )}
                <hr className="mx-4" />
                <MenuItem className="my-1 text-center" onClick={logout}>
                  Logout
                </MenuItem>
              </MenuList>
            </Menu>
          </div>
        </div>
       <div className="lg:hidden grid  grid-cols-[1fr,3rem] w-1/4">
       <div className="md:w-full me-2  w-full">
            <NavBarSearching />
          </div>
       <div className="w-full flex justify-end items-center">
       <Menu>
          <MenuHandler className="ml-auto rounded-full border border-purple-400 p-[3px] w-7 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden">
            {UserInfo.profile_image ? (
              <img
                src={
                  UserInfo.profile_image
                    ? UserInfo.profile_image
                    : defaultprofile
                }
                className="w-16  rounded-full border-2 border-purple-400"
                alt=""
              />
            ) : (
              <img
                src={
                  CompanyInfo.profile_image
                    ? CompanyInfo.profile_image
                    : defaultprofile
                }
                className="w-16 p-[3px] rounded-full border-2 border-purple-400"
                alt=""
              />
            )}
          </MenuHandler>
          <MenuList>
            <MenuList className="rounded-xl text-black">
              <MenuItem className="flex justify-center items-center ">
                {UserInfo.profile_image ? (
                  <img
                    src={
                      UserInfo.profile_image
                        ? UserInfo.profile_image
                        : defaultprofile
                    }
                    className="w-16 rounded-full border-2 border-purple-400"
                    alt=""
                  />
                ) : (
                  <img
                    src={
                      CompanyInfo.profile_image
                        ? CompanyInfo.profile_image
                        : defaultprofile
                    }
                    className="w-16 p-[3px] rounded-full border-2 border-purple-400"
                    alt=""
                  />
                )}
              </MenuItem>
              {UserInfo.email ? (
                <MenuItem
                  className="text-center capitalize "
                  onClick={() =>
                    navigate(UserInfo.is_compleated ? "/user/profile" : "")
                  }
                >
                  {UserInfo.first_name
                    ? `${UserInfo.first_name} ${UserInfo.last_name}`
                    : "Unauthorize"}
                </MenuItem>
              ) : (
                <MenuItem className="text-center capitalize ">
                  {CompanyInfo.first_name
                    ? `${CompanyInfo.first_name} ${CompanyInfo.last_name}`
                    : "Unauthorize"}
                </MenuItem>
              )}
              <hr className="mx-4" />
              <MenuItem className="my-1 text-center" onClick={logout}>
                Logout
              </MenuItem>
            </MenuList>
          </MenuList>
        </Menu>
       </div>
       </div>
      </div>
      {/* <MobileNav open={openNav}>
        <div className="container mx-auto">{navList}</div>
      </MobileNav> */}
    </Navbar>
  );
}
