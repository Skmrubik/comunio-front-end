import { useState } from 'react'
import { getAccess } from './api/participante';
import { useNavigate } from 'react-router-dom';
import './App.css'

function InicioSesion() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [access, setAccess] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const iniciarSesion = () => {
    if (username === '' || password === '') {
      setError('Por favor, complete todos los campos.');
      return;
    } else {
      getAccess(username, password)
        .then(item => {
          if (item.idParticipante!= null) {
            setAccess(true);
            setError('');
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
