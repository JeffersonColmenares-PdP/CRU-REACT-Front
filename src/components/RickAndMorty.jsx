import React from "react";
import "../styles/Paises.css";
import { useNavigate } from "react-router-dom";

const RickAndMorty = () => {
  const navegar = useNavigate();

  return (
    <>
      <h1>Rick And Morty</h1>
      <div className="principal-paises">
        <div className="division">
          <div className="paises">
            <img
              src="https://repository-images.githubusercontent.com/285645728/409e5900-1a2a-11eb-840d-33df83f42cfe"
              alt="Personajes"
              onClick={() => {
                navegar("/tabla-personajes");
              }}
            />
            <h2 className="titulo-botones">Personajes</h2>
          </div>
          <div className="traducciones">
            <img
              src="https://cdn3.f-cdn.com//files/download/196103492/rick%20and%20morty%20image.png?width=780&height=359&fit=crop"
              alt="Traducción Nombre Pais"
            />
            <h2 className="titulo-botones">Especies</h2>
          </div>
          <div className="fronteras">
            <img
              src="https://i.redd.it/kfqu0tscmys01.jpg"
              alt="Fronteras"
            />
            <h2 className="titulo-botones">País - Personaje</h2>
          </div>
        </div>
      </div>
      <button className="volver" onClick={() => {navegar("/")}}>Regresar Página Principal</button>
    </>
  );
};

export default RickAndMorty;
