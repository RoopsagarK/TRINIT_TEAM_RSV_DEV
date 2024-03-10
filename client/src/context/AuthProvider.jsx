import React, { createContext, useState, useEffect } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    if (Object.keys(user).length === 0) {
      console.log(localStorage.getItem("username"));
      console.log(localStorage.getItem("email"));
      setUser({
        username: localStorage.getItem("username"),
        email: localStorage.getItem("email"),
        user_id : localStorage.getItem("user_id")
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
