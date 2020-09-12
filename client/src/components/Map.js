import React, {useRef, useEffect, useState, useContext} from "react";
import mapboxgl from "mapbox-gl";
import axios from "axios";
import {AuthContext} from "./../AuthContext";
import {WaslniContext} from "./../WaslniContext";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import * as turf from "@turf/turf";
import io from "socket.io-client";
import {feature} from "@turf/turf";
import Voice from "./Voice";
mapboxgl.accessToken =
  "pk.eyJ1IjoidGFtYXJhamFtbW91bCIsImEiOiJja2NxMG1kNm8xMGtzMnNsbWExbGtpbm8zIn0.bgQ23ChS-u88zfS7dm6Fbw";

const socket = io.connect("http://localhost:4001");

const Map = () => {
  const [userLocation, setUserLocation] = useState({
    lon: "",
    lat: "",
  });
  const [dest, setDest] = useState({lat: "", long: ""});
  const [destvoice, setDestvoice] = useState("");
  const authContext = useContext(AuthContext);
  const waslniContext = useContext(WaslniContext);
  const mapContainerRef = useRef(null);
  const availabledrivers = useContext(WaslniContext);
  const token = authContext.auth;
  const [driver, setDriver] = useState([]);
  const data = {
    number: localStorage.getItem("number"),
    long: userLocation.lon,
    lat: userLocation.lat,
  };

  useEffect(() => {
    setUserLocation({
      lat: waslniContext.currentlocation.lat,
      lon: waslniContext.currentlocation.long,
    });
    console.log(waslniContext.currentlocation, "kjkj");
    availabledrivers.avelDriv.map((dri) => {
      driver.push(dri);
      console.log(dri, "l;kl;");
    });
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [36.7166667, 34.7333334],
      zoom: 12.5,
    });
    driver.map((mar) => {
      var el = document.createElement("div");
      el.className = "marker";
      new mapboxgl.Marker(el).setLngLat([mar.long, mar.lat]).addTo(map);
    });

    mapboxgl.setRTLTextPlugin(
      "https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js",
      null,
      true
    );

    map.addControl(new mapboxgl.NavigationControl(), "bottom-right");

    var geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      language: "Ar",

      marker: true,
    });
    map.addControl(geocoder, "top-left");
    if (destvoice) {
      axios
        .get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${destvoice}.json?access_token=${mapboxgl.accessToken}`
        )
        .then((res) => {
          console.log("rrrrr", res.data.features[0].center);
          new mapboxgl.Marker()
            .setLngLat([
              res.data.features[0].center[0],
              res.data.features[0].center[1],
            ])
            .addTo(map);
          setDest({
            let: res.data.features[0].center[0],
            long: res.data.features[0].center[1],
          });
          map.flyTo({
            center: [
              res.data.features[0].center[0],
              res.data.features[0].center[1],
            ],
            essential: true,
          });
        })
        .catch((err) => {});
    }
    geocoder.on("result", function (ev) {
      console.log(ev.result.geometry);
      setDest({
        lat: ev.result.geometry.coordinates[0],
        long: ev.result.geometry.coordinates[1],
      });
    });

    return () => map.remove();
  }, []);
  useEffect(() => {
    async function fetchdata() {
      if (userLocation.lat && dest.lat) {
        var options = {units: "kilometers"};
        driver.map((store) => {
          var from = turf.point([store.long, store.lat]);
          var to = turf.point([userLocation.lon, userLocation.lat]);
          Object.defineProperty(store, "distance", {
            value: turf.distance(from, to, options),
            writable: true,
            enumerable: true,
            configurable: true,
          });
        });

        driver.sort(function (a, b) {
          if (a.distance > b.distance) {
            return 1;
          }
          if (a.distance < b.distance) {
            return -1;
          }
          return 0;
        });
        driver.map((st) => console.log("kljkl", st));

        console.log(driver[0]);
        localStorage.setItem("driver", driver[0].number);
        authContext.setMap(1);
        console.log(userLocation, "kljlkj", dest);
        const data = {
          source_lat: userLocation.lat,
          source_long: userLocation.lon,
          user_number: localStorage.getItem("number"),
          driver_number: driver[0].number,
          dest_lat: dest.lat,
          dest_long: dest.long,
          cost: driver[0].distance * 50,
          dist: driver[0].distance,
        };
        console.log("aaaaa", socket.id, data);
        socket.emit("trip", data);
        if (authContext.isdriver) {
          const res = await axios({
            method: "post",
            url: "https://waslni-api.herokuapp.com/driver/update_location",
            data: data,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }).then((res) => console.log(res));
        }
      }
    }
    fetchdata();
  }, [userLocation, dest.lat]);
  return (
    <div className="container d-flex justify-content-center">
      <h1 className="text-secondary mb-5 maptext"> Order a car </h1>{" "}
      <div className="map-container" ref={mapContainerRef} /> <Voice />
    </div>
  );
};
export default Map;
