import { useState, useEffect} from 'react'
import { useEstado } from './store/estado.js';
import { useLocation } from 'react-router-dom';
import { getPuntosJugador } from './api/jugador.js'
import  svgBallFootball  from './assets/ball-football.svg?import';
import  backIcon  from './assets/back.svg?import';
import { useNavigate } from 'react-router-dom';

const datoJugador = (label, value) => {
    return(
        <div className='dato-jugador'>
            <p className='dato-jugador-label'>{label}</p>
            <p className='dato-jugador-value'>{value}</p>
        </div>
    )
}
function Jugador(){
    const [puntosJugador, setPuntosJugador] = useState([]);
    const [titulares, setTitulares] = useState([]);
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const jugador = location.state?.jugador;
    const pos = jugador.posicion;
    const posicionString = pos==1?'Portero':pos==2?'Defensa':pos==3?'Centrocampista':'Delantero';
    const [golesTotales, setGolesTotales] = useState(0);

    useEffect(()=> {
        getPuntosJugador(jugador.id_jugador)
            .then(items => {
                console.log("items: ", items);
              setPuntosJugador(items);
              //console.log("puntos: ", puntosJugador);
              setLoading(true);
            })
            .catch((err) => {
              console.log(err.message);
            });
    },[])

    useEffect(()=> {
        if(loading) {
            console.log("puntos: ", puntosJugador);
            let goles = 0;
            puntosJugador.map((partido) => {
                if(partido.goles!=0) {
                    goles+=partido.goles;
                }
            })
            setGolesTotales(goles);
        }
    },[loading])

    function goBack(){
        navigate('/principal');
        console.log("Ir atras ")
    }
    return(
        <div className='container-jugador'>
            <div className='header-jugador'>
                <button className='button-atras' onClick={goBack}>
                    <img  src={backIcon} style={{width: 40, height: 40}}/>
                </button>
                <h2>{jugador.nombre}</h2>
            </div>
            {loading &&
                <div className='contenido-jugador'>
                    <div className='datos-jugador'>
                        {datoJugador('Posición', posicionString)}
                        <div className='dato-jugador'>
                            <p className='dato-jugador-label'>Equipo</p>
                            <img  src={'/'+jugador.path_foto+'.png'} style={{width: 40, height: 40, marginBottom: 10}}/>
                        </div>
                        {datoJugador('Goles', golesTotales)}
                        {datoJugador('Puntos totales', jugador.puntos_totales)}
                        {datoJugador('Puntos media', jugador.puntos_media)}
                    </div>
                    
                    <div className='partidos-jugador'>
                        {puntosJugador.map((partido, index) => {
                            return(
                                <div className='jugador-puntos-jornada'>
                                    <div className='jugador-puntos-jornada-partido'>
                                        <p>J{partido.numJornada}</p>
                                    </div>
                                    <div className='jugador-puntos-jornada-goles'>
                                        {partido.goles!=0 && [...Array(partido.goles)].map((_, idx) => (
                                            <img src={svgBallFootball} style={{height: 15, width: 15, marginTop: 11, marginLeft: 4}}/>
                                        ))}
                                    </div>
                                    <div className='jugador-puntos-jornada-barra'>
                                        <div style={{height: 15, width: partido.puntosJornada*10, backgroundColor: 'green'}}></div>
                                    </div>
                                    <div className='jugador-puntos-jornada-puntos'>
                                        <p style={{color: partido.puntosJornada<0?'#f44336':partido.puntosJornada<1?'#78909c'
                                            :partido.puntosJornada<5?'#ff9800':partido.puntosJornada<10?'#4caf50':'#2196f3', fontWeight:600}}>
                                        {partido.puntosJornada}</p>
                                    </div>
                                </div>
                            )})}
                    </div>
                </div>
            }
        </div>
    )
}

export default Jugador; 