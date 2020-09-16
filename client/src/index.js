import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import {HashRouter as Router} from "react-router-dom";
import {WaslniProvider} from "./WaslniContext";
import {AuthProvider} from "./AuthContext";
import {ToastProvider, useToasts} from "react-toast-notifications";
import "bootstrap/dist/css/bootstrap.css";

ReactDOM.render(
  <AuthProvider>
    <ToastProvider>
      <WaslniProvider>
        <Router>
          <App />
        </Router>
      </WaslniProvider>
    </ToastProvider>
  </AuthProvider>,
  document.getElementById("root")
);

serviceWorker.register();
