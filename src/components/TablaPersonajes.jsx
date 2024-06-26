import { useEffect, useState } from "react";
import "../styles/TablaPaises.css";
import { useNavigate } from "react-router-dom";//Para navegar entre rutas del front
import { ToastContainer, toast } from 'react-toastify';//Para mensaje notificacion flotante
import 'react-toastify/dist/ReactToastify.css';//Para mensaje notificacion flotante

const TablaPersonajes = () => {
  const navegar = useNavigate();
  const [listPersonajes, setListPersonajes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const PersonajesPerPage = 5;
  const [inputIdPersonaje, setInputIdPersonaje] = useState("");
  const [inputNombrePersonaje, setInputNombrePersonaje] = useState("");
  const [inputGenero, setInputGenero] = useState("");
  const [inputOrigen, setInputOrigen] = useState("");
  const [inputFkEspecie, setInputFkEspecie] = useState("");
  const [modal, setModal] = useState(false);

  //Para mostrar paises
  const fetchMostrarPersonajes = async (page, pageSize) => {
    try {
      let PersonajesDetalles = [];
      const infPersonajes = await fetch(
        `http://127.0.0.1:5000/servicio-1/personajes?page=${page}&page_size=${pageSize}`
      );
      if (infPersonajes.ok) {
        let infPersonajesJs = await infPersonajes.json();
        const resultPersonajes = infPersonajesJs?.obj;
        for (let Pais of resultPersonajes) {
          PersonajesDetalles.push({
            id_personaje: Pais?.id_personaje,
            nombre_personaje: Pais?.nombre_personaje,
            genero: Pais?.genero,
            origen: Pais?.origen,
            fk_especie: Pais?.fk_especie,
          });
        }
        setListPersonajes(PersonajesDetalles);
      }
    } catch (error) {
      console.log("El error es: ", error);
    }
  };

  useEffect(() => {
    fetchMostrarPersonajes(currentPage, PersonajesPerPage);
  }, [currentPage]);

  //Para nueva pagina
  const nextPage = () => {
    if (listPersonajes.length === PersonajesPerPage) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      fetchMostrarPersonajes(newPage, PersonajesPerPage);
    }
  };

  //Para establecer pagina anterior
  const prevPage = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      fetchMostrarPersonajes(newPage, PersonajesPerPage);
    }
  };

  // Guarda información en los input - cualquier modificacion que se haga
  const guardarInput = async (id_personaje) => {
    const datos = listPersonajes?.filter((id) => id.id_personaje === id_personaje);//Busca por id_personaje la información en el listado de paises
    setInputIdPersonaje(datos[0]?.id_personaje);
    setInputNombrePersonaje(datos[0]?.nombre_personaje);
    setInputGenero(datos[0]?.genero);
    setInputOrigen(datos[0]?.origen);
    setInputFkEspecie(datos[0]?.fk_especie);
    setModal(true);
  };

  // Toma la información que hay en los input y la envia a la funcion PUT para actualizar los paises
  const fetchActualizarPersonajes = async () => {
    try {
      const infPersonajes = await fetch(
        "http://127.0.0.1:5000/servicio-1/personajes",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id_personaje: inputIdPersonaje,
            origen: inputOrigen,
            genero: inputGenero,
            nombre_personaje: inputNombrePersonaje,
            fk_especie: inputFkEspecie,
          }),
        }
      );
      if (infPersonajes.ok) {
        let infPersonajesJs = await infPersonajes.json();
        setModal(false);
        toast.success(infPersonajesJs?.msg, {
          position: "top-center",
        });
        fetchMostrarPersonajes(currentPage, PersonajesPerPage);
      }
    } catch (error) {
      console.log("El error es: ", error);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="container">
        <h2 className="titulo-tablaPaises">Personajes</h2>
        <div className="table-container">
          <table className="table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Genero</th>
                <th>Origen</th>
                <th>Especie</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {listPersonajes.map((item, id) => (
                <tr key={id}>
                  <td>{item.id_personaje}</td>
                  <td>{item.nombre_personaje}</td>
                  <td>{item.genero}</td>
                  <td>{item.origen}</td>
                  <td>{item.fk_especie}</td>
                  <td style={{ display: "flex", gap: "10px" }}>
                    <button onClick={() => guardarInput(item.id_personaje)}>Actualizar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <button onClick={prevPage} disabled={currentPage === 1}>Anterior</button>
          <button onClick={nextPage} disabled={listPersonajes.length < PersonajesPerPage}>Siguiente</button>
          <button onClick={() => {navegar("//personajes");}}>Volver</button>
        </div>
        {modal && (
          <div className="modal-actualizar">
            <h3>Actualizar Personaje</h3>
            <label>ID Personaje</label>
            <input value={inputIdPersonaje} disabled />
            <label>Nombre</label>
            <input value={inputNombrePersonaje} onChange={(e) => setInputNombrePersonaje(e.target.value)} />
            <label>Genero</label>
            <input value={inputGenero} onChange={(e) => setInputGenero(e.target.value)} />
            <label>Origen</label>
            <input value={inputOrigen} onChange={(e) => setInputOrigen(e.target.value)} />
            <label>Especie</label>
            <input value={inputFkEspecie} onChange={(e) => setInputFkEspecie(e.target.value)} />
            <div className="button-acciones">
              <button onClick={() => {fetchActualizarPersonajes()}}>Actualizar</button>
              <button onClick={() => {setModal(false)}}>Cerrar</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default TablaPersonajes;
