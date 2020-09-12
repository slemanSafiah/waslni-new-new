import React, {useState, useEffect, useContext} from "react";
import axios from "axios";
import {AuthContext} from "./AuthContext";
import io from "socket.io-client";

export const WaslniContext = React.createContext();

export function WaslniProvider(Props) {
  const [avelDriv, setAvelDriv] = useState([]);
  const [currentlocation, setCurrentlocation] = useState({lat: "", long: ""});
  const authContext = useContext(AuthContext);
  const token = authContext.auth;
  const [chat, setChat] = useState([]);

  useEffect(async () => {
    const result = await axios
      .get(`https://waslni-api.herokuapp.com/driver/get_available`)
      .then((res) => {
        res.data.data.map((driver) => {
          avelDriv.push(driver);
        });
      })
      .catch((err) => {
        alert("error");
      });
    avelDriv.map((co) => console.log("dssdsd", co));
  }, []);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position.coords.latitude, position.coords.longitude);
      setCurrentlocation({
        lat: position.coords.latitude,
        long: position.coords.longitude,
      });
    });
  }, []);
  useEffect(() => {
    async function fetchData() {
      if (localStorage.getItem("isdriver")) {
        const data = {driver: localStorage.getItem("number")};
        console.log("jkhk");
        const res = await axios({
          method: "post",
          url: "https://waslni-api.herokuapp.com/chat/get_driver_chat",
          data: data,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        res.data.messages.map((message) => chat.push(message));
        // chat.map((e) => console.log(e));
      } else {
        const data = {client: localStorage.getItem("number")};
        const res = await axios({
          method: "post",
          url: "https://waslni-api.herokuapp.com/chat/get_client_chat",
          data: data,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        res.data.messages.map((message) => {
          chat.push(message);
        });
      }
    }
    fetchData();
  }, []);
  return (
    <WaslniContext.Provider
      value={{
        avelDriv,
        currentlocation,
        chat,
        setChat,
      }}
    >
      {Props.children}
    </WaslniContext.Provider>
  );
}
