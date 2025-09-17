import apiClient from "./apiClient";

/* export function getPartidosJornada(numJornada) {
    return fetch('http://localhost:8080/getJornada?numJornada='+numJornada)
        .then((response) => response.json())
} */

export function getPartidosJornada(numJornada) {
    // Axios maneja la URL y el token automáticamente
    return apiClient.get('/getJornada', { 
        params: {
            numJornada: numJornada
        },
    })
    .then((response) => response.data); // Axios ya convierte a JSON, solo necesitas .data
}

export function insertPartido(partido) {
    return fetch('http://localhost:8081/insertPartido',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(partido)
        }
    )
    .then((response) => response.json())
}

export function getPartidosJornadaJugados(numJornada) {
    return fetch('http://localhost:8081/getPartidosJornada?numJornada='+numJornada)
        .then((response) => response.json())
} 

export function getPartidoJornadaJugado(numJornada, idEquipo1) {
    return fetch('http://localhost:8081/getPartidoJornada?numJornada='+numJornada+'&idEquipoLocal='+idEquipo1)
        .then((response) => response.json())
}

export function getJugadoresEquipoJornada(numJornada, equipo) {
    return fetch('http://localhost:8081/getJugadoresPartidoJornada?numJornada='+numJornada+'&equipo='+equipo)
        .then((response) => response.json())
}