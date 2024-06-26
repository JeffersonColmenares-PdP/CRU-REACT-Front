import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom"
import './App.css'
import Principal from './components/Principal'
import Paises from "./components/Paises";
import RickAndMorty from "./components/RickAndMorty";
import TablaPaises from "./components/TablaPaises";
import TablaTraduccionPaises from "./components/TablaTraduccionPaises";
import TablaFronteras from "./components/TablaFronteras";
import TablaEspecies from "./components/TablaEspecies";
import TablaPersonajes from "./components/TablaPersonajes";
import TablaPaisPersonaje from "./components/TablaPaisPersonaje";
import TablaUnionPaisFrontera from "./components/TablaUnionPaisFrontera";

function App() {
  const navegar = useNavigate();

  useEffect(() => {
    navegar('/');
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Principal />} />
        <Route path="/paises" element={<Paises />} />
        <Route path="/tabla-paises" element={<TablaPaises />} />
        <Route path="/tabla-traduccion-paises" element={<TablaTraduccionPaises />} />
        <Route path="/tabla-fronteras" element={<TablaFronteras />} />
        <Route path="/rick-and-morty" element={<RickAndMorty />} />
        <Route path="/tabla-personajes" element={<TablaPersonajes />} />
        <Route path="/tabla-especies" element={<TablaEspecies />} />
        <Route path="/tabla-pais-personaje" element={<TablaPaisPersonaje />} />
        <Route path="/tabla-uniones" element={<TablaUnionPaisFrontera />} />
      </Routes>
    </>
  )
}

export default App
