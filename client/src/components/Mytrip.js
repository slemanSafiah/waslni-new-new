import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "./../AuthContext";
import { ToastProvider, useToasts } from "react-toast-notifications";
import axios from "axios";
import { WaslniContext } from "./../WaslniContext";
import img from "./../img/head3.jpg";
export default function Mytrip() {
  const authContext = useContext(AuthContext);
  const [trip, setTrip] = useState([]);
  const { addToast } = useToasts();
  const token = authContext.auth;



  useEffect(() => {
    async function feachdata() {
      const data = { number: localStorage.getItem("number") };
      if (authContext.isdriver) {
        const res = await axios({
          method: "post",
          url: `http://localhost:5000/trip/get_trips_by_driver`,
          data,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((res) => {
            console.log("rew", res);
            res.data.data.map((tri) => {
              trip.push(tri);
            });
          })
          .catch((err) => {
            addToast("error try again", { appearance: "error" });
          });
      } else {
        const res = await axios({
          method: "post",
          url: `http://localhost:5000/trip/get_trips_by_user`,
          data,
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
            addToast("error try again", { appearance: "error" });
          });
      }
    }
    console.log(trip);
    feachdata();
  }, []);










  return (
    <div
      className="container shadow rounded mt-5"
      style={{ marginBottom: "50px", height: "500px" }}
    >
      <div className="row ">
        <div className="col-md-6 " style={{ height: "500px", overflowY: "auto" }}>
          {" "}
          <h1 className="text-center mt-3 mb-5 color">User Trip</h1>
          <hr />
          <div className="triptrip ">
            {trip.map((e) => (
              <div className="w-50 mb-5 mr-5 bg-light rounded shadow texthov tripdiv ml-3">
                <h3 className="text-center color mt-3">Trip</h3>
                <h5 className="pt-2 pl-2">
                  {" "}
                  <span>
                    <i class=" fas fa-map-marker	 icon"></i>
                  </span>{" "}
                  from:
                  <span
                    className="text-darken-3 ml-2"
                    style={{ fontSize: "10px" }}
                  >
                    {e.from}
                  </span>
                </h5>
                <h5 className="pt-2 pl-2 ">
                  {" "}
                  <span>
                    <i class=" fas fa-map-marker	 icon"></i>
                  </span>{" "}
                  to:{" "}
                  <span
                    className="text-darken-3 ml-2"
                    style={{ fontSize: "10px" }}
                  >
                    {e.to}
                  </span>
                </h5>
                <h5 className="pt-2 pl-2 pb-2">
                  <span>
                    <i class=" fas fa-calendar-alt	 icon"></i>
                  </span>{" "}
                  date :
                  <span
                    className="text-darken-3 ml-2"
                    style={{ fontSize: "10px" }}
                  >
                    {e.date}
                  </span>
                </h5>
              </div>
            ))}
          </div>
        </div>
        <div className="col-md-6">
          <img src={img} className="mytripimg rounded" />
        </div>
      </div>
    </div>
  );
}
