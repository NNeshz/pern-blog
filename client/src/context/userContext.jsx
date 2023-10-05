/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import axios from "../api/axios.js";
import Cookie from "js-cookie";

export const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(true);

  const signup = async (user) => {
    try {
      const res = await axios.post("/signup", user);
      setUser(res.data);
      setIsAuth(true);

      return res.data;
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }
      setErrors([error.response.data.message]);
    }
  };

  const signin = async (user) => {
    try {
      const res = await axios.post("/signin", user);
      setUser(res.data);
      setIsAuth(true);

      return res.data;
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }
      setErrors([error.response.data.message]);
    }
  };

  const signout = async () => {
    await axios.post("/logout");
    setUser(null);
    setIsAuth(false);
  };

  useEffect(() => {
    setLoading(true);
    if (Cookie.get("token")) {
      axios
        .get("/profile")
        .then((res) => {
          setUser(res.data);
          setIsAuth(true);
        })
        .catch((err) => {
          if (err) {
            setUser(null);
            setIsAuth(false);
          }
        });
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    const clean = setTimeout(() => {
      setErrors(null);
    }, 5000);

    return () => clearTimeout(clean);
  }, [errors]);

  return (
    <UserContext.Provider
      value={{ signup, signin, signout, user, errors, isAuth, loading }}
    >
      {children}
    </UserContext.Provider>
  );
}
