import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { HashRouter as Router } from "react-router-dom";
import { WaslniProvider } from "./WaslniContext";
import { AuthProvider } from "./AuthContext";

ReactDOM.render(
  <AuthProvider>
    <WaslniProvider>
      <Router>
        <App />
      </Router>
    </WaslniProvider>
  </AuthProvider>,
  document.getElementById("root")
);

serviceWorker.register();
