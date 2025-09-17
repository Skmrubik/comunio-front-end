import { useState } from 'react'
import { getAccess } from './api/participante';
import { useNavigate } from 'react-router-dom';
import { useEstado } from './store/estado.js';
import './App.css'
import Cookies from 'js-cookie';

function InicioSesion() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [access, setAccess] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const cambiarParticipanteRegistrado = useEstado((state) => state.setParticipanteRegistrado)
  const cambiarIdParticipanteJugadores = useEstado((state) => state.setIdParticipanteJugadores);

  const iniciarSesion = () => {
    if (username === '' || password === '') {
      setError('Por favor, complete todos los campos.');
      return;
    } else {
      getAccess(username, password)
        .then(item => {
          console.log("Participnate ", item)
          if (item.participante.idParticipante!= null) {
            setAccess(true);
            setError('');
            Cookies.set('user_token', item.jwt_token, { expires: 7 });
            Cookies.set('id_participante', item.participante.idParticipante, { expires: 7 });
            Cookies.set('nickname', item.participante.nickname, { expires: 7 });
            cambiarParticipanteRegistrado(item.participante);
            cambiarIdParticipanteJugadores(item.participante.idParticipante);
            navigate('/principal', { state: { item } });
          } else {
            setError('Usuario y contraseña incorrectos.');
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }

  return (
    <>
      <div className='login-container'> 
        <p style={{textAlign: 'center', fontWeight: 600, fontSize: 20}}>Comunio</p>
          <div>
            <p>Usuario</p>
            <input className="input-inicio-sesion" type="text" onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div>
            <p>Contraseña</p>
            <input className="input-inicio-sesion" type="password" onChange={(e) => setPassword(e.target.value)} />  
          </div>
          <button className="button-inicio-sesion" onClick={iniciarSesion}>INICIAR SESIÓN</button>
          <p style={{color: 'red', fontSize: 11}}>{error}</p>
      </div>
    </>
  )
}

export default InicioSesion;
