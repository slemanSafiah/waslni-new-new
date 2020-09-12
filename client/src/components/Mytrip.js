import React, {useEffect, useState, useContext} from "react";
import axios from "axios";
import {AuthContext} from "./../AuthContext";
import {ToastProvider, useToasts} from "react-toast-notifications";

export default function Mytrip() {
  const authContext = useContext(AuthContext);
  const [trip, setTrip] = useState([]);
  const token = authContext.auth;
  const {addToast} = useToasts();

  useEffect(async () => {
    if (authContext.isdriver) {
      const result = await axios({
        method: "post",
        url: `https://waslni-api.herokuapp.com/trip/get_trips_by_driver`,
        data: localStorage.getItem("number"),
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          console.log(res);
          res.data.data.map((tri) => {
            trip.push(tri);
          });
        })
        .catch((err) => {
          addToast("error try again", {appearance: "error"});
        });
    } else {
      const result = await axios({
        method: "post",
        url: `https://waslni-api.herokuapp.com/trip/get_trips_by_user`,
        data: localStorage.getItem("number"),
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          console.log(res);
          res.data.data.map((tri) => {
            trip.push(tri);
          });
        })
        .catch((err) => {
          addToast("error try again", {appearance: "error"});
        });
    }
  }, []);
  return (
    <div className="container">
      <div className="row">
        {trip.map((trip) => {
          return (
            <div className="col-md-12">
              {trip.sourse_lat}
              {trip.sourse_long}
              {trip.dest_lat}
              {trip.dest_lat}
            </div>
          );
        })}
      </div>
    </div>
  );
}
