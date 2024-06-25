import React from "react";
import "../styles/Principal.css";
import { useNavigate } from "react-router-dom";

const Principal = () => {
  const navegar = useNavigate();

  return (
    <div className="principal">
      <h1>Página Principal</h1>
      <div className="div-imagenes">
        <div className="div-pais">
          <img
            className="imagen-paises"
            src="https://arche-ele.com/wp-content/uploads/2021/06/Paises_Arche-ELE-1024x724.png"
            alt=""
            onClick={() => {navegar("/paises")}}
          />
        </div>
        <div >
          <img
            className="imagen-rick"
            src="https://m.media-amazon.com/images/S/pv-target-images/70c7bd951508e5925cd976342c97fbed0021f11f211d83dd034e952c47534bd6.jpg"
            alt=""
            onClick={() => {navegar("/rick-and-morty")}}
          />
        </div>
      </div>
    </div>
  );
};

export default Principal;
