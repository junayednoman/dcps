"use client";
import { createContext, useEffect, useState } from "react";
export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState("");
  const [userName, setUserName] = useState("");
  useEffect(() => {
    setLoading(true);
    try {
      const userInfo = localStorage.getItem("userInfo");
      if (userInfo) {
        const { user_name, role: userRole } = JSON.parse(userInfo);
        setUserName(user_name);
        setRole(userRole);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const authInfo = {
    role,
    userName,
    loading,
  };
  return (
    <div>
      <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    </div>
  );
};

export default AuthContextProvider;
