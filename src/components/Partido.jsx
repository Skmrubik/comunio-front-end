import React from 'react';
import { useState, useEffect } from 'react'
import { getJugadoresEquipo } from '../api/jugador';
import { insertPartido } from '../api/jornada';
import  svgBallFootball  from '../assets/ball-football.svg?import';
import { getJugadoresEquipoJornada, getPartidoJornadaJugado } from '../api/jornada';
import { siguientePartido } from '../api/estado';
import { useEstado } from '../store/estado.js';

function Partido({partido, index, numJornada, buscar, partidosJugadosJornada, loading, setErrorBack}){ 

    const [jugadoresLocal, setJugadoresLocal] = useState([]);
    const [jugadoresVisitante, setJugadoresVisitante] = useState([]);
    const [resultado, setResultado] = useState([null,null]);
    const [jugado, setJugado] = useState(false);
    const addPartidoJugado = useEstado((state) => state.addPartidoJugado);
    const cambioJornadaEstado = useEstado((state) => state.cambioJornada);
    const setCambioJornada = useEstado((state) => state.setCambioJornada);
    const setPuntosActualizados = useEstado((state) => state.setPuntosActualizados);
    const aniadirPartidoJSON = useEstado((state) => state.addPartidoJSON);
    const getPartidoJSON = useEstado((state) => state.getPartidoJSON);

    const addMatchToStore = (idPartido, res1, res2) => {
      aniadirPartidoJSON(idPartido, res1, res2);
    }

    const setPuntosActualizadosLocal = (valor) => {
      setPuntosActualizados(valor);
    }

    const cambioJornada = (valor) => {
      setCambioJornada(valor);
    }

    const nextPartido = () => {
      addPartidoJugado();
    }

    useEffect(() => {
      setJugado(buscar);
      if (!buscar) {
        const getPartido = getPartidoJSON(index);
        setResultado([getPartido[0],getPartido[1]]);
        getJugadoresEquipo(partido.idEquipoLocal.idEquipo)
          .then(items => {
            setJugadoresLocal(items);
          })
          .catch((err) => {
            console.log(err.message);
            setErrorBack(true);
            setTimeout(function(){
              setErrorBack(false);
            }, 2000);
          });
        getJugadoresEquipo(partido.idEquipoVisitante.idEquipo)
          .then(items => {
            setJugadoresVisitante(items);
          })
          .catch((err) => {
            console.log(err.message);
            setErrorBack(true);
            setTimeout(function(){
              setErrorBack(false);
            }, 2000);
          });
      } else {
        const equipoLocal = partido.idEquipoLocal.idEquipo;
        const equipoVisitante= partido.idEquipoVisitante.idEquipo;
        getPartidoJornadaJugado(numJornada, equipoLocal)
          .then(items => {
            setResultado([items.golesEquipoUno, items.golesEquipoDos]);
          })
          .catch((err) => {
            console.log(err.message);
            setErrorBack(true);
            setTimeout(function(){
              setErrorBack(false);
            }, 2000);
          });
        getJugadoresEquipoJornada(numJornada, equipoLocal)
          .then(items => {
            setJugadoresLocal(items);
          })
          .catch((err) => {
            console.log(err.message);
            setErrorBack(true);
            setTimeout(function(){
              setErrorBack(false);
            }, 2000);
          });
        getJugadoresEquipoJornada(numJornada, equipoVisitante)
          .then(items => {
            setJugadoresVisitante(items);
          })
          .catch((err) => {
            console.log(err.message);
            setErrorBack(true);
            setTimeout(function(){
              setErrorBack(false);
            }, 2000);
          });
      }
      }, []);

    useEffect(() => {
      const equipoLocal = partido.idEquipoLocal.idEquipo;
        getPartidoJornadaJugado(numJornada, equipoLocal)
          .then(items => {
            setResultado([items.golesEquipoUno, items.golesEquipoDos]);
          })
          .catch((err) => {
            console.log(err.message);
            setErrorBack(true);
            setTimeout(function(){
              setErrorBack(false);
            }, 2000);
          });
      if (cambioJornadaEstado) {
        setResultado([null,null]);
        setJugado(false);
        getJugadoresEquipo(partido.idEquipoLocal.idEquipo)
          .then(items => {
            setJugadoresLocal(items);
          })
          .catch((err) => {
            console.log(err.message);
            setErrorBack(true);
            setTimeout(function(){
              setErrorBack(false);
            }, 2000);
          });
        getJugadoresEquipo(partido.idEquipoVisitante.idEquipo)
          .then(items => {
            setJugadoresVisitante(items);
          })
          .catch((err) => {
            console.log(err.message);
            setErrorBack(true);
            setTimeout(function(){
              setErrorBack(false);
            }, 2000);
          });
          cambioJornada(false);
        }
    }, [cambioJornadaEstado]);

    function jugarPartido() {
      loading(true);
      const partidoAJugar = {
        equipoLocal: partido.idEquipoLocal,
        equipoVisitante: partido.idEquipoVisitante,
        jugadoresLocales: jugadoresLocal,
        jugadoresVisitantes: jugadoresVisitante,
        numJornada: numJornada
      }
      insertPartido(partidoAJugar)
        .then((response) => {
          setResultado([response.resultadoLocal, response.resultadoVisitante]);
          addMatchToStore(index, response.resultadoLocal, response.resultadoVisitante);
          setJugadoresLocal(response.jugadoresLocales);
          setJugadoresVisitante(response.jugadoresVisitantes);
          setJugado(true);
          siguientePartido()
          .then((response) => {
            nextPartido();
            setPuntosActualizadosLocal(false);
            loading(false); // Cambia el estado a "false" después de 2 segundos
          })
          .catch((error) => {
            console.error('Error al actualizar el siguiente partido:', error);
            setErrorBack(true);
            setTimeout(function(){
              setErrorBack(false);
            }, 2000);
          });
        })
        .catch((error) => {
          console.error('Error al jugar el partido:', error);
          setErrorBack(true);
          setTimeout(function(){
            setErrorBack(false);
          }, 2000);
        });
    }
    return(
        <div className='partido' key={index}>
          <div className='partido-resultado'>
            <img src={'/'+partido.idEquipoLocal.pathFoto+'.png'} style={{width: 40, height: 40}}/>
            <div className='goles-equipo'>{resultado[0]== null?'': resultado[0]}</div>
            <p> - </p>
            <div className='goles-equipo'>{resultado[1]== null?'': resultado[1]}</div>
            <img src={'/'+partido.idEquipoVisitante.pathFoto+'.png'} style={{width: 40, height: 40}}/>
          </div>
          <div className='partido-jugadores'>
            <div className='jugadores-locales'>
              {jugadoresLocal.map((jugador, index) => {
                return(
                  <div className='jugador-partido' key={index} style={{borderLeft: jugador.posicion==1?'5px solid #ffc107':jugador.posicion==2?'5px solid #2196f3':jugador.posicion==3?'5px solid #4caf50':'5px solid #f44336', 
                  borderBottom: '1px solid #ccc', borderTop: index==0?'1px solid #ccc':'none'}}>
                    <p className='jugador-partido-nombre-local'>{jugador.nombre}</p>
                    <div style={{display: 'flex', flexDirection: 'row'}}>
                      {jugador.goles!=0 && [...Array(jugador.goles)].map((_, idx) => (
                        <img src={svgBallFootball} style={{height: 15, width: 15, marginTop: 11, marginLeft: 4}}/>
                      ))}
                      <div className='puntos-jugador-local' style={{color: jugador.puntosJornada<0?'#f44336':jugador.puntosJornada<1?'#78909c'
                        :jugador.puntosJornada<5?'#ff9800':jugador.puntosJornada<10?'#4caf50':'#2196f3'}}>{jugador.puntosJornada}</div>
                    </div>
                  </div>
                )
              })}
            </div>
            <div className='jugadores-visitantes'>
              {jugadoresVisitante.map((jugador, index) => {
                return(
                  <div className='jugador-partido' key={index} style={{borderRight: jugador.posicion==1?'5px solid #ffc107':jugador.posicion==2?'5px solid #2196f3':jugador.posicion==3?'5px solid #4caf50':'5px solid #f44336', 
                  borderBottom: '1px solid #ccc', borderTop: index==0?'1px solid #ccc':'none'}}>
                    <div style={{display: 'flex', flexDirection: 'row'}}>
                      <div className='puntos-jugador-visitante' style={{color: jugador.puntosJornada<0?'#f44336':jugador.puntosJornada<1?'#78909c'
                      :jugador.puntosJornada<5?'#ff9800':jugador.puntosJornada<10?'#4caf50':'#2196f3'}}>{jugador.puntosJornada}</div>
                      {[...Array(jugador.goles)].map((_, idx) => (
                        <img src={svgBallFootball} style={{height: 15, width: 15, marginTop: 11, marginRight: 4}}/>
                      ))}
                    </div>
                    <p className='jugador-partido-nombre-visitante' >{jugador.nombre}</p>
                  </div>
                )
              })}
            </div>
          </div>
          {!jugado && index==partidosJugadosJornada && 
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 5, marginBottom: 5}}>
                <button className='button-jugar-partido' onClick={jugarPartido}>JUGAR PARTIDO</button>
            </div>
          }
        </div>
    )
}
export default Partido;