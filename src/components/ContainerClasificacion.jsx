import { useState, useEffect} from 'react'
import { getClasificacion } from '../api/participante';

function ContainerClasificacion ({ participantes }) {
    const [clasificacion, setClasificacion] = useState(participantes);

    useEffect(() => {
        getClasificacion()
            .then(items => {
              setClasificacion(items);
            })
            .catch((err) => {
              console.log(err.message);
            });
    }, []);
    
    useEffect(() => {
        const socket = new WebSocket('ws://localhost:8080/websocket-endpoint');
        
        socket.onopen = () => {
            console.log('Conexión WebSocket establecida.');
        };
        
        socket.onmessage = (event) => {
            console.log('Mensaje recibido:', event.data);
            getClasificacion()
            .then(items => {
              setClasificacion(items);
            })
            .catch((err) => {
              console.log(err.message);
            });
        };
        
        socket.onclose = () => {
            console.log('Conexión WebSocket cerrada.');
        };
        
        socket.onerror = (error) => {
            console.error('Error en WebSocket:', error);
        };
    }, [clasificacion]);

    return (
        <div className='container-clasificacion'>
            <p className='titulo-clasificacion'>CLASIFICACIÓN</p>
            {<div className='clasificacion'>
              <div className='header-clasificacion'>
                <p className='header-clasificación-posicion'>Pos.</p>
                <p className='header-clasificación-nickname'>Nombre</p>
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
                  <p className='participante-nickname'>{participante.nickname}</p>
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