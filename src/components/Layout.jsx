import React from "react";
import Nav from "./Nav";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="bg-slate-100 relative h-screen overflow-y-auto lg:max-w-[1400px] mx-auto dark:bg-black dark:text-white">
      <Nav />
      <Outlet />
    </div>
  );
};

export default Layout;