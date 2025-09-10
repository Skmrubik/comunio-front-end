import { useState, useEffect } from 'react'
import { getJugadoresEquipo } from '../api/jugador';

function Partido({partido, index}){ 

    const [jugadoresLocal, setJugadoresLocal] = useState([]);
    const [jugadoresVisitante, setJugadoresVisitante] = useState([]);

    useEffect(() => {
        getJugadoresEquipo(partido.idEquipoLocal.idEquipo)
          .then(items => {
            setJugadoresLocal(items);
          })
          .catch((err) => {
            console.log(err.message);
          });
        getJugadoresEquipo(partido.idEquipoVisitante.idEquipo)
          .then(items => {
            setJugadoresVisitante(items);
          })
          .catch((err) => {
            console.log(err.message);
          });
      }, []);

    return(
        <div className='partido' key={index}>
          <div className='partido-resultado'>
            <img src={'/'+partido.idEquipoLocal.pathFoto+'.png'} style={{width: 40, height: 40}}/>
            <div className='goles-equipo'></div>
            <p> - </p>
            <div className='goles-equipo'></div>
            <img src={'/'+partido.idEquipoVisitante.pathFoto+'.png'} style={{width: 40, height: 40}}/>
          </div>
          <div className='partido-jugadores'>
            <div className='jugadores-locales'>
              {jugadoresLocal.map((jugador, index) => {
                return(
                  <div className='jugador-partido' key={index} style={{borderLeft: jugador.posicion==1?'5px solid #ffc107':jugador.posicion==2?'5px solid #2196f3':jugador.posicion==3?'5px solid #4caf50':'5px solid #f44336', 
                  borderBottom: '1px solid #ccc', borderTop: index==0?'1px solid #ccc':'none'}}>
                    <p className='jugador-partido-nombre-local'>{jugador.nombre}</p>
                    <div className='puntos-jugador-visitante'>{jugador.puntosJornada==0.0?'':jugador.puntosJornada}</div>
                  </div>
                )
              })}
            </div>
            <div className='jugadores-visitantes'>
              {jugadoresVisitante.map((jugador, index) => {
                return(
                  <div className='jugador-partido' key={index} style={{borderRight: jugador.posicion==1?'5px solid #ffc107':jugador.posicion==2?'5px solid #2196f3':jugador.posicion==3?'5px solid #4caf50':'5px solid #f44336', 
                  borderBottom: '1px solid #ccc', borderTop: index==0?'1px solid #ccc':'none'}}>
                    <div className='puntos-jugador-visitante'>{jugador.puntosJornada==0.0?'':jugador.puntosJornada}</div>
                    <p className='jugador-partido-nombre-visitante'>{jugador.nombre}</p>
                  </div>
                )
              })}
            </div>
          </div>
          <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 5, marginBottom: 5}}>
              <button className='button-jugar-partido'>JUGAR PARTIDO</button>
          </div>
        </div>
    )
}
export default Partido;