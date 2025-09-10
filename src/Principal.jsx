import { useState, useEffect } from 'react'
import { getClasificacion } from './api/participante';
import './App.css'
import { getPartidosJornada } from './api/jornada';
import ContainerJugadores from './components/ContainerJugadores.jsx';
import Partido from './components/Partido.jsx';

function Principal() {
  const [participantes, setParticipantes] = useState([]);
  const [partidos, setPartidos] = useState([]);

  useEffect(() => {
    getClasificacion()
      .then(items => {
        setParticipantes(items);
      })
      .catch((err) => {
        console.log(err.message);
      });
    getPartidosJornada(1)
      .then(items => {
        setPartidos(items);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <div className="principal-container">
      <div className= "principal-container-sub">
        <h1>Jugador 1</h1>
      </div>
      <div className= "container-jugadores-clasificacion">  
        <ContainerJugadores titulo="TITULARES" jugPropios={true}/>
        <div className='container-clasificacion'>
          <p className='titulo-clasificacion'>CLASIFICACIÓN</p>
          {<div className='clasificacion'>
            <div className='header-clasificacion'>
              <p className='header-clasificación-posicion'>Pos.</p>
              <p className='header-clasificación-nickname'>Nombre</p>
              <p className='header-clasificación-jornada'>P. Jornada</p>
              <p className='header-clasificación-totales'>P. Totales</p>
            </div>
            {participantes.map((participante, index) => {
              return(
              <div className='participante' key={index}>
                <div className='participante-posicion'>
                  {index === 0 && <span className='medalla oro'>🥇</span>}
                  {index === 1 && <span className='medalla plata'>🥈</span>}
                  {index === 2 && <span className='medalla bronce'>🥉</span>}
                  {index > 2 && <div className='posicion'>{index+1}</div>}
                </div>
                <p className='participante-nickname'>{participante.nickname}</p>
                <p className='participante-puntos-jornada'>{participante.puntosJornadaActual}</p>
                <p className='participante-puntos-totales'>{participante.puntosTotales}</p>
              </div>
              )
            })}
          </div>}
        </div>
      </div>
      <div>
        <h2 style={{textAlign: 'center'}}>J1</h2>
        <div className='contenedor-partidos'>
          {partidos.map((partido, index) => (
            <Partido partido={partido} index={index} key={index}/>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Principal;
