import { useEffect, useState } from "react";
import "../styles/TablaPaises.css";
import { useNavigate } from "react-router-dom";//Para navegar entre rutas del front
import { ToastContainer, toast } from 'react-toastify';//Para mensaje notificacion flotante
import 'react-toastify/dist/ReactToastify.css';//Para mensaje notificacion flotante

const TablaUnionPaisFrontera = () => {
  const navegar = useNavigate();
  const [listPaises, setListPaises] = useState([]);
  const [totalPaises, setTotalPaises] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [paisesPerPage, setPaisesPerPage] = useState(5);
  // const paisesPerPage = 5;
  const [inputNombreFrontera, setInputNombreFrontera] = useState("");
  const [inputNombrePais, setInputNombrePais] = useState("");
  const [modalCrear, setModalCrear] = useState(false);
  const [listFronteras, setFronteras] = useState([]);
  const [listPais, setListPais] = useState([]);

  //Para mostrar paises
  const fetchMostrarPaises = async (page, pageSize) => {
    try {
      let PaisesDetalles = [];
      const infPaises = await fetch(
        `http://127.0.0.1:5000/servicio-2/union-pais-fronteras?page=${page}&page_size=${pageSize}`
      );
      if (infPaises.ok) {
        let infPaisesJs = await infPaises.json();
        const resultPais = infPaisesJs?.obj?.objeto_pais_espanol;
        for (let Pais of resultPais) {
          PaisesDetalles.push({
            nombre_frontera: Pais?.nombre_frontera,
            nombre_paises: Pais?.nombre_paises,
          });
        }
        setListPaises(PaisesDetalles);
        setTotalPaises(infPaisesJs?.obj?.total || 0); // Actualiza el total de países
      }
    } catch (error) {
      console.log("El error es: ", error);
    }
  };

  //Para mostrar fronteras-pais
  const fetchMostrarFronterasPais = async () => {
    try {
      let Paises = [];
      let Fronteras = [];
      const infPaises = await fetch(
        `http://127.0.0.1:5000/servicio-2/buscar-pais-frontera`
      );
      if (infPaises.ok) {
        let infPaisesJs = await infPaises.json();
        const resultPais = infPaisesJs?.obj?.objeto_pais_espanol;
        for (let Pais of resultPais) {
          Paises.push({
            id_paises: Pais?.id_paises,
            nombre_paises: Pais?.nombre_paises,
          });
        }
        setListPais(Paises);
        const resultFronteras = infPaisesJs?.obj?.objeto_frontera_espanol;
        for (let Pais of resultFronteras) {
          Fronteras.push({
            id_frontera: Pais?.id_frontera,
            nombre_frontera: Pais?.nombre_frontera,
          });
        }
        setFronteras(Fronteras);
      }
    } catch (error) {
      console.log("El error es: ", error);
    }
  };

  useEffect(() => {
    fetchMostrarPaises(currentPage, paisesPerPage);
    fetchMostrarFronterasPais();
  }, [currentPage, paisesPerPage]);

  //Para nueva pagina
  const nextPage = () => {
    if (listPaises.length === paisesPerPage) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
    }
  };

  //Para establecer pagina anterior
  const prevPage = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
    }
  };

  // Cambiar cantidad de registros por página
  const registrosPorPagina = (e) => {
    const cantidad = parseInt(e.target.value);
    setPaisesPerPage(cantidad);
    setCurrentPage(1); //Actualiza a 1 para que vuelva a la pagina principal
  };

  // Limpiar los input por si tienen datos y abre el modal para crear nuevo país
  const limpiarInput = async () => {
    setInputNombreFrontera("");
    setInputNombrePais("");
    setModalCrear(true);
  };

  // Crear País
  const fetchCrearPaises = async () => {
    try {
      const infPaises = await fetch(
        "http://127.0.0.1:5000/servicio-2/union-pais-fronteras",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nombre_frontera: inputNombreFrontera,
            nombre_paises: inputNombrePais,
          }),
        }
      );
      if (infPaises.ok) {
        let infPaisesJs = await infPaises.json();
        if (infPaisesJs?.status != true){
          toast.error(infPaisesJs?.msg, {
            position: "top-center",
          });
        }
        else {
          toast.success(infPaisesJs?.msg, {
            position: "top-center",
          });
        }
        setModalCrear(false);
        fetchMostrarPaises(currentPage, paisesPerPage);
      }
    } catch (error) {
      console.log("El error es: ", error);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="container">
        <h2 className="titulo-tablaPaises">Unión País-Frontera</h2>
        <button onClick={() => {limpiarInput()}}>Crear Unión País-Frontera</button>
        <div className="table-container">
          <table className="table-bordered">
            <thead>
              <tr>
                <th>Nombre Frontera</th>
                <th>Nombre País</th>
              </tr>
            </thead>
            <tbody>
              {listPaises.map((item, id) => (
                <tr key={id}>
                  <td>{item.nombre_frontera}</td>
                  <td>{item.nombre_paises}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <button onClick={prevPage} disabled={currentPage === 1}>Anterior</button>
          <button onClick={nextPage} disabled={currentPage >= Math.ceil(totalPaises / paisesPerPage)}>Siguiente</button>
          <button onClick={() => {navegar("/paises");}}>Volver</button>
        </div>
        <div>
          <label>Registros por página:</label>
          <select value={paisesPerPage} onChange={registrosPorPagina}>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>
        {modalCrear && (
          <div className="modal-actualizar">
            <h3>Crear Unión País-Frontera</h3>
            <label>Selecciona una Frontera:</label>
            <select id="fronteras" value={inputNombreFrontera} onChange={(e) => setInputNombreFrontera(e.target.value)}>
              <option value="">Selecciona una Frontera</option>
              {listFronteras.map((frontera, index) => (
                <option key={index} value={frontera.nombre_frontera}>
                  {frontera.nombre_frontera}
                </option>
              ))}
            </select>
            <label>Selecciona un País:</label>
            <select id="fronteras" value={inputNombrePais} onChange={(e) => setInputNombrePais(e.target.value)}>
              <option value="">Selecciona una País</option>
              {listPais.map((pais, index) => (
                <option key={index} value={pais.nombre_paises}>
                  {pais.nombre_paises}
                </option>
              ))}
            </select>
            <div className="button-acciones">
              <button onClick={() => {fetchCrearPaises()}}>Crear</button>
              <button onClick={() => {setModalCrear(false)}}>Cerrar</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default TablaUnionPaisFrontera;
