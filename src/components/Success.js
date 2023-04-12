import React from "react";
import "./Success.css";
import { Link } from "react-router-dom";

const Success = () => {
  return (
    <div className="success">
      <h1 className="successH">
        <Link to="/"> Teknolojik Yemekler</Link>
      </h1>
      <p className="successText">TEBRİKLER!</p>
      <p className="successText">SİPARİŞİNİZ ALINDI</p>
    </div>
  );
};

export default Success;
