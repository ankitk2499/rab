import React from "react";
import Sidebar from "./Sidebar";
import MainPage from "./MainPage";
import { BrowserRouter } from "react-router-dom";

export default function FullPage() {
  return (
    <div style={{ display: "flex" }}>
      <BrowserRouter>
        <Sidebar />
        <MainPage />
      </BrowserRouter>
    </div>
  );
}
