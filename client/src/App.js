import React, { Component, useRef, useEffect, useState, useContext } from "react";
import { CircleArrow as ScrollUpButton } from "react-scroll-up-button";
import { Route, Switch, Redirect, Link } from "react-router-dom";
import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";
import Default from "./components/Layout/Default";
import Home from "./components/Home";
import Loading from "./components/Layout/Loading";
import Login from "./components/Login";
import Signup from "./components/Signup";
import SignupDriver from "./components/SignupDriver";
import LoginDriver from "./components/LoginDriver";
import Contactus from "./components/Contactus";
import Map from "./components/Map";
import Profile from "./components/Profile";
import Mytrip from "./components/Mytrip";
import Chat from "./components/Chat";
import "./App.css";
import WOW from "wowjs";
import io from "socket.io-client";
import { AuthContext } from "./AuthContext";
import { WaslniContext } from "./WaslniContext";
import axios from "axios";
const socket = io.connect("http://localhost:4001");

export default function App() {
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const number = localStorage.getItem("number");
  const authContext = useContext(AuthContext);
  const waslniContext = useContext(WaslniContext);

  useEffect(() => {
    console.log(socket.id, "ppppppppppp");
    socket.on("notification", (data) => {
      console.log(data, 'jjjjjjjjjjjjj')
      waslniContext.setTrip((prevState) => [...prevState, data]);
      authContext.setIsavailabe(false);
      localStorage.setItem("isavailable", false);
      localStorage.setItem("client", data.client)
      alert(`you have new trip from (${data.from}) to (${data.to})`);
    });
    socket.on("message", (message) => {
      console.log(message);
      alert("new message");
      waslniContext.chat.push(message)
      console.log(waslniContext.chat)
      setShow(show)
    });
    if (number) {
      socket.emit("join", number);
    }
  }, []);

  useEffect(() => {
    new WOW.WOW().init();

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  return (
    <div>
      {" "}
      {loading ? (
        <Loading />
      ) : (
          <React.Fragment>
            <Navbar />
            <Switch>
              <Route exact path="/" component={Home} />{" "}
              <Route path="/login" component={Login} />{" "}
              <Route path="/contactus" component={Contactus} />{" "}
              <PrivateRoute path="/map" component={Map} />{" "}
              <Route path="/signup" component={Signup} />{" "}
              <Route path="/logindriver" component={LoginDriver} />{" "}
              <Route path="/signupdriver" component={SignupDriver} />{" "}
              <PrivateRoute path="/profile" component={Profile} />{" "}
              <PrivateRoute path="/mytrip" component={Mytrip} />{" "}
              <PrivateRoute path="/chat" component={Chat} />{" "}
              <Route component={Default} />{" "}
            </Switch>{" "}
            <Footer />{" "}
            {(function () {
              if
              (authContext.map || (!authContext.isavailable && localStorage.getItem("isdriver"))) {
                return (
                  <>
                    <i
                      className="far fa-comment-dots msg fa-2x float-right pt-3 pl-3 pb-2"
                      onClick={() => setShow(!show)}
                    />{" "}
                    {show ? <Chat /> : ""}{" "}
                  </>
                );
              } else {
                return "";
              }
            })()}{" "}
          </React.Fragment>
        )}{" "}
    </div>
  );
}

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        localStorage.getItem("token") ? (
          <Component {...props} />
        ) : (
            <Redirect
              to={{
                pathname: "/login",
              }}
            />
          )
      }
    />
  );
}
