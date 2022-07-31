import React from "react";

import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoutes() {
  const isAuth = window.localStorage.getItem("response");
  const res = JSON.parse(isAuth);
  console.log(res);
  return res.rol === "admin" ? <Outlet /> : <Navigate to="/page-not-found" />;
}
