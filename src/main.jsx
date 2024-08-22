import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import { AuthProvider } from "./context/AuthProvider.jsx";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import NotFound from "./pages/NotFound.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Collections from "./pages/Collections.jsx";
import RequireAuth from "./components/RequireAuth.jsx";
import Unauthorized from "./pages/Unauthorized.jsx";
import CreateCollection from "./pages/CreateCollection.jsx";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<Home />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      <Route path="/collections" element={<RequireAuth allowedRole={"USER"} />}>
        <Route path="" element={<Collections />} />
        <Route path="create" element={<CreateCollection />} />
        {/* <Route path="update" element={<CreateCollection />} /> */}
        {/* <Route path="id" element={<CreateCollection />} /> */}
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
