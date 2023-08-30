import React, { useState, useRef, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import "./style.css";
import axios from "axios";
import jwtDecode from "jwt-decode";
import strings from "../../lang/lang";

const Navbar = (props) => {
  const [showLinks, setShowLinks] = useState(false);
  const linksContainerRef = useRef(null);
  const linksRef = useRef(null);
  const toggleLinks = () => {
    setShowLinks(!showLinks);
  };
  let navigate = useNavigate();
  const openProfilePage = () => {
    navigate("/profile");
    console.log("fghjkl");
  };
  useEffect(() => {
    const linksHeight = linksRef.current.getBoundingClientRect().height;
    if (showLinks) {
      linksContainerRef.current.style.height = `${linksHeight}px`;
    } else {
      linksContainerRef.current.style.height = "0px";
    }
  }, [showLinks]);
  let token = localStorage.getItem("userToken");
  let decodedToken;

  const [userData, setUserData] = useState();
  useEffect(() => {
    if (token) {
      decodedToken = jwtDecode(token);
      axios
        .get(
          `https://backend-ecocharge-v9vw.onrender.com/api/user/getone/${decodedToken.id}`
        )
        .then((res) => {
          setUserData(res.data);
          // console.log(res.data);
        });
    }
  }, [token]);

  // console.log(userData);

  return (
    <nav
      className="navbarHome"
      style={{ color: "rgb(45 159 124)", fontWeight: "bolder" }}
    >
      <div className="nav-center">
        <div
          className="nav-header"
          style={{ fontSize: "32px", color: "black", alignSelf: "baseline" }}
        >
          <Link to="/">
            <span>
              <img
                alt="logo"
                src="/Images/electric-car.png"
                style={{ width: "50px", height: "50px" }}
              />
              <span style={{ color: "rgb(45 159 124)" }}>Eco</span>
              <span style={{ color: "#878558" }}>Charge</span>
            </span>
          </Link>

          <button className="nav-toggle" onClick={toggleLinks}>
            <FaBars />
          </button>
        </div>
        <div className="links-container" ref={linksContainerRef}>
          <ul className="links" ref={linksRef}>
            <li>
              <NavLink to="/">{strings.navbar.home}</NavLink>
            </li>
            <li>
              <NavLink to="/about">{strings.navbar.about}</NavLink>
            </li>
            <li>
              <NavLink to="/service">{strings.navbar.services}</NavLink>
            </li>

            {props.userData?.role === "admin" ? (
              <>
                <li>
                  <NavLink to="/dashboard">{strings.navbar.dashboard}</NavLink>
                </li>

                {/* <li >
                  <Link onClick={props.logOut} >LogOut</Link>
                </li> */}
                <span className="containerData">
                  {props.userData?.hasOwnProperty("image") ? (
                    <Avatar
                      onClick={openProfilePage}
                      src={props.userData?.image}
                      className="avatar"
                      aria-label="recipe"
                    />
                  ) : (
                    <Avatar
                      onClick={openProfilePage}
                      src={userData?.image}
                      className="avatar"
                      aria-label="recipe"
                    />
                  )}

                  <span className="UserName">
                    {
                      // props.userData?.name?.split(" ")[0] || userData.name?.split(" ")[0]

                      // props.userData?.name?.split(" ")[0]
                      props.userData?.hasOwnProperty("name") ? (
                        <span>{props.userData?.name?.split(" ")[0]}</span>
                      ) : (
                        <span>{userData.name?.split(" ")[0]}</span>
                      )
                    }
                  </span>
                </span>
              </>
            ) : (
              ""
            )}
            {props.userData?.role === "user" ? (
              <>
                {/* <li >
                  <NavLink to="/nearestStation">NearestStation</NavLink>
                </li> */}
                {/* <li >
                  <Link onClick={props.logOut} >LogOut</Link>
                </li> */}
                <span className="containerData">
                  {props.userData?.hasOwnProperty("image") ? (
                    <Avatar
                      onClick={openProfilePage}
                      src={props.userData?.image}
                      className="avatar"
                      aria-label="recipe"
                    />
                  ) : (
                    <Avatar
                      onClick={openProfilePage}
                      src={userData?.image}
                      className="avatar"
                      aria-label="recipe"
                    />
                  )}

                  <span className="UserName">
                    {
                      // props.userData?.name?.split(" ")[0] || userData.name?.split(" ")[0]
                      props.userData?.hasOwnProperty("name") ? (
                        <span>{props.userData?.name?.split(" ")[0]}</span>
                      ) : (
                        <span>{userData?.name?.split(" ")[0]}</span>
                      )
                    }
                  </span>
                </span>
              </>
            ) : (
              ""
            )}
            {props.userData ? (
              ""
            ) : (
              <>
                <li>
                  <NavLink to="/register">{strings.navbar.signUp}</NavLink>
                </li>
                <li>
                  <NavLink to="/signin">{strings.navbar.signin}</NavLink>
                </li>
              </>
            )}
            <li>
              <Link
                onClick={() => {
                  if (strings.getLanguage() == "en") {
                    localStorage.setItem("lang", "ar");
                    strings.setLanguage("ar");
                  } else {
                    localStorage.setItem("lang", "en");
                    strings.setLanguage("en");
                  }
                  window.reload();
                }}
                to="#"
              >
                {strings.getLanguage() == "en" ? "العربية" : "English"}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
