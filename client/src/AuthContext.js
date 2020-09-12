import React, { useState, useEffect } from "react";
import { setNestedObjectValues } from "formik";

export const AuthContext = React.createContext();

export function AuthProvider(Props) {
  const [auth, setAuth] = useState("");
  const [number, setNumber] = useState("");
  const [name, setName] = useState();
  const [password, setPassword] = useState("");
  const [isdriver, setIsdriver] = useState("");
  const [map, setMap] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const num = localStorage.getItem("number");
    const password = localStorage.getItem("password");
    const name = localStorage.getItem("name");
    const isdr = localStorage.getItem("isdriver");

    if (token) {
      setAuth(token);
      setNumber(num);
      setPassword(password);
      setName(name);
      setIsdriver(isdr);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ auth, setAuth, name, number, password, isdriver, map, setMap }}
    >
      {Props.children}
    </AuthContext.Provider>
  );
}
