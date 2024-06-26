import { useEffect, useState } from "react";
import "../styles/TablaPaises.css";
import { useNavigate } from "react-router-dom";//Para navegar entre rutas del front
import { ToastContainer, toast } from 'react-toastify';//Para mensaje notificacion flotante
import 'react-toastify/dist/ReactToastify.css';//Para mensaje notificacion flotante

const TablaUnionPaisFrontera = () => {
  const navegar = useNavigate();
  const [listPaises, setListPaises] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const PaisesPerPage = 5;
  const [inputNombreFrontera, setInputNombreFrontera] = useState("");
  const [inputNombrePais, setInputNombrePais] = useState("");
  const [modalCrear, setModalCrear] = useState(false);

  //Para mostrar paises
  const fetchMostrarPaises = async (page, pageSize) => {
    try {
      let PaisesDetalles = [];
      const infPaises = await fetch(
        `http://127.0.0.1:5000/servicio-2/union-pais-fronteras?page=${page}&page_size=${pageSize}`
      );
      if (infPaises.ok) {
        let infPaisesJs = await infPaises.json();
        const resultPais = infPaisesJs?.obj;
        for (let Pais of resultPais) {
          PaisesDetalles.push({
            nombre_frontera: Pais?.nombre_frontera,
            nombre_paises: Pais?.nombre_paises,
          });
        }
        setListPaises(PaisesDetalles);
      }
    } catch (error) {
      console.log("El error es: ", error);
    }
  };

  useEffect(() => {
    fetchMostrarPaises(currentPage, PaisesPerPage);
  }, [currentPage]);

  //Para nueva pagina
  const nextPage = () => {
    if (listPaises.length === PaisesPerPage) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      fetchMostrarPaises(newPage, PaisesPerPage);
    }
  };

  //Para establecer pagina anterior
  const prevPage = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      fetchMostrarPaises(newPage, PaisesPerPage);
    }
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
        fetchMostrarPaises(currentPage, PaisesPerPage);
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
          <button onClick={nextPage} disabled={listPaises.length < PaisesPerPage}>Siguiente</button>
          <button onClick={() => {navegar("/paises");}}>Volver</button>
        </div>
        {modalCrear && (
          <div className="modal-actualizar">
            <h3>Crear Unión País-Frontera</h3>
            <label>Nombre Frontera</label>
            <input value={inputNombreFrontera} onChange={(e) => setInputNombreFrontera(e.target.value)} />
            <label>Nombre País</label>
            <input value={inputNombrePais} onChange={(e) => setInputNombrePais(e.target.value)} />
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
