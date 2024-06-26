import "../styles/Paises.css";
import { useNavigate } from "react-router-dom";

const Paises = () => {
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
              onClick={() => {
                navegar("/tabla-paises");
              }}
            />
            <h2 className="titulo-botones">Paises</h2>
          </div>
          <div className="traducciones">
            <img
              src="https://applicantes.com/wp-content/uploads/2018/06/apps-traducciones-768x403.jpg"
              alt="Traducción Nombre Pais"
              onClick={() => {
                navegar("/tabla-traduccion-paises");
              }}
            />
            <h2 className="titulo-botones">Traducción Nombre Pais</h2>
          </div>
          <div className="fronteras">
            <img
              src="https://respaldobe.wipudicreativos.com/wp-content/uploads/2020/05/fronteras_impresionantes_del_mundo.jpg"
              alt="Fronteras"
              onClick={() => {
                navegar("/tabla-fronteras");
              }}
            />
            <h2 className="titulo-botones">Fronteras</h2>
          </div>
          <div className="fronteras">
            <img
              src="https://www.lavanguardia.com/files/og_thumbnail/uploads/2018/06/15/5fa43d71a111f.jpeg"
              alt="Uniones"
              onClick={() => {
                navegar("/tabla-uniones");
              }}
            />
            <h2 className="titulo-botones">Unión País - Frontera</h2>
          </div>
        </div>
      </div>
      <button
        className="volver"
        onClick={() => {
          navegar("/");
        }}
      >
        Regresar Página Principal
      </button>
    </>
  );
};

export default Paises;
