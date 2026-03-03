import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import axiosInstance from "../api/axiosInstance.js";

export const AuthContext = createContext(null);

const ADMIN_STORAGE_KEY = "adminUser";
const CUSTOMER_STORAGE_KEY = "customerUser";

const parseStoredUser = (storage, key) => {
  const raw = storage.getItem(key);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    storage.removeItem(key);
    return null;
  }
};

export function AuthProvider({ children }) {
  const [adminUser, setAdminUser] = useState(null);
  const [customerUser, setCustomerUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedAdmin = parseStoredUser(sessionStorage, ADMIN_STORAGE_KEY);
    const storedCustomer = parseStoredUser(localStorage, CUSTOMER_STORAGE_KEY);

    // Clear legacy admin persistence from older builds that used localStorage.
    localStorage.removeItem(ADMIN_STORAGE_KEY);

    setAdminUser(storedAdmin);
    setCustomerUser(storedCustomer);
    setLoading(false);
  }, []);

  const adminLogin = useCallback(async (email, password) => {
    const { data } = await axiosInstance.post("/auth/login", { username: email, password });
    const userData = data.data;
    setAdminUser(userData);
    sessionStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(userData));
    return userData;
  }, []);

  const customerSignup = useCallback(async ({ name, email, password }) => {
    const { data } = await axiosInstance.post("/auth/customer/signup", { name, email, password });
    const userData = data.data;
    setCustomerUser(userData);
    localStorage.setItem(CUSTOMER_STORAGE_KEY, JSON.stringify(userData));
    return userData;
  }, []);

  const customerLogin = useCallback(async ({ email, password }) => {
    const { data } = await axiosInstance.post("/auth/customer/login", { email, password });
    const userData = data.data;
    setCustomerUser(userData);
    localStorage.setItem(CUSTOMER_STORAGE_KEY, JSON.stringify(userData));
    return userData;
  }, []);

  const logoutAdmin = useCallback(() => {
    setAdminUser(null);
    sessionStorage.removeItem(ADMIN_STORAGE_KEY);
    localStorage.removeItem(ADMIN_STORAGE_KEY);
  }, []);

  const logoutCustomer = useCallback(() => {
    setCustomerUser(null);
    localStorage.removeItem(CUSTOMER_STORAGE_KEY);
  }, []);

  const getToken = useCallback(
    (role = "admin") => {
      if (role === "customer") return customerUser?.token;
      return adminUser?.token;
    },
    [adminUser, customerUser],
  );

  const getAuthConfig = useCallback(
    (role = "admin") => {
      const token = getToken(role);
      if (!token) return {};
      return { headers: { Authorization: `Bearer ${token}` } };
    },
    [getToken],
  );

  const value = useMemo(
    () => ({
      loading,
      adminUser,
      customerUser,
      user: adminUser,
      login: adminLogin,
      logout: logoutAdmin,
      adminLogin,
      customerSignup,
      customerLogin,
      logoutAdmin,
      logoutCustomer,
      getAuthConfig,
      isAdminAuthenticated: Boolean(adminUser),
      isCustomerAuthenticated: Boolean(customerUser),
    }),
    [
      loading,
      adminUser,
      customerUser,
      adminLogin,
      customerSignup,
      customerLogin,
      logoutAdmin,
      logoutCustomer,
      getAuthConfig,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
