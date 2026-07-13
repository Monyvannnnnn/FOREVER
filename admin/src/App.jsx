import React from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Routes, Route, useSearchParams } from "react-router-dom";
import List from "./pages/List";
import Order from "./pages/Order";
import { useState } from "react";
import Login from "./components/Login";
import Add from "./pages/Add";
import { ToastContainer } from "react-toastify";
import "react-toastify";
import { useEffect } from "react";
export const backendUrl = import.meta.env.VITE_BACKEND_URL;
const App = () => {
  const [token, setToken] = useState("");

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <ToastContainer />
      {token === "" ? (
        <Login setToken={setToken} />
      ) : (
        <>
          {" "}
          <Navbar />
          <hr />
          <div className="flex w-full">
            <Sidebar />
            <div className="w-[70%] mx-auto ml[max(5vw,25px)] my-8 text-gray-600 text-base">
              <Routes>
                <Route path="/add" element={<Add />} />
                <Route path="/list" element={<List />} />
                <Route path="/order" element={<Order />} />
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
