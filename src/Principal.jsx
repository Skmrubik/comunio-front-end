import { useState, useEffect, use} from 'react'
import { useLocation } from 'react-router-dom';
import { useEstado } from './store/estado.js';
import './App.css'
import { getPartidosJornada } from './api/jornada';
import { getPartidosJornadaJugados } from './api/jornada';
import { siguienteJornada } from './api/estado';
import { reiniciarJornadaParticipantes } from './api/participante';
import { actualizarJugadores } from './api/jugador';
import { getEstado } from './api/estado';
import ContainerJugadores from './components/ContainerJugadores.jsx';
import ContainerClasificacion from './components/ContainerClasificacion.jsx';
import Partido from './components/Partido.jsx';
import Loader from './components/Loader.jsx';
import {reiniciarDatos, borrarDocumentos} from './api/estado.js';

function Principal(reinicio) {
  const [participantes, setParticipantes] = useState([]);
  const [partidos, setPartidos] = useState([]);
  const [partidosJugados, setPartidosJugados] = useState([]);
  const [numJornada, setNumJornada] = useState(0);
  const [numPartidosJugados, setNumPartidosJugados] = useState(0);
  const location = useLocation();
  const datosParticipante = location.state?.item;
  const jornadaEstado = useEstado((state) => state.numeroJornada);
  const partidosJugadosEstado = useEstado((state) => state.numeroPartidosJugados);
  const setJornadaEstado = useEstado((state) => state.setNumeroJornada);
  const setCambioJornada = useEstado((state) => state.setCambioJornada);
  const setPartidosJugadosEstado = useEstado((state) => state.setNumeroPartidosJugados);  
  const nextJornada = useEstado((state) => state.addJornada);
  const [isLoading, setIsLoading] = useState(false);
  const vaciarPartidosJSON = useEstado((state) => state.emptyPartidosJSON);
  const cambiarIdParticipanteJugadores = useEstado((state) => state.setIdParticipanteJugadores);
  const obtenerIdParticipanteJugadores = useEstado((state) => state.idParticipanteJugadores);
  const obtenerParticipanteRegistrado = useEstado((state) => state.participanteRegistrado)
  const currentState = useEstado.getState();
  const borrarResultadosPartidos = useEstado((state) => state.borrarResultadosPartidos);
  const [mensajeCargando, setMensajeCargando] = useState("Jugando partido");

  //console.log('Estado actual:', currentState);
  
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0, // Establece la posición de scroll en la parte superior del documento
      behavior: 'smooth', // Hace el scroll suave para una mejor experiencia de usuario
    });
  };


  const changeJornadaEstado = (numJornada) => {
    setJornadaEstado(numJornada);
  }

  const cambioJornada = (valor) => {
    setCambioJornada(valor);
  }
  const changePartidosJugadosEstado = (numPartidosJugados) => {
    setPartidosJugadosEstado(numPartidosJugados);
  }

  const changeNextJornada = () => {
    nextJornada();
  }

  useEffect(() => {
    getEstado()
      .then(items => {
        setNumJornada(items.numJornada);
        changeJornadaEstado(items.numJornada);
        setNumPartidosJugados(items.partidosJugados);
        changePartidosJugadosEstado(items.partidosJugados);
        setIsLoading(false);
        getPartidosJornada(items.numJornada)
          .then(items => {
            setPartidos(items);
          })
          .catch((err) => {
            console.log(err.message);
          });
        getPartidosJornadaJugados(items.numJornada)
          .then(items => {
            setPartidosJugados(items);
          })
          .catch((err) => {
            console.log(err.message);
          });
      })
      .catch((err) => {
        console.log(err.message);
      });
    
  }, []);

  function getSiguienteJornada() {
    siguienteJornada()
      .then(items => {
        setNumJornada(items.numJornada);
        setNumPartidosJugados(items.partidosJugados);
        actualizarJugadores() 
        .then(items => {
          getPartidosJornada(numJornada+1)
          .then(items => {
            setPartidos(items);
            changeNextJornada();
            cambioJornada(true);
            vaciarPartidosJSON();
            handleScrollToTop();
            cambiarIdParticipanteJugadores(obtenerParticipanteRegistrado.idParticipante);
          })
          .catch((err) => {
            console.log(err.message);
          });
        })
        .catch((err) => {
          console.log(err.message);
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
    
  }

  function reinicarLiga(){
    setMensajeCargando("Reiniciando liga");
    setIsLoading(true);
    reiniciarDatos()
    .then(items => {
      console.log("Reinicio de datos")
      borrarDocumentos()
      .then(items => {
        console.log("Borrado de documentos")
        setIsLoading(false);
        borrarResultadosPartidos();
        setMensajeCargando("Jugando partido");
      })
      .catch((err) => {
        console.log(err.message);
      });
    })
    .catch((err) => {
      console.log(err.message);
    });
    
  }

  return (
    <div style={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <div className= "principal-container-sub">
        <button className="button-header" onClick={reinicarLiga}>Reiniciar liga</button>
        <h2>{obtenerParticipanteRegistrado.nickname}</h2>
        <button className="button-header">Cerrar sesión</button>
      </div>
      <div className="principal-container">
        <div style={{width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row',
          marginTop: 20, marginBottom: 20
        }}>
          <div style={{width: '5%'}}></div>
          {isLoading && <Loader mensaje={mensajeCargando}/>}
          {!isLoading && <div className="principal-container-main">
            <div className= "container-jugadores-clasificacion">  
              <ContainerJugadores titulo="TITULARES" jugPropios={true} 
                                  idParticipante={obtenerParticipanteRegistrado.idParticipante} />
              <ContainerClasificacion participantes={participantes} />
            </div>
            {partidosJugadosEstado==3 && 
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 20, marginBottom: 20}}>
              <button className='button-siguiente-jornada' onClick={getSiguienteJornada}>SIGUIENTE JORNADA</button>
            </div>}
            <div style={{width: '100%'}}>
              <h2 style={{textAlign: 'center', color: 'maroon', marginTop: 40}}>Jornada {jornadaEstado}</h2>
              <div className='contenedor-partidos'>
                {partidos.map((partido, index) => {
                  var partidoJugado = false;
                  for (let i = 0; i < partidosJugados.length; i++) {
                    if(numJornada == partidosJugados[i].numeroJornada && 
                      partido.idEquipoLocal.idEquipo == partidosJugados[i].idEquipo1 &&
                      partido.idEquipoVisitante.idEquipo == partidosJugados[i].idEquipo2){
                        partidoJugado = true;
                    }
                  }
                  if (partidoJugado) {
                    return <Partido partido={partido} index={index} numJornada={numJornada} loading={setIsLoading} 
                            key={index} buscar={true} partidosJugadosJornada={partidosJugadosEstado} />
                  } else {
                    return <Partido partido={partido} index={index} numJornada={numJornada} loading={setIsLoading}
                            key={index} buscar={false} partidosJugadosJornada={partidosJugadosEstado} />
                  }
                })}
              </div>
            </div>
          </div>}
          <div style={{width: '5%'}}></div>
        </div>
      </div>
    </div>
  )
}

export default Principal;
