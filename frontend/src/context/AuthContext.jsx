import { createContext, useState, useEffect, useCallback } from "react";
import axiosInstance from "../api/axiosInstance.js";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("adminUser");
    if (stored) {
      const parsed = JSON.parse(stored);
      setUser(parsed);
      axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${parsed.token}`;
    }
    setLoading(false);
  }, []);

  const login = useCallback(async (username, password) => {
    const { data } = await axiosInstance.post("/auth/login", { username, password });
    const userData = data.data;
    setUser(userData);
    localStorage.setItem("adminUser", JSON.stringify(userData));
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${userData.token}`;
    return userData;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("adminUser");
    delete axiosInstance.defaults.headers.common["Authorization"];
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
