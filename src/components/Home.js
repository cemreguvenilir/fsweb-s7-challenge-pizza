import React from "react";
import { useHistory, Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const history = useHistory();
  const toOrderPage = () => {
    history.push("/pizza");
  };
  return (
    <div className="home">
      <h1 className="homeH">
        <Link to="/"> Teknolojik Yemekler </Link>
      </h1>
      <p className="homeText">KOD ACIKTIRIR</p>
      <p className="homeText">PIZZA DOYURUR</p>
      <button onClick={toOrderPage} className="homeButton">
        ACIKTIM
      </button>
    </div>
  );
};

export default Home;
