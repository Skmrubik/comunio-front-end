import { useState, useEffect} from 'react'
import { getClasificacion } from '../api/participante';
import { useEstado } from '../store/estado.js';
import { reiniciarJornadaParticipantes } from '../api/participante';
import { getClasificacionTotal } from '../api/participante';
import Cookies from 'js-cookie';

function ContainerClasificacion () {
    const [clasificacion, setClasificacion] = useState([]);
    const cambioJornadaEstado = useEstado((state) => state.cambioJornada);
    const setCambioJornada = useEstado((state) => state.setCambioJornada);
    const cambiarIdParticipanteJugadores = useEstado((state) => state.setIdParticipanteJugadores);
    const obtenerIdParticipante = useEstado((state) => state.idParticipanteJugadores);
    const [jugadorActivo, setJugadorActivo] = useState(null);

    const cambioJornada = (valor) => {
        setCambioJornada(valor);
    }

    useEffect(() => {
        const idPartCookie = Cookies.get('id_participante'); 
        setJugadorActivo(idPartCookie);
        if (cambioJornadaEstado) {
            reiniciarJornadaParticipantes() 
                .then(items => {
                    getClasificacionTotal()
                    .then(items2 => {
                        setClasificacion(items2);
                    })
                    .catch((err) => {
                        console.log(err.message);
                    });
                })
                .catch((err) => {
                console.log(err.message);
                });
            cambioJornada(false);
        }
    }, [cambioJornadaEstado]);

    useEffect(() => {
      const idPartCookie = Cookies.get('id_participante'); 
      setJugadorActivo(idPartCookie);
      getClasificacion()
          .then(items => {
            setClasificacion(items);
          })
          .catch((err) => {
            console.log(err.message);
          });
    }, []);

    function changeJugadores(participante) {
      cambiarIdParticipanteJugadores(participante.idParticipante);
      setJugadorActivo(participante.idParticipante);
    }

    return (
        <div className='container-clasificacion'>
            <p className='titulo-clasificacion'>CLASIFICACIÓN</p>
            {<div className='clasificacion'>
              <div className='header-clasificacion'>
                <p className='header-clasificación-posicion'>Pos.</p>
                <p className='header-clasificación-nickname'>Nombre</p>
                <p className='header-clasificación-jugadores'>J. Jugados</p>
                <p className='header-clasificación-jornada'>Jornada</p>
                <p className='header-clasificación-totales'>Total</p>
              </div>
              {clasificacion.map((participante, index) => {
                return(
                <div className='participante' key={index}>
                  <div className='participante-posicion'>
                    {index === 0 && <span className='medalla oro'>🥇</span>}
                    {index === 1 && <span className='medalla plata'>🥈</span>}
                    {index === 2 && <span className='medalla bronce'>🥉</span>}
                    {index > 2 && <div className='posicion'>{index+1}</div>}
                  </div>
                  <p className='participante-nickname' onClick={() => changeJugadores(participante)}
                    style={{fontWeight: participante.idParticipante==jugadorActivo? '600': '100'}}>{participante.nickname}</p>
                  <p className='participante-jugadores'>{participante.jugadoresJugados}</p>
                  <p className='participante-puntos-jornada'>{participante.puntosJornadaActual}</p>
                  <p className='participante-puntos-totales'>{participante.puntosTotales}</p>
                </div>
                )
              })}
            </div>}
        </div>
    )
}
export default ContainerClasificacion;