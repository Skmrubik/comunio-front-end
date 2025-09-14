import { Routes, Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import InicioSesion from './InicioSesion';
import './App.css'
import Principal from './Principal';
import Jugador from './Jugador';
import { Link } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<InicioSesion />} />
        <Route path="/principal" element={<Principal />} />
        <Route path="/jugador" element={<Jugador />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
