import React from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Routes, Route, Navigate } from "react-router-dom";
import List from "./pages/List";
import Order from "./pages/Order";
import { useState } from "react";
import Login from "./components/Login";
import Add from "./pages/Add";
import Banner from "./pages/Banner";
import { ToastContainer } from "react-toastify";
import "react-toastify";
import { useEffect } from "react";
const cleanBackendUrl = (rawUrl) => {
  let url = rawUrl ? String(rawUrl).trim() : "http://localhost:4000";
  if (url.includes("VITE_BACKEND_URL")) {
    url = url.replace(/VITE_BACKEND_URL\s*=?\s*/gi, "").trim();
  }
  url = url.replace(/^['"]|['"]$/g, "").trim().replace(/\/+$/, "");

  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    if (url.includes("localhost") || url.includes("127.0.0.1")) {
      url = "http://" + url;
    } else {
      url = "https://" + url;
    }
  }

  if (url.includes("localhost") || url.includes("127.0.0.1")) {
    url = url.replace(/^https:\/\//i, "http://");
  }

  return url;
};

export const backendUrl = cleanBackendUrl(import.meta.env.VITE_BACKEND_URL);
export const currency = '$'
const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token')?localStorage.getItem('token'):'');

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <ToastContainer limit={1} autoClose={2000} />
      {token === "" ? (
        <Login setToken={setToken} />
      ) : (
        <>
          {" "}
          <Navbar setToken={setToken} />
          <hr />
          <div className="flex w-full">
            <Sidebar />
            <div className="w-[70%] mx-auto ml[max(5vw,25px)] my-8 text-gray-600 text-base">
              <Routes>
                <Route path="/" element={<Navigate to="/order" replace />} />
                <Route path="/add" element={<Add token={token}/>} />
                <Route path="/list" element={<List token={token}/>} />
                <Route path="/order" element={<Order token={token}/>} />
                <Route path="/banner" element={<Banner token={token}/>} />
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
