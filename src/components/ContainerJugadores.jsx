import { useState, useEffect } from 'react'
import { getJugadoresTitulares } from '../api/jugador';
import  svgIconCambio  from '../assets/angle-right.svg?import';

function ContainerJugadores ({ titulo, jugPropios }){

  const [titulares, setTitulares] = useState([]);

  useEffect(() => {
    getJugadoresTitulares(1)
      .then(items => {
        setTitulares(items);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <div className='container-jugadores'>
        <p className='titulo-clasificacion'>{titulo}</p>
        <div className='header-jugador'>
          <p className='header-jugador-nombre'>Nombre</p>
          <p className='header-jugador-equipo'>Equipo</p>
          <p className={jugPropios?'header-jugador-puntos-jornada-cambio':'header-jugador-puntos-jornada'}>P. Jornada</p>
          <p className={jugPropios?'header-jugador-puntos-media-cambio':'header-jugador-puntos-media'}>P. Media</p>
          <p className={jugPropios?'header-jugador-puntos-totales-cambio':'header-jugador-puntos-totales'}>P. Totales</p>
        </div>
        {titulares.map((jugador, index) => {
        return(
          <div className='jugador' style={{borderLeft: jugador.posicion==1?'5px solid #ffc107':jugador.posicion==2?'5px solid #2196f3':jugador.posicion==3?'5px solid #4caf50':'5px solid #f44336', 
            borderBottom: index==10?'none':'1px solid #ccc', borderRadius: index==10? '0px 0px 0px 5px':'0px 0px 0px 0px',
            borderTop: index==0?'1px solid #ccc':'none'}}key={index}>
            <p className='jugador-nombre'>{jugador.nombre}</p>
            <div className='jugador-equipo'>
              <img  src={'/'+jugador.path_foto+'.png'} style={{width: 25, height: 25, marginTop: 5}}/>
            </div>
            <p className={jugPropios?'jugador-puntos-jornada-cambio':'jugador-puntos-jornada'}>{jugador.puntos_jornada}</p>
            <p className={jugPropios?'jugador-puntos-media-cambio':'jugador-puntos-media'}>{jugador.puntos_media}</p>
            <p className={jugPropios?'jugador-puntos-totales-cambio':'jugador-puntos-totales'}>{jugador.puntos_totales}</p>
            {jugPropios && <div className='container-button-cambio'><button className='cambio-jugador'><img src={svgIconCambio} style={{height: 15, width: 15, justifyContent: 'center', alignItems: 'center'}}/></button></div>}
          </div>
        )
        })}
    </div>
  )
}
export default ContainerJugadores;