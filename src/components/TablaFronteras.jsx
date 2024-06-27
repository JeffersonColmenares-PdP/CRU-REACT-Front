import { useEffect, useState } from "react";
import "../styles/TablaPaises.css";
import { useNavigate } from "react-router-dom";//Para navegar entre rutas del front
import { ToastContainer, toast } from 'react-toastify';//Para mensaje notificacion flotante
import 'react-toastify/dist/ReactToastify.css';//Para mensaje notificacion flotante

const TablaFronteras = () => {
  const navegar = useNavigate();
  const [listFronteras, setlistFronteras] = useState([]);
  const [totalPaises, setTotalPaises] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [fronterasPerPage, setFronterasPerPage] = useState(5);
  // const fronterasPerPage = 5;
  const [inputNombreFrontera, setInputNombreFrontera] = useState("");
  const [inputLongitudFrontera, setInputLongitudFrontera] = useState("");
  const [inputDescripcionFrontera, setInputDescripcionFrontera] = useState("");
  const [inputIdFrontera, setInputIdFrontera] = useState("");
  const [inputTipoFrontera, setInputTipoFrontera] = useState("");
  const [modal, setModal] = useState(false);
  const [modalCrear, setModalCrear] = useState(false);

  //Para mostrar paises
  const fetchMostrarFronteras = async (page, pageSize) => {
    try {
      let FronterasDetalles = [];
      const infFronteras = await fetch(
        `http://127.0.0.1:5000/servicio-2/fronteras?page=${page}&page_size=${pageSize}`
      );
      if (infFronteras.ok) {
        let infFronterasJs = await infFronteras.json();
        const resultFrontera = infFronterasJs?.obj?.objeto_pais_espanol;
        for (let Frontera of resultFrontera) {
          FronterasDetalles.push({
            id_frontera: Frontera?.id_frontera,
            nombre_frontera: Frontera?.nombre_frontera,
            longitud_frontera: Frontera?.longitud_frontera,
            descripcion_frontera: Frontera?.descripcion_frontera,
            tipo_frontera: Frontera?.tipo_frontera,
            area_km: Frontera?.area_km,
          });
        }
        setlistFronteras(FronterasDetalles);
        setTotalPaises(infFronterasJs?.obj?.total || 0); // Actualiza el total de países
      }
    } catch (error) {
      console.log("El error es: ", error);
    }
  };

  useEffect(() => {
    fetchMostrarFronteras(currentPage, fronterasPerPage);
  }, [currentPage, fronterasPerPage]);

  //Para nueva pagina
  const nextPage = () => {
    if (listFronteras.length === fronterasPerPage) {
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
    setFronterasPerPage(cantidad);
    setCurrentPage(1); //Actualiza a 1 para que vuelva a la pagina principal
  };

  // Guarda información en los input
  const guardarInput = async (id_frontera) => {
    const datos = listFronteras?.filter((id) => id.id_frontera === id_frontera);//Busca por id_frontera la información en el listado de paises
    setInputIdFrontera(datos[0]?.id_frontera);
    setInputTipoFrontera(datos[0]?.tipo_frontera);
    setInputLongitudFrontera(datos[0]?.longitud_frontera);
    setInputDescripcionFrontera(datos[0]?.descripcion_frontera);
    setInputNombreFrontera(datos[0]?.nombre_frontera);
    setModal(true);
  };

  // Toma la información que hay en los input y la envia a la funcion PUT para actualizar los paises
  const fetchActualizarFronteras = async () => {
    try {
      const infFronteras = await fetch(
        "http://127.0.0.1:5000/servicio-2/fronteras",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id_frontera: inputIdFrontera,
            nombre_frontera: inputNombreFrontera,
            longitud_frontera: inputLongitudFrontera,
            descripcion_frontera: inputDescripcionFrontera,
            tipo_frontera: inputTipoFrontera,
          }),
        }
      );
      if (infFronteras.ok) {
        let infFronterasJs = await infFronteras.json();
        if (infFronterasJs?.status != true){
          toast.error(infFronterasJs?.msg, {
            position: "top-center",
          });
        }
        else {
          toast.success(infFronterasJs?.msg, {
            position: "top-center",
          });
        }
        setModal(false);
        fetchMostrarFronteras(currentPage, fronterasPerPage);
      }
    } catch (error) {
      console.log("El error es: ", error);
    }
  };

  // Limpiar los input por si tienen datos y abre el modal para crear nuevo país
  const limpiarInput = async () => {
    setInputIdFrontera("");
    setInputTipoFrontera("");
    setInputLongitudFrontera("");
    setInputDescripcionFrontera("");
    setInputNombreFrontera("");
    setModalCrear(true);
  };

  // Crear País
  const fetchCrearFronteras = async () => {
    try {
      const infFronteras = await fetch(
        "http://127.0.0.1:5000/servicio-2/fronteras",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id_frontera: inputIdFrontera,
            nombre_frontera: inputNombreFrontera,
            longitud_frontera: inputLongitudFrontera,
            descripcion_frontera: inputDescripcionFrontera,
            tipo_frontera: inputTipoFrontera,
          }),
        }
      );
      if (infFronteras.ok) {
        let infFronterasJs = await infFronteras.json();
        if (infFronterasJs?.status != true){
          toast.error(infFronterasJs?.msg, {
            position: "top-center",
          });
        }
        else {
          toast.success(infFronterasJs?.msg, {
            position: "top-center",
          });
        }
        setModalCrear(false);
        fetchMostrarFronteras(currentPage, fronterasPerPage);
      }
    } catch (error) {
      console.log("El error es: ", error);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="container">
        <h2 className="titulo-tablaPaises">Fronteras</h2>
        <button onClick={() => {limpiarInput()}}>Crear Frontera</button>
        <div className="table-container">
          <table className="table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>descripcion_frontera</th>
                <th>longitud_frontera</th>
                <th>tipo_frontera</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {listFronteras.map((item, id) => (
                <tr key={id}>
                  <td>{item.id_frontera}</td>
                  <td>{item.nombre_frontera}</td>
                  <td>{item.descripcion_frontera}</td>
                  <td>{item.longitud_frontera}</td>
                  <td>{item.tipo_frontera}</td>
                  <td style={{ display: "flex", gap: "10px" }}>
                    <button onClick={() => guardarInput(item.id_frontera)}>Actualizar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <button onClick={prevPage} disabled={currentPage === 1}>Anterior</button>
          <button onClick={nextPage} disabled={currentPage >= Math.ceil(totalPaises / fronterasPerPage)}>Siguiente</button>
          <button onClick={() => {navegar("/paises");}}>Volver</button>
        </div>
        <div>
          <label>Registros por página:</label>
          <select value={fronterasPerPage} onChange={registrosPorPagina}>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>
        {modal && (
          <div className="modal-actualizar">
            <h3>Actualizar Frontera</h3>
            <label>ID Frontera</label>
            <input value={inputIdFrontera} disabled />
            <label>Nombre Frontera</label>
            <input value={inputNombreFrontera} onChange={(e) => setInputNombreFrontera(e.target.value)} />
            <label>Descripcion Frontera</label>
            <input value={inputDescripcionFrontera} onChange={(e) => setInputDescripcionFrontera(e.target.value)} />
            <label>Longitud Frontera</label>
            <input value={inputLongitudFrontera} onChange={(e) => setInputLongitudFrontera(e.target.value)} />
            <label>Tipo Frontera</label>
            <input value={inputTipoFrontera} onChange={(e) => setInputTipoFrontera(e.target.value)} />
            <div className="button-acciones">
              <button onClick={() => {fetchActualizarFronteras()}}>Actualizar</button>
              <button onClick={() => {setModal(false)}}>Cerrar</button>
            </div>
          </div>
        )}
        {modalCrear && (
          <div className="modal-actualizar">
            <h3>Crear Frontera</h3>
            <label>ID Frontera</label>
            <input value={inputIdFrontera} onChange={(e) => setInputIdFrontera(e.target.value)} />
            <label>Nombre Frontera</label>
            <input value={inputNombreFrontera} onChange={(e) => setInputNombreFrontera(e.target.value)} />
            <label>Descripcion Frontera</label>
            <input value={inputDescripcionFrontera} onChange={(e) => setInputDescripcionFrontera(e.target.value)} />
            <label>Longitud Frontera</label>
            <input value={inputLongitudFrontera} onChange={(e) => setInputLongitudFrontera(e.target.value)} />
            <label>Tipo Frontera</label>
            <input value={inputTipoFrontera} onChange={(e) => setInputTipoFrontera(e.target.value)} />
            <div className="button-acciones">
              <button onClick={() => {fetchCrearFronteras()}}>Crear</button>
              <button onClick={() => {setModalCrear(false)}}>Cerrar</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default TablaFronteras;