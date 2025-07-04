import React from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./Sidebar";
import DataList from "./DataList";
import Crud from "./Crud"; 
import User from "./User";
import "./App.css";

//função principal do projeto
function App() {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flex: 1, padding: "20px" }}>
        <Routes>
          <Route path="/" element={<DataList />} />
          <Route path="/crud" element={<Crud />} />
          <Route path="/usuarios/:id" element={<User />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
