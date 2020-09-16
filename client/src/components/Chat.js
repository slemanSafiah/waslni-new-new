import React, { useState, useEffect, useContext, useRef } from "react";
import io from "socket.io-client";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import { AuthContext } from "./../AuthContext";
import { WaslniContext } from "./../WaslniContext";

const socket = io.connect("http://localhost:4001");

export default function Chat() {
  const authContext = useContext(AuthContext);
  const waslniContext = useContext(WaslniContext);
  const token = authContext.auth;
  const messagesEndRef = useRef(null);

  const [message, setMessage] = useState("");
  const [client, setClient] = useState({
    isdriver: 0,
    client: localStorage.getItem("number"),
    driver: localStorage.getItem("driver"),
  });
  const [driver, setDriver] = useState({
    isdriver: 1,
    driver: localStorage.getItem("number"),
    client: localStorage.getItem("client"),
  });
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({
      behavior: "smooth",
    });
  };

  const onMessageSubmit = (e) => {
    e.preventDefault();

    localStorage.getItem("isdriver")
      ? socket.emit("message", {
        message,
        driver: driver.driver,
        client: driver.client,
        isdriver: driver.isdriver,
      })
      : socket.emit("message", {
        message,
        driver: client.driver,
        client: client.client,
        isdriver: client.isdriver,
      });
    console.log(
      {
        message,
        driver: driver.driver,
        client: driver.client,
        isdriver: driver.isdriver,
      },
      "lkkljkljlkjkl"
    );
    localStorage.getItem("isdriver")
      ? waslniContext.setChat((prevState) => [
        ...prevState,
        {
          message,
          driver: driver.driver,
          client: driver.client,
          isdriver: driver.isdriver,
        },
      ])
      : waslniContext.setChat((prevState) => [
        ...prevState,
        {
          message,
          driver: client.driver,
          client: client.client,
          isdriver: client.isdriver,
        },
      ]);

    setMessage("");
  };
  const renderChat = () => {
    return waslniContext.chat.map((mes) => (
      <div
        className={
          mes.isdriver
            ? " float-left d-inline text-white rounded bg-white mb-3 col-md-8 shadow"
            : " text-white d-inline float-right mb-3 rounded bg-white col-md-8 shadow"
        }
      >
        <h5 className="p-2 ">
          <span className="text-dark " style={{ wordWrap: "break-word" }}>
            {mes.message}{" "}
          </span>
          <span class="pt-2 pb-2">
            {" "}
            {mes.isdriver ? (
              <i className="fas fa-user-circle fa-1x p-1 mr-2 float-left rounded-circle background"></i>
            ) : (
                <i className="fas fa-car fa-1x p-1 ml-2 rounded-circle float-right background"></i>
              )}{" "}
          </span>{" "}
        </h5>{" "}
      </div>
    ));
  };
  return (
    <>
      <form className="bg-light container rounded shadow-lg chat">
        <h1 className="color mt-3  text-center mb-5"> Messanger </h1>{" "}
        <hr />
        <div className="row bg-light">
          <div
            className="col-md-12 render-chat mb-5 mm"
            style={{ overflowY: "auto", overflowX: "hidden" }}
          >
            {renderChat()}{" "}
          </div>{" "}
        </div>{" "}
        <div className="row bg-light pt-2 mb-3 ">
          <TextField
            name="message"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            id="outlined-multiline-static"
            variant="outlined"
            label="Message"
            className="bg-light rounded inputchat ml-2"
          />
          <span className="btn icon">
            {" "}
            <i
              className="	fas fa-arrow-right color fa-2x "
              onClick={onMessageSubmit}
            ></i>{" "}
          </span>
        </div>{" "}
      </form>{" "}
    </>
  );
}
