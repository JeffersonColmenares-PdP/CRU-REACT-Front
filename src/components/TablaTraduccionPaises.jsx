import { useEffect, useState } from "react";
import "../styles/Paises.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';//Para mensaje notificacion flotante
import 'react-toastify/dist/ReactToastify.css';//Para mensaje notificacion flotante

const TablaTraduccionPaises = () => {
  const navegar = useNavigate();
  const [listPaises, setListPaises] = useState([]);
  const [totalPaises, setTotalPaises] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [paisesPerPage, setPaisesPerPage] = useState(5);
  // const paisesPerPage = 5;
  const [inputTraduccion, setInputTraduccion] = useState("");
  const [inputPais, setInputPais] = useState("");
  const [inputIdioma, setInputIdioma] = useState("");
  const [inputComun, setInputComun] = useState("");
  const [inputOficial, setInputOficial] = useState("");
  const [modal, setModal] = useState(false);
  const [modalCrear, setModalCrear] = useState(false);

  //Para mostrar traducciones paises
  const fetchMostrarPaises = async (page, pageSize) => {
    try {
      let PaisesDetalles = [];
      const infPaises = await fetch(
        `http://127.0.0.1:5000/servicio-2/nombre-pais-traducciones?page=${page}&page_size=${pageSize}`
      );
      if (infPaises.ok) {
        let infPaisesJs = await infPaises.json();
        const resultPais = infPaisesJs?.obj?.objeto_pais_espanol;
        for (let Pais of resultPais) {
          PaisesDetalles.push({
            id_traduccion: Pais?.id_traduccion,
            nombre_paises: Pais?.nombre_paises,
            nombre_idioma: (Pais?.nombre_idioma ?? "").toUpperCase(),
            traduccion_comun: Pais?.traduccion_comun,
            traduccion_oficial: Pais?.traduccion_oficial,
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

  // Guarda información en los input - cualquier modificacion que se haga
  const guardarInput = async (id_traduccion) => {
    const datos = listPaises?.filter((id) => id.id_traduccion === id_traduccion);//Busca por id_paises la información en el listado de paises
    setInputTraduccion(datos[0]?.id_traduccion);
    setInputPais(datos[0]?.nombre_paises);
    setInputIdioma(datos[0]?.nombre_idioma);
    setInputComun(datos[0]?.traduccion_comun);
    setInputOficial(datos[0]?.traduccion_oficial);
    setModal(true);
  };
  
  // Toma la información que hay en los input y la envia a la funcion PUT para actualizar los paises
  const fetchActualizarPaises = async () => {
    try {
      const infPaises = await fetch(
        "http://127.0.0.1:5000/servicio-2/nombre-pais-traducciones",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id_traduccion: inputTraduccion,
            nombre_idioma: inputIdioma,
            traduccion_comun: inputComun,
            traduccion_oficial: inputOficial,
          }),
        }
      );
      if (infPaises.ok) {
        let infPaisesJs = await infPaises.json();
        setModal(false);
        toast.success(infPaisesJs?.msg, {
          position: "top-center",
        });
        fetchMostrarPaises(currentPage, paisesPerPage);
      }
    } catch (error) {
      console.log("El error es: ", error);
    }
  };

      // Limpiar los input por si tienen datos y abre el modal para crear nuevo país
  const limpiarInput = async () => {
    setInputTraduccion("");
    setInputPais("");
    setInputIdioma("");
    setInputComun("");
    setInputOficial("");
    setModalCrear(true);
  };

  // Crear País
  const fetchCrearTraduccion = async () => {
    try {
      const infPaises = await fetch(
        "http://127.0.0.1:5000/servicio-2/nombre-pais-traducciones",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id_traduccion: inputTraduccion,
            fk_pais: inputPais,
            nombre_idioma: inputIdioma,
            traduccion_comun: inputComun,
            traduccion_oficial: inputOficial,
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
        <h2 className="titulo-tablaPaises">Traducción Nombre Paises</h2>
        <button onClick={() => {limpiarInput()}}>Crear Traducción Nombre País</button>
        <div className="table-container">
          <table className="table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>Pais</th>
                <th>Nombre Idioma</th>
                <th>Traducción Común</th>
                <th>Traducción Oficial</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {listPaises.map((item, id) => (
                <>
                  <tr key={id}>
                    <td>{item.id_traduccion}</td>
                    <td>{item.nombre_paises}</td>
                    <td>{item.nombre_idioma}</td>
                    <td>{item.traduccion_comun}</td>
                    <td>{item.traduccion_oficial}</td>
                    <td style={{ display: "flex", gap: "10px" }}>
                      <button onClick={() => guardarInput(item.id_traduccion)}>Actualizar</button>
                    </td>
                  </tr>
                </>
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
              <h3>Actualizar Traducción Nombre País</h3>
              <label>ID Traducción</label>
              <input value={inputTraduccion} disabled />
              <label>Nombre País</label>
              <input value={inputPais} disabled/>
              <label>Idioma</label>
              <input value={inputIdioma} onChange={(e) => setInputIdioma(e.target.value)} />
              <label>Traducción Común</label>
              <input value={inputComun} onChange={(e) => setInputComun(e.target.value)} />
              <label>Traducción Oficial</label>
              <input value={inputOficial} onChange={(e) => setInputOficial(e.target.value)} />
              <div className="button-acciones">
                <button onClick={() => {fetchActualizarPaises()}}>Actualizar</button>
                <button onClick={() => {setModal(false)}}>Cerrar</button>
              </div>
            </div>
          )}
        {modalCrear && (
          <div className="modal-actualizar">
            <h3>Crear Traducción Nombre País</h3>
            <label>ID Traducción</label>
            <input value={inputTraduccion} onChange={(e) => setInputTraduccion(e.target.value)} />
            <label>ID Nombre País</label>
            <input value={inputPais} onChange={(e) => setInputPais(e.target.value)}/>
            <label>Idioma</label>
            <input value={inputIdioma} onChange={(e) => setInputIdioma(e.target.value)} />
            <label>Traducción Común</label>
            <input value={inputComun} onChange={(e) => setInputComun(e.target.value)} />
            <label>Traducción Oficial</label>
            <input value={inputOficial} onChange={(e) => setInputOficial(e.target.value)} />
            <div className="button-acciones">
              <button onClick={() => {fetchCrearTraduccion()}}>Crear</button>
              <button onClick={() => {setModalCrear(false)}}>Cerrar</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default TablaTraduccionPaises;
