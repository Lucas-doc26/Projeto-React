import React from 'react';
import { Link } from "react-router-dom";
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <a
        className="active"
        href="https://github.com/Lucas-doc26/Projeto-React"
        target="_blank"
        rel="noreferrer"
      >
        Lucas de Oliveira Cunha
      </a>
      <Link to="/">Home</Link>
      <Link to="/Crud">Crud</Link>
    </div>
  );
};

export default Sidebar;
