import React from "react";
import { DataDashboard } from "./DataDashboard";
import { useNavigate } from "react-router-dom";
import { AiFillDashboard } from "react-icons/ai";
import HeaderBack from "../HeaderBack/HeaderBack";
import "./dashboard.scss";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div>
      <HeaderBack />
      <div className="dashboard_allContainer">
        <h1 className="dashboard-tituloPrincipal">
          <AiFillDashboard />
          Mesa de trabajo
        </h1>
        <div className="dashboard_container">
          <h5>Menú para editar o publicar secciones de la web</h5>
          <div className="dashboard_grid">
            {DataDashboard.map((e, i) => {
              return (
                <div
                  className="dashboard_container-card"
                  key={i}
                  onClick={() => navigate(e.link)}
                >
                  <h3 className="dashboard_title">{e.title}</h3>
                  <span className="dashboard_icon">{e.icon}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
