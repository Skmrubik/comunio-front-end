import { useState, useEffect} from 'react'
import { getJugadoresTitulares } from '../api/jugador';
import  svgIconCambio  from '../assets/angle-right.svg?import';
import  svgBallFootball  from '../assets/ball-football.svg?import';
import { useEstado } from '../store/estado.js';
import { useNavigate } from 'react-router-dom';

function ContainerJugadores ({ titulo, jugPropios, idParticipante }) {

  const numeroJornadaEstado = useEstado((state) => state.numeroJornada);
  const [titulares, setTitulares] = useState([]);
  const [jugadoresPropios, setJugadoresPropios] = useState(true);
  const obtenerIdParticipante = useEstado((state) => state.getIdParticipanteJugadores);
  const obtenerIdParticipanteEstado = useEstado((state) => state.idParticipanteJugadores);
  const navigate = useNavigate();

  useEffect(() => {
      setJugadoresPropios(idParticipante == obtenerIdParticipante());
      let idParticipanteJugadores = obtenerIdParticipante();
      getJugadoresTitulares(idParticipanteJugadores)
      .then(items => {
        setTitulares(items);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [obtenerIdParticipanteEstado]);

  

  useEffect(() => {
    setJugadoresPropios(idParticipante == obtenerIdParticipante());
    getJugadoresTitulares(idParticipante)
      .then(items => {
        setTitulares(items);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [numeroJornadaEstado]);   
  
  function goJugador(jugador) {
    navigate('/jugador', { state: { jugador } });
  }
  return (
    <div className='container-jugadores'>
        <p className='titulo-clasificacion'>{titulo}</p>
        <div className='header-jugador'>
          <p className='header-jugador-nombre'>Nombre</p>
          <p className='header-jugador-equipo'>Equipo</p>
          <p className={jugadoresPropios?'header-jugador-puntos-jornada-cambio':'header-jugador-puntos-jornada'}>P. Jornada</p>
          <p className={jugadoresPropios?'header-jugador-puntos-media-cambio':'header-jugador-puntos-media'}>P. Media</p>
          <p className={jugadoresPropios?'header-jugador-puntos-totales-cambio':'header-jugador-puntos-totales'}>P. Totales</p>
        </div>
        {titulares.map((jugador, index) => {
        return(
          <div className='jugador' style={{borderLeft: jugador.posicion==1?'5px solid #ffc107':jugador.posicion==2?'5px solid #2196f3':jugador.posicion==3?'5px solid #4caf50':'5px solid #f44336', 
            borderBottom: index==10?'none':'1px solid #ccc', borderRadius: index==10? '0px 0px 0px 5px':'0px 0px 0px 0px',
            borderTop: index==0?'1px solid #ccc':'none'}}key={index}>
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
            {jugadoresPropios && <div className='container-button-cambio'><button className='cambio-jugador'><img src={svgIconCambio} style={{height: 15, width: 15, justifyContent: 'center', alignItems: 'center'}}/></button></div>}
          </div>
        )
        })}
    </div>
  )
}
export default ContainerJugadores;