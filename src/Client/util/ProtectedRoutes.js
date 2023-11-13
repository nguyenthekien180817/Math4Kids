import { Outlet } from "react-router-dom";
import HomePage from "../components/pages/HomePage";
import axios from "axios";
import { useState, useEffect } from "react";

export const ProtectedRoutes = () => {
  const [account, setAccount] = useState({
    email: null,
    level: null,
  });
  useEffect(() => {
    axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:4000/account/get-user",
    })
      .then((response) => {
        setAccount({
          email: response.data.email,
          level: response.data.level,
        });
      })
      .catch((err) => {});
  }, []);

  return account.email != null && account.level != null ? (
    <Outlet />
  ) : (
    <HomePage />
  );
};

export const ProtectedTeacherRoutes = () => {
  const [account, setAccount] = useState({
    email: null,
    level: null,
  });
  useEffect(() => {
    axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:4000/account/get-user",
    })
      .then((response) => {
        setAccount({
          email: response.data.email,
          level: response.data.level,
        });
      })
      .catch((err) => {});
  }, []);

  return account.level == "admin" || account.level == "teacher" ? (
    <Outlet />
  ) : (
    <HomePage />
  );
};

export const ProtectedAdminRoutes = () => {
  const [account, setAccount] = useState({
    email: null,
    level: null,
  });
  useEffect(() => {
    axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:4000/account/get-user",
    })
      .then((response) => {
        setAccount({
          email: response.data.email,
          level: response.data.level,
        });
      })
      .catch((err) => {});
  }, []);

  return account.email != null && account.level == "admin" ? (
    <Outlet />
  ) : (
    <HomePage />
  );
};

export const ProtectedWhenLoggedIn = () => {
  const [account, setAccount] = useState({
    email: null,
    level: null,
  });
  useEffect(() => {
    axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:4000/account/get-user",
    })
      .then((response) => {
        setAccount({
          email: response.data.email,
          level: response.data.level,
        });
      })
      .catch((err) => {});
  }, []);

  return (account.email == null && account.level == null) ||
    (account.email != null && account.level == "admin") ? (
    <Outlet />
  ) : (
    <HomePage />
  );
};
