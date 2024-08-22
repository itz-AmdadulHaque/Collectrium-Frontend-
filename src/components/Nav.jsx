import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import {
  Button,
  Avatar,
  Dropdown,
  Navbar,
  DarkThemeToggle,
} from "flowbite-react";

function Nav() {
  const { auth, setAuth } = useAuth();
  const [loading, setLoading] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      setLoading(true);
      const response = await axiosPrivate.get("/users/logout");
      // console.log(response);

      setAuth({});
      setLoading(false);
      navigate("/login");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <Navbar className="absolute w-full z-50" fluid rounded>
      <Navbar.Brand href="/">
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Collecterium
        </span>
      </Navbar.Brand>
      <div className="flex gap-2 md:order-2">
        <Button color="light">Search</Button>
        {auth?.user && (
          <Dropdown
            arrowIcon={false}
            inline
            label={<Avatar alt="User settings" rounded />}
          >
            <Dropdown.Header>
              <span className="block text-sm">{auth?.user?.name}</span>
              <span className="block truncate text-sm font-medium">
                {auth?.user?.email}
              </span>
            </Dropdown.Header>
            <Dropdown.Item onClick={handleLogout}>Sign out</Dropdown.Item>
          </Dropdown>
        )}
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <NavLink
          to="/"
          className={({ isActive }) => `p-2 ${isActive ? "text-blue-600" : ""}`}
        >
          Home
        </NavLink>
        {auth?.user?.role === "ADMIN" ? (
          <>
            <NavLink
              to="/admin/users"
              className={({ isActive }) =>
                `p-2 ${isActive ? "text-blue-600" : ""}`
              }
            >
              Users
            </NavLink>
          </>
        ) : auth?.user ? (
          <>
            <NavLink
              to="/collections"
              className={({ isActive }) =>
                `p-2 ${isActive ? "text-blue-600" : ""}`
              }
            >
              Collections
            </NavLink>
          </>
        ) : (
          <>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `p-2 ${isActive ? "text-blue-600" : ""}`
              }
            >
              Login
            </NavLink>
            <NavLink
              to="/signup"
              className={({ isActive }) =>
                `p-2 ${isActive ? "text-blue-600" : ""}`
              }
            >
              Signup
            </NavLink>
          </>
        )}

        <DarkThemeToggle />
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Nav;
