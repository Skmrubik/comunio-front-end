import { useState, useEffect} from 'react'
import { getJugadoresTitulares, getJugadoresSuplentesPosicion, cambioJugador } from '../api/jugador';
import  svgIconCambio  from '../assets/angle-right.svg?import';
import  svgBallFootball  from '../assets/ball-football.svg?import';
import  arrowUp  from '../assets/up-chevron.svg?import';
import  arrowDown  from '../assets/down-chevron.svg?import';
import { useEstado } from '../store/estado.js';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function ContainerJugadores ({ titulo, jugPropios, idParticipante }) {

  const numeroJornadaEstado = useEstado((state) => state.numeroJornada);
  const [titulares, setTitulares] = useState([]);
  const [suplentes, setSuplentes] = useState([]);
  const [mostrarSuplentes, setMostrarSuplentes] = useState(false);
  const [jugadoresPropios, setJugadoresPropios] = useState(true);
  const [jugadorCambioActual, setJugadorCambioActual] =useState(0);
  const obtenerIdParticipante = useEstado((state) => state.getIdParticipanteJugadores);
  const obtenerIdParticipanteEstado = useEstado((state) => state.idParticipanteJugadores);
  const numeroPartidosJugados = useEstado((state) => state.numeroPartidosJugados);
  const navigate = useNavigate();

  useEffect(() => {
      setJugadoresPropios(idParticipante == obtenerIdParticipante());
      const idPartCookie = Cookies.get('id_participante'); 
      getJugadoresTitulares(obtenerIdParticipanteEstado)
      .then(items => {
        setTitulares(items);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [obtenerIdParticipanteEstado]);

  useEffect(() => {
    setJugadoresPropios(idParticipante == obtenerIdParticipante());
    const idPartCookie = Cookies.get('id_participante'); 
    getJugadoresTitulares(idPartCookie)
      .then(items => {
        setTitulares(items);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [numeroJornadaEstado]);  
  
  function cambiarJugador(jugador) {
    if (mostrarSuplentes) {
      setMostrarSuplentes(false);
    } else {
      getJugadoresSuplentesPosicion(obtenerIdParticipanteEstado, jugador.posicion)
      .then(items => {
        setSuplentes(items);
        setJugadorCambioActual(jugador.id_jugador)
        setMostrarSuplentes(true);
      })
      .catch((err) => {
        console.log(err.message);
      });
    }
  }
  
  function cambiarJugadorSuplente(jugador, suplente) {
    cambioJugador(jugador, suplente)
      .then(items => {
        setMostrarSuplentes(false);
        const idPartCookie = Cookies.get('id_participante'); 
        getJugadoresTitulares(idPartCookie)
        .then(items => {
          setTitulares(items);
        })
        .catch((err) => {
          console.log(err.message);
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  function goJugador(jugador) {
    navigate('/jugador', { state: { jugador } });  
  }

  return (
    <div className='container-jugadores'>
        <p className='titulo-clasificacion'>{titulo}</p>
        <div className='header-jugadores'>
          <p className='header-jugador-nombre'>Nombre</p>
          <p className='header-jugador-equipo'>Equipo</p>
          <p className={jugadoresPropios?'header-jugador-puntos-jornada-cambio':'header-jugador-puntos-jornada'}>P. Jornada</p>
          <p className={jugadoresPropios?'header-jugador-puntos-media-cambio':'header-jugador-puntos-media'}>P. Media</p>
          <p className={jugadoresPropios?'header-jugador-puntos-totales-cambio':'header-jugador-puntos-totales'}>P. Totales</p>
        </div>
        {titulares.map((jugador, index) => {
          return(
            <>
              <div className='jugador' style={{borderLeft: jugador.posicion==1?'5px solid #ffc107':jugador.posicion==2?'5px solid #2196f3':jugador.posicion==3?'5px solid #4caf50':'5px solid #f44336', 
                borderBottom: index==10?'none':'1px solid #ccc', borderRadius: index==10? '0px 0px 0px 5px':'0px 0px 0px 0px',
                borderTop: index==0?'1px solid #ccc':'none', color: jugadoresPropios?'black':'dimgray'}}key={index}>
                <p className='jugador-nombre' onClick={()=> goJugador(jugador)}>{jugador.nombre}</p>
                <div className='jugador-equipo'>
                  <img  src={'/'+jugador.path_foto+'.png'} style={{width: 25, height: 25, marginTop: 5}}/>
                </div>
                <div className={jugadoresPropios?'jugador-puntos-media-cambio':'jugador-puntos-media'} style={{display: 'flex', flexDirection: 'row', justifyContent: 'end'}}>
                                      {jugador.goles!=0 && [...Array(jugador.goles)].map((_, idx) => (
                                        <img src={svgBallFootball} style={{height: 15, width: 15, marginTop: 11, marginLeft: 4}}/>
                                      ))}
                                      <p className={jugPropios?'jugador-puntos-jornada-cambio':'jugador-puntos-jornada'} style={{color: jugador.puntos_jornada<0?'#f44336':jugador.puntos_jornada<1?'#78909c'
                                        :jugador.puntos_jornada<5?'#ff9800':jugador.puntos_jornada<10?'#4caf50':'#2196f3', fontWeight: 600}}>{jugador.puntos_jornada}</p>
                                    </div>
                <p className={jugadoresPropios?'jugador-puntos-media-cambio':'jugador-puntos-media'}>{jugador.puntos_media}</p>
                <p className={jugadoresPropios?'jugador-puntos-totales-cambio':'jugador-puntos-totales'}>{jugador.puntos_totales}</p>
                {jugadoresPropios && <div className='container-button-cambio'>
                  <button className='cambio-jugador' onClick={(() => cambiarJugador(jugador))} 
                      disabled={numeroPartidosJugados!=0} style={{backgroundColor: numeroPartidosJugados!=0?'gray': 'red',
                      cursor: numeroPartidosJugados!=0?'auto':'pointer'}}>
                    <img src={arrowDown} style={{height: 18, width: 18, justifyContent: 'center', alignItems: 'center'}}/>
                  </button></div>}
              </div>
              {mostrarSuplentes && jugadorCambioActual == jugador.id_jugador && suplentes.map((suplente, id_sup) => {
                return(
                  <div className='jugador' style={{borderLeft: '5px solid #ccc', 
                    borderBottom: index==10?'none':'1px solid #ccc', borderRadius: index==10? '0px 0px 0px 5px':'0px 0px 0px 0px', backgroundColor: 'gainsboro',
                    borderTop: index==0?'1px solid #ccc':'none', color: 'gray'}} key={index+id_sup}>
                    <p className='jugador-nombre' onClick={()=> goJugador(suplente)}>{suplente.nombre}</p>
                    <div className='jugador-equipo'>
                      <img  src={'/'+suplente.path_foto+'.png'} style={{width: 25, height: 25, marginTop: 5}}/>
                    </div>
                    <div className={'jugador-puntos-media-cambio'} style={{display: 'flex', flexDirection: 'row', justifyContent: 'end'}}>
                                          {suplente.goles!=0 && [...Array(suplente.goles)].map((_, idx) => (
                                            <img src={svgBallFootball} style={{height: 15, width: 15, marginTop: 11, marginLeft: 4}}/>
                                          ))}
                                          <p className={'jugador-puntos-jornada-cambio'} style={{color: suplente.puntos_jornada<0?'#f44336':suplente.puntos_jornada<1?'#78909c'
                                            :suplente.puntos_jornada<5?'#ff9800':suplente.puntos_jornada<10?'#4caf50':'#2196f3', fontWeight: 600}}>{suplente.puntos_jornada}</p>
                                        </div>
                    <p className={'jugador-puntos-media-cambio'}>{suplente.puntos_media}</p>
                    <p className={'jugador-puntos-totales-cambio'}>{suplente.puntos_totales}</p>
                    <div className='container-button-cambio'>
                      <button className='cambio-suplente' onClick={(() => cambiarJugadorSuplente(jugador.id_jugador,suplente.id_jugador))}>
                        <img src={arrowUp} style={{height: 18, width: 18, justifyContent: 'center', alignItems: 'center'}}/>
                      </button>
                    </div>
                  </div>
                );
              })}
            </>
          )}) 
        }
    </div>
  )
}
export default ContainerJugadores;