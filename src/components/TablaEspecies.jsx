import React from "react";
import "../styles/Paises.css";
import { useNavigate } from "react-router-dom";

const TablaEspecies = () => {
  const navegar = useNavigate();


  return (
    <>
      <h1>Paises</h1>
      <div className="principal-paises">
        <div className="division">
          <div className="paises">
            <img
              src="https://img.freepik.com/vector-gratis/todas-banderas-paises-eurocopa_1057-1259.jpg"
              alt="Paises"
            />
            <h2 className="titulo-botones">Paises</h2>
          </div>
          <div className="traducciones">
            <img
              src="https://applicantes.com/wp-content/uploads/2018/06/apps-traducciones-768x403.jpg"
              alt="Traducción Nombre Pais"
            />
            <h2 className="titulo-botones">Traducción Nombre Pais</h2>
          </div>
          <div className="fronteras">
            <img
              src="https://respaldobe.wipudicreativos.com/wp-content/uploads/2020/05/fronteras_impresionantes_del_mundo.jpg"
              alt="Fronteras"
            />
            <h2 className="titulo-botones">Fronteras</h2>
          </div>
        </div>
      </div>
      <button className="volver" onClick={() => {navegar("/")}}>Regresar Página Principal</button>
    </>
  );
};

export default TablaEspecies;
