import React, {useState, useEffect} from "react";

export const AuthContext = React.createContext();

export function AuthProvider(Props) {
  const [auth, setAuth] = useState("");
  const [number, setNumber] = useState("");
  const [name, setName] = useState();
  const [password, setPassword] = useState("");
  const [isdriver, setIsdriver] = useState("");
  const [isavailabe, setIsavailabe] = useState("");

  const [map, setMap] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const num = localStorage.getItem("number");
    const password = localStorage.getItem("password");
    const name = localStorage.getItem("name");
    const isdr = localStorage.getItem("isdriver");
    const isav = localStorage.getItem("isavailabe");

    if (token) {
      setAuth(token);
      setNumber(num);
      setPassword(password);
      setName(name);
      setIsdriver(isdr);
      setIsavailabe(isav);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        name,
        number,
        password,
        isdriver,
        map,
        setMap,
        isavailabe,
        setIsavailabe,
      }}
    >
      {Props.children}
    </AuthContext.Provider>
  );
}
