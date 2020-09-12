import React, {Component, useRef, useEffect, useState, useContext} from "react";
import {CircleArrow as ScrollUpButton} from "react-scroll-up-button";
import {Route, Switch, Redirect, Link} from "react-router-dom";
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
import Driver from "./components/Driver";
import Map from "./components/Map";
import Profile from "./components/Profile";
import Mytrip from "./components/Mytrip";
import Chat from "./components/Chat";
import "./App.css";
import WOW from "wowjs";
import io from "socket.io-client";
import {AuthContext} from "./AuthContext";
import Voice from "./components/Voice";
import {WaslniContext} from "./WaslniContext";
import {ToastProvider, useToasts} from "react-toast-notifications";

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
      console.log("hgjhgjh", data);
      localStorage.setItem("client", data.client);
      alert("dkjdlk");
    });
    socket.on("message", (message) => {
      console.log(message);
      alert("new message");
      waslniContext.setChat((prevState) => [...prevState, message]);
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
          <ToastProvider>
            <Navbar />
            <Switch>
              <Route exact path="/" component={Home} />{" "}
              <Route path="/login" component={Login} />{" "}
              <Route path="/contactus" component={Contactus} />{" "}
              <Route path="/voice" component={Voice} />{" "}
              <PrivateRoute path="/map" component={Map} />{" "}
              <PrivateRoute path="/driver" component={Driver} />{" "}
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
              if (authContext.map || localStorage.getItem("isdriver")) {
                return (
                  <>
                    <i
                      className="far fa-comment-dots msg fa-3x float-right pt-4 pl-4"
                      onClick={() => setShow(!show)}
                    />{" "}
                    {show ? <Chat /> : ""}{" "}
                  </>
                );
              } else {
                return "";
              }
            })()}{" "}
          </ToastProvider>
        </React.Fragment>
      )}{" "}
    </div>
  );
}

function PrivateRoute({component: Component, ...rest}) {
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
