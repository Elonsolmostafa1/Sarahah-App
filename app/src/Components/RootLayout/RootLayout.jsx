import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

export default function RootLayout() {
  return (
    <>
      <Navbar />
      <Outlet></Outlet>
    </>
  );
}
