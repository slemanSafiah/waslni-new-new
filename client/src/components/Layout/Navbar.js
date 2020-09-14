import React, {useContext, useEffect} from "react";
import {Link, NavLink} from "react-router-dom";
import logo from "./../../img/logo.png";
import {AuthContext} from "./../../AuthContext";
import {useHistory} from "react-router-dom";
import Tooltip from "react-tooltip-lite";
import ReactWOW from "react-wow";
import axios from "axios";
export default function Navbar() {
  const authContext = useContext(AuthContext);

  let history = useHistory();

  function logout() {
    localStorage.clear();

    authContext.setAuth("");
    history.push("/login");
  }
  function isavailabe() {
    const data = {number: localStorage.getItem("number")};
    const token = localStorage.getItem("token");
    console.log("kjkljlk");
    const res = axios({
      method: "post",
      url: "http://localhost:5000/driver/availabe",
      data: data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      localStorage.setItem("isavailabe", res.data.data);
      authContext.setIsavailabe(res.data.data);
      console.log(res.data.data);
    });
  }
  return (
    <nav className="navbar  bg-white navbar-expand-lg navbar-light">
      <div className="container">
        <ReactWOW animation="bounce">
          <Link className="bar-brand " to="/">
            <img src={logo} style={{width: "80px"}} />{" "}
          </Link>
        </ReactWOW>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarMenue"
          aria-controls="navbarMenue"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse ml-3" id="navbarMenue"></div>
        <div className="collapse navbar-collapse" id="navbarMenue">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item ">
              <NavLink
                to="/"
                exact
                className="nav-link"
                activeClassName="active"
              >
                {" "}
                <Tooltip content="Home Page" background="#f4f4f4">
                  Home Page
                </Tooltip>
              </NavLink>
            </li>
            <li className="nav-item ">
              <NavLink
                to="/contactus"
                activeClassName="active"
                className="nav-link"
              >
                {" "}
                <Tooltip content="Contact us" background="#f4f4f4">
                  Contact us
                </Tooltip>
              </NavLink>
            </li>
            {(function () {
              if (authContext.auth) {
                return (
                  <NavLink
                    to="/mytrip"
                    activeClassName="active"
                    className="nav-link"
                  >
                    <Tooltip content="check your trip" background="#f4f4f4">
                      MyTrip
                    </Tooltip>
                  </NavLink>
                );
              } else {
                return "";
              }
            })()}
          </ul>
          <div></div>
          {(function () {
            if (authContext.auth && !localStorage.getItem("isdriver")) {
              return (
                <NavLink
                  to="/map"
                  activeClassName="active"
                  className="nav-link"
                >
                  <Tooltip content="order a car" background="#f4f4f4">
                    <i className="fas fa-car loginbtn	"></i>
                  </Tooltip>
                </NavLink>
              );
            } else {
              return "";
            }
          })()}
          {(function () {
            if (authContext.auth) {
              return (
                <Link to="/profile" className="mr-auto ">
                  <Tooltip content="edit your profile" background="#f4f4f4">
                    <i className="fas fa-user-circle loginbtn"></i>
                  </Tooltip>
                </Link>
              );
            } else {
              return "";
            }
          })()}
          {(function () {
            if (localStorage.getItem("isdriver")) {
              return (
                <i
                  className={
                    authContext.isavailabe
                      ? "fa fa-toggle-on fa-2x text-primary"
                      : "text-secondary fa fa-toggle-on fa-2x "
                  }
                  aria-hidden="true"
                  onClick={!authContext.isavailabe ? isavailabe : ""}
                ></i>
              );
            } else {
              return "";
            }
          })()}

          {(function () {
            if (!authContext.auth) {
              return (
                <NavLink
                  to="/logindriver"
                  activeClassName="active"
                  className="mr-auto loginbtn"
                >
                  <span className="ml-2 ">
                    sign in driver <i className="fas fa-user-alt	"></i>
                  </span>
                </NavLink>
              );
            }
          })()}
          {(function () {
            if (authContext.auth) {
              return (
                <span className="ml-2 mr-auto ml-3 loginbtn" onClick={logout}>
                  log out <i className="fas fa-user-alt	"></i>
                </span>
              );
            } else {
              return (
                <NavLink
                  to="/login"
                  activeClassName="active"
                  className="mr-auto loginbtn"
                >
                  <span className="ml-2 ">
                    sign in <i className="fas fa-user-alt	"></i>
                  </span>
                </NavLink>
              );
            }
          })()}
        </div>
      </div>
    </nav>
  );
}
