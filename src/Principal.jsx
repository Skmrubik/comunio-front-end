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
import {reiniciarDatos, borrarDocumentosJornadas, borrarDocumentosPuntos} from './api/estado.js';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

function Principal() {
  const [participantes, setParticipantes] = useState([]);
  const [partidos, setPartidos] = useState([]);
  const [partidosJugados, setPartidosJugados] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [mensajeCargando, setMensajeCargando] = useState("Jugando partido");

  const location = useLocation();
  const navigate = useNavigate();
  const datosParticipante = location.state?.item;
  const jornadaNumero = useEstado((state) => state.numeroJornada);
  const partidosJugadosEstado = useEstado((state) => state.numeroPartidosJugados);
  const setJornadaEstado = useEstado((state) => state.setNumeroJornada);
  const setCambioJornada = useEstado((state) => state.setCambioJornada);
  const setPartidosJugadosEstado = useEstado((state) => state.setNumeroPartidosJugados);  
  const nextJornada = useEstado((state) => state.addJornada);
  
  const vaciarPartidosJSON = useEstado((state) => state.emptyPartidosJSON);
  const cambiarIdParticipanteJugadores = useEstado((state) => state.setIdParticipanteJugadores);
  const obtenerIdParticipanteJugadores = useEstado((state) => state.idParticipanteJugadores);
  const obtenerParticipanteRegistrado = useEstado((state) => state.participanteRegistrado)
  const currentState = useEstado.getState();
  const borrarResultadosPartidos = useEstado((state) => state.borrarResultadosPartidos);
  const initNumeroPartidosJugados = useEstado((state) => state.initNumeroPartidosJugados);
  const initNumeroJornada = useEstado((state) => state.initNumeroJornada);
  

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0, // Establece la posición de scroll en la parte superior del documento
      behavior: 'smooth', // Hace el scroll suave para una mejor experiencia de usuario
    });
  };


  const changeJornadaNumero = (numJornada) => {
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
        //setNumJornada(items.numJornada);
        changeJornadaNumero(items.numJornada);
        //setNumPartidosJugados(items.partidosJugados);
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
            console.log("cargando partidos jugados en estado", items)
            setPartidosJugados(items);
          })
          .catch((err) => {
            console.log(err.message);
          });
      })
      .catch((err) => {
        console.log(err.message);
      });
    console.log("use effect")
    console.log("p",partidos)
    console.log("pJ",partidosJugados)
    console.log(isLoading)
    console.log(mensajeCargando)
  }, []);

  function getSiguienteJornada() {
    siguienteJornada()
      .then(items => {
        changeJornadaNumero(items.numJornada);
        //setNumPartidosJugados(items.partidosJugados);
        changePartidosJugadosEstado(items.partidosJugados);
        actualizarJugadores() 
        .then(items => {
          getPartidosJornada(jornadaNumero+1)
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
      borrarDocumentosJornadas()
      .then(items => {
        console.log("Reinicio de jornadas")
        borrarDocumentosPuntos()
          .then(items => {
            console.log("Borrado de puntos")
            setIsLoading(false);
            borrarResultadosPartidos();
            initNumeroPartidosJugados();
            initNumeroJornada();
            setMensajeCargando("Jugando partido");
          })
          .catch((err) => {
            console.log(err.message);
          })
        .catch((err) => {
          console.log(err.message);
        });
      })
    })
    .catch((err) => {
      console.log(err.message);
    });
  }

  function cerrarSesion(){
    Cookies.remove('user_token');
    navigate('/');
  }
  console.log("RENDERIZADO")
  return (
    <div style={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <div className= "principal-container-sub">
        <button className="button-header" onClick={reinicarLiga}>Reiniciar liga</button>
        <h2>{Cookies.get('nickname')}</h2>
        <button className="button-header" onClick={cerrarSesion}>Cerrar sesión</button>
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
              <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: '40%', justifyContent: 'space-between'}}>
                <ContainerClasificacion />
                {partidosJugadosEstado==3 && 
                  <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 20, marginBottom: 20}}>
                    <button className='button-siguiente-jornada' onClick={getSiguienteJornada}>SIGUIENTE JORNADA</button>
                  </div>}
              </div>
            </div>
            
            <div style={{width: '100%'}}>
              <h2 style={{textAlign: 'center', color: 'maroon', marginTop: 40}}>Jornada {jornadaNumero}</h2>
              <div className='contenedor-partidos'>
                {partidos.map((partido, index) => {
                  var partidoJugado = false;
                  for (let i = 0; i < partidosJugados.length; i++) {
                    if(jornadaNumero == partidosJugados[i].numeroJornada && 
                      partido.idEquipoLocal.idEquipo == partidosJugados[i].idEquipoUno.idEquipo &&
                      partido.idEquipoVisitante.idEquipo == partidosJugados[i].idEquipoDos.idEquipo){
                        partidoJugado = true;
                        console.log("aqui")
                    }
                    /* console.log("ITER ", i)
                     console.log("partido: ", partido)
                     console.log("PartidosJugados: ", partidosJugados)
                    console.log("NumJornada ", numJornada == partidosJugados[i].numeroJornada);
                    console.log("Local ", partido.idEquipoLocal.idEquipo == partidosJugados[i].idEquipoUno.idEquipo);
                    console.log("Visitante ", partido.idEquipoVisitante.idEquipo == partidosJugados[i].idEquipoDos.idEquipo);
                    console.log("variable partido jugado ", partidoJugado)*/
                  }
                  if (partidoJugado) {
                    return <Partido partido={partido} index={index} numJornada={jornadaNumero} loading={setIsLoading} 
                            key={index} buscar={true} partidosJugadosJornada={partidosJugadosEstado} />
                  } else {
                    return <Partido partido={partido} index={index} numJornada={jornadaNumero} loading={setIsLoading}
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
