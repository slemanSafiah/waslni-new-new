import React, {useEffect, useState, useContext} from "react";
import {AuthContext} from "./../AuthContext";
import {ToastProvider, useToasts} from "react-toast-notifications";
import axios from "axios";
import {WaslniContext} from "./../WaslniContext";

export default function Mytrip() {
  const authContext = useContext(AuthContext);
  const [trip, setTrip] = useState([]);
  const {addToast} = useToasts();
  const token = authContext.auth;

  const waslniContext = useContext(WaslniContext);
  useEffect(() => {
    waslniContext.trip.map((e) => setTrip((p) => [...p, e]));
  }, []);
  return (
    <div className="container ">
      {trip.map((e) => console.log(e))}
      <h1 className="text-center mt-3 mb-5 text-secondary">User Trip</h1>
      <div className="row">
        {trip.map((e) => (
          <div className="col-md-12 mb-5">
            <div className="col-md-4 bg-light rounded shadow">
              <h2 className="text-center color">Trip</h2>
              <h3 className="pt-2 pl-2">from: {e.from}</h3>
              <h3 className="pt-2 pl-2">to: {e.to}</h3>
              <h4 cclassName="pt-2 pl-2 pb-2">date :{e.date}</h4>
            </div>
            <div className="col-md-8"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
