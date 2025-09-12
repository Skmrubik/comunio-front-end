import { useState, useEffect, use} from 'react'
import { useLocation } from 'react-router-dom';
import { getClasificacion } from './api/participante';
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

function Principal() {
  const [participantes, setParticipantes] = useState([]);
  const [partidos, setPartidos] = useState([]);
  const [partidosJugados, setPartidosJugados] = useState([]);
  const [numJornada, setNumJornada] = useState(0);
  const [numPartidosJugados, setNumPartidosJugados] = useState(0);
  const location = useLocation();
  const datosParticipante = location.state?.item;

  useEffect(() => {
    getEstado()
      .then(items => {
        setNumJornada(items.numJornada);
        setNumPartidosJugados(items.partidosJugados);
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

  useEffect(() => {
    
  }, [numJornada]);

  function getSiguienteJornada() {
    siguienteJornada()
      .then(items => {
        setNumJornada(items.numJornada);
        setNumPartidosJugados(items.partidosJugados);
      })
      .catch((err) => {
        console.log(err.message);
      });
    reiniciarJornadaParticipantes() 
      .then(items => {
        console.log('Jornada reiniciada');
      })
      .catch((err) => {
        console.log(err.message);
      });
    actualizarJugadores() 
      .then(items => {
        console.log('Jugadores actualizados');
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  return (
    <div className="principal-container">
      <div className="principal-container-main">
        <div className= "principal-container-sub">
          <h1>{datosParticipante.nickname}</h1>
        </div>
        <div className= "container-jugadores-clasificacion">  
          <ContainerJugadores titulo="TITULARES" jugPropios={true} idParticipante={datosParticipante.idParticipante} />
          <ContainerClasificacion participantes={participantes} />
        </div>
        <div>
          <h2 style={{textAlign: 'center'}}>Jornada {numJornada}</h2>
          <div className='contenedor-partidos'>
            {partidos.map((partido, index) => {
              var partidoJugado = false;
              console.log('Partidos:', partido);
              console.log('Partidos jugados:', partidosJugados);
              for (let i = 0; i < partidosJugados.length; i++) {
                if(numJornada == partidosJugados[i].numeroJornada && 
                  partido.idEquipoLocal.idEquipo == partidosJugados[i].idEquipo1 &&
                  partido.idEquipoVisitante.idEquipo == partidosJugados[i].idEquipo2){
                    partidoJugado = true;
                }
              }
              if (partidoJugado) {
                return <Partido partido={partido} index={index} numJornada={numJornada} key={index} buscar={true} />
              } else {
                return <Partido partido={partido} index={index} numJornada={numJornada} key={index} buscar={false} />
              }
          })}
          </div>
        </div>
        {numPartidosJugados==3 && 
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 20, marginBottom: 20}}>
          <button className='button-siguiente-jornada' onClick={getSiguienteJornada}>SIGUIENTE JORNADA</button>
        </div>}
      </div>
    </div>
  )
}

export default Principal;
