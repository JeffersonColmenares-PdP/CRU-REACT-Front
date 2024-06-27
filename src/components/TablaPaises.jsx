import { useEffect, useState } from "react";
import "../styles/TablaPaises.css";
import { useNavigate } from "react-router-dom";//Para navegar entre rutas del front
import { ToastContainer, toast } from 'react-toastify';//Para mensaje notificacion flotante
import 'react-toastify/dist/ReactToastify.css';//Para mensaje notificacion flotante

const TablaPaises = () => {
  const navegar = useNavigate();
  const [listPaises, setListPaises] = useState([]);
  const [totalPaises, setTotalPaises] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [paisesPerPage, setPaisesPerPage] = useState(5);
  const [inputArea, setInputArea] = useState("");
  const [inputCapital, setInputCapital] = useState("");
  const [inputContinente, setInputContinente] = useState("");
  const [inputPais, setInputPais] = useState("");
  const [inputNombrePais, setInputNombrePais] = useState("");
  const [inputPoblacion, setInputPoblacion] = useState("");
  const [modal, setModal] = useState(false);
  const [modalCrear, setModalCrear] = useState(false);

  //Para mostrar paises
  const fetchMostrarPaises = async (page, pageSize) => {
    try {
      let PaisesDetalles = [];
      const infPaises = await fetch(
        `http://127.0.0.1:5000/servicio-2/paises-espanol?page=${page}&page_size=${pageSize}`
      );
      if (infPaises.ok) {
        let infPaisesJs = await infPaises.json();
        const resultPais = infPaisesJs?.obj?.objeto_pais_espanol;
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
        setTotalPaises(infPaisesJs?.obj?.total || 0); // Actualiza el total de países
      }
    } catch (error) {
      console.log("El error es: ", error);
    }
  };

  useEffect(() => {
    fetchMostrarPaises(currentPage, paisesPerPage);
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

  // Guarda información en los input
  const guardarInput = async (id_paises) => {
    const datos = listPaises?.filter((id) => id.id_paises === id_paises);//Busca por id_paises la información en el listado de paises
    setInputPais(datos[0]?.id_paises);
    setInputNombrePais(datos[0]?.nombre_paises);
    setInputCapital(datos[0]?.capital);
    setInputContinente(datos[0]?.continente);
    setInputArea(datos[0]?.area_km);
    setInputPoblacion(datos[0]?.poblacion);
    setModal(true);
  };

  // Toma la información que hay en los input y la envia a la funcion PUT para actualizar los paises
  const fetchActualizarPaises = async () => {
    try {
      const infPaises = await fetch(
        "http://127.0.0.1:5000/servicio-2/paises-espanol",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id_paises: inputPais,
            area_km: inputArea,
            capital: inputCapital,
            continente: inputContinente,
            nombre_paises: inputNombrePais,
            poblacion: inputPoblacion,
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
        setModal(false);
        fetchMostrarPaises(currentPage, paisesPerPage);
      }
    } catch (error) {
      console.log("El error es: ", error);
    }
  };

  // Limpiar los input por si tienen datos y abre el modal para crear nuevo país
  const limpiarInput = async () => {
    setInputPais("");
    setInputNombrePais("");
    setInputCapital("");
    setInputContinente("");
    setInputArea("");
    setInputPoblacion("");
    setModalCrear(true);
  };

  // Crear País
  const fetchCrearPaises = async () => {
    try {
      const infPaises = await fetch(
        "http://127.0.0.1:5000/servicio-2/paises-espanol",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id_paises: inputPais,
            area_km: inputArea,
            capital: inputCapital,
            continente: inputContinente,
            nombre_paises: inputNombrePais,
            poblacion: inputPoblacion,
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
        <h2 className="titulo-tablaPaises">Paises</h2>
        <button onClick={() => {limpiarInput()}}>Crear País</button>
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
              {listPaises.map((item, id) => (
                <tr key={id}>
                  <td>{item.id_paises}</td>
                  <td>{item.nombre_paises}</td>
                  <td>{item.capital}</td>
                  <td>{item.continente}</td>
                  <td>{item.area_km}</td>
                  <td>{item.poblacion}</td>
                  <td style={{ display: "flex", gap: "10px" }}>
                    <button onClick={() => guardarInput(item.id_paises)}>Actualizar</button>
                  </td>
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
        {modal && (
          <div className="modal-actualizar">
            <h3>Actualizar País</h3>
            <label>ID País</label>
            <input value={inputPais} disabled />
            <label>Nombre</label>
            <input value={inputNombrePais} onChange={(e) => setInputNombrePais(e.target.value)} />
            <label>Capital</label>
            <input value={inputCapital} onChange={(e) => setInputCapital(e.target.value)} />
            <label>Continente</label>
            <input value={inputContinente} onChange={(e) => setInputContinente(e.target.value)} />
            <label>Área</label>
            <input value={inputArea} onChange={(e) => setInputArea(e.target.value)} />
            <label>Población</label>
            <input value={inputPoblacion} onChange={(e) => setInputPoblacion(e.target.value)} />
            <div className="button-acciones">
              <button onClick={() => {fetchActualizarPaises()}}>Actualizar</button>
              <button onClick={() => {setModal(false)}}>Cerrar</button>
            </div>
          </div>
        )}
        {modalCrear && (
          <div className="modal-actualizar">
            <h3>Crear País</h3>
            <label>ID País</label>
            <input value={inputPais} onChange={(e) => setInputPais(e.target.value)} />
            <label>Nombre</label>
            <input value={inputNombrePais} onChange={(e) => setInputNombrePais(e.target.value)} />
            <label>Capital</label>
            <input value={inputCapital} onChange={(e) => setInputCapital(e.target.value)} />
            <label>Continente</label>
            <input value={inputContinente} onChange={(e) => setInputContinente(e.target.value)} />
            <label>Área</label>
            <input value={inputArea} onChange={(e) => setInputArea(e.target.value)} />
            <label>Población</label>
            <input value={inputPoblacion} onChange={(e) => setInputPoblacion(e.target.value)} />
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

export default TablaPaises;
