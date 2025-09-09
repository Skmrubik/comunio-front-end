import { useState, useEffect } from 'react'
import { getClasificacion } from './api/participante';
import './App.css'
import { getJugadoresTitulares } from './api/jugador';

function Principal() {
  const [participantes, setParticipantes] = useState([]);
  const [titulares, setTitulares] = useState([]);

  useEffect(() => {
    getClasificacion()
      .then(items => {
        setParticipantes(items);
      })
      .catch((err) => {
        console.log(err.message);
      });
    getJugadoresTitulares(1)
      .then(items => {
        setTitulares(items);
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
        <div className='container-jugadores'>
          <p className='titulo-clasificacion'>TITULARES</p>
          <div className='header-jugador'>
            <p className='header-jugador-nombre'>Nombre</p>
            <p className='header-jugador-equipo'>Equipo</p>
            <p className='header-jugador-puntos-jornada'>P. Jornada</p>
            <p className='header-jugador-puntos-media'>P. Media</p>
            <p className='header-jugador-puntos-totales'>P. Totales</p>
          </div>
          {titulares.map((jugador, index) => {
            return(
              <div className='jugador' style={{borderLeft: jugador.posicion==1?'5px solid yellow':jugador.posicion==2?'5px solid blue':jugador.posicion==3?'5px solid green':'5px solid red', 
                borderBottom: index==10?'none':'1px solid #ccc', borderRadius: index==10? '0px 0px 0px 5px':'0px 0px 0px 0px'}}key={index}>
                <p className='jugador-nombre'>{jugador.nombre}</p>
                <div className='jugador-equipo'>
                  <img  src={'../public/'+jugador.path_foto+'.png'} style={{width: 25, height: 25, marginTop: 5}}/>
                </div>
                <p className='jugador-puntos-jornada'>{jugador.puntos_jornada}</p>
                <p className='jugador-puntos-media'>{jugador.puntos_media}</p>
                <p className='jugador-puntos-totales'>{jugador.puntos_totales}</p>
              </div>
            )
          })}
        </div>
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
                <p className='participante-posicion'>
                  {index === 0 && <span className='medalla oro'>🥇</span>}
                  {index === 1 && <span className='medalla plata'>🥈</span>}
                  {index === 2 && <span className='medalla bronce'>🥉</span>}
                  {index > 2 && <div className='posicion'>{index+1}</div>}
                </p>
                <p className='participante-nickname'>{participante.nickname}</p>
                <p className='participante-puntos-jornada'>{participante.puntosJornadaActual}</p>
                <p className='participante-puntos-totales'>{participante.puntosTotales}</p>
              </div>
              )
            })}
          </div>}
        </div>
      </div>
    </div>
  )
}

export default Principal;
