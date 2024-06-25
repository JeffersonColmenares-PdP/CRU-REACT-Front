import React from "react";
import { useEffect, useState } from "react";
import "../styles/TablaPaises.css";
import { useNavigate } from "react-router-dom";

const TablaPaises = () => {
  const navegar = useNavigate();
  const [listPaises, setListPaises] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const PaisesPerPage = 5;

  const fetchMostrarPaises = async () => {
    try {
      let PaisesDetalles = [];
      const infPaises = await fetch(
        `http://127.0.0.1:5000/servicio-2/paises-espanol`
      );
      if (infPaises.ok) {
        let infPaisesJs = await infPaises.json();
        const resultPais = infPaisesJs?.obj;
        for (let Pais of resultPais) {
          PaisesDetalles.push({
            id_paises: Pais?.id_paises,
            nombre_paises: Pais?.nombre_paises,
            continente: Pais?.continente,
            capital: Pais?.capital,
            poblacion: Pais?.poblacion,
            area_km: Pais?.area_km,
          });
        }
        setListPaises(PaisesDetalles);
      }
    } catch (error) {
      console.log("El error es: ", error);
    }
  };

  useEffect(() => {
    fetchMostrarPaises();
  }, []);

  const indexOfLastPaises = currentPage * PaisesPerPage; // último Paises en página
  const indexOfFirstPaises = indexOfLastPaises - PaisesPerPage; // primer Paises en página
  const currentPaises = listPaises.slice(indexOfFirstPaises, indexOfLastPaises); // nuevo arreglo con Pais x pag

  const nextPage = () => {
    if (currentPage < Math.ceil(listPaises.length / PaisesPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      <div className="container">
        <h2 className="titulo-tablaPaises">Paises</h2>
        <div className="table-container">
          <table className="table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Capital</th>
                <th>Continente</th>
                <th>Área</th>
                <th>Población</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {currentPaises.map((item, id) => (
                <>
                  <tr key={id}>
                    <td>{item.id_paises}</td>
                    <td>{item.nombre_paises}</td>
                    <td>{item.capital}</td>
                    <td>{item.continente}</td>
                    <td>{item.area_km}</td>
                    <td>{item.poblacion}</td>
                    <td style={{ display: "flex", gap: "10px" }}>
                      <button>Actualizar</button>
                    </td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        </div>

        <div>
          <button onClick={prevPage} disabled={currentPage === 1}>
            Anterior
          </button>
          <button
            onClick={nextPage}
            disabled={
              currentPage === Math.ceil(listPaises.length / PaisesPerPage)
            }
          >
            Siguiente
          </button>
          <button
            onClick={() => {
              navegar("/paises");
            }}
          >
            Volver
          </button>
        </div>
      </div>
    </>
  );
};

export default TablaPaises;
