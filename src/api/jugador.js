import apiClient from "./apiClient";

/* export function getJugadoresTitulares(idParticipante) {
    return fetch('http://localhost:8080/listJugadoresTitulares?idParticipante='+idParticipante)
        .then((response) => response.json())
} */

export function getJugadoresTitulares(idParticipante) {
    // Axios maneja la URL y el token automáticamente
    return apiClient.get('/listJugadoresTitulares', { 
        params: {
            idParticipante: idParticipante,
        },
    })
    .then((response) => response.data); // Axios ya convierte a JSON, solo necesitas .data
}

/* export function getJugadoresEquipo(idEquipo) {
    return fetch('http://localhost:8080/listJugadoresPorEquipo?idEquipo='+idEquipo)
        .then((response) => response.json())
} */

export function getJugadoresEquipo(idEquipo) {
    // Axios maneja la URL y el token automáticamente
    return apiClient.get('/listJugadoresPorEquipo', { 
        params: {
            idEquipo: idEquipo,
        },
    })
    .then((response) => response.data); // Axios ya convierte a JSON, solo necesitas .data
}

/* export function actualizarJugadores() {
    return fetch('http://localhost:8080/actualizarJugadores')
        .then((response) => response.json())
} */

export function actualizarJugadores() {
    // Axios maneja la URL y el token automáticamente
    return apiClient.get('/actualizarJugadores')
    .then((response) => response.data); // Axios ya convierte a JSON, solo necesitas .data
}

export function getPuntosJugador(idJugador) {
    return fetch('http://localhost:8081/getPuntosJugador?idJugador='+idJugador)
        .then((response) => response.json())
}


/* export function getJugadoresSuplentesPosicion(idParticipante, posicion) {
    return fetch('http://localhost:8080/listJugadoresSuplentesPosicion?idParticipante='+idParticipante+'&posicion='+posicion)
        .then((response) => response.json())
} */

export function getJugadoresSuplentesPosicion(idParticipante, posicion) {
    // Axios maneja la URL y el token automáticamente
    return apiClient.get('/listJugadoresSuplentesPosicion', { 
        params: {
            idParticipante: idParticipante,
            posicion: posicion
        },
    })
    .then((response) => response.data); // Axios ya convierte a JSON, solo necesitas .data
}

/* export function cambioJugador(idTitular, idSuplente) {
    return fetch('http://localhost:8080/cambioJugador?idTitular='+idTitular+'&idSuplente='+idSuplente)
        .then((response) => response.json())
} */

export function cambioJugador(idTitular, idSuplente) {
    // Axios maneja la URL y el token automáticamente
    return apiClient.get('/cambioJugador', { 
        params: {
            idTitular: idTitular,
            idSuplente: idSuplente
        },
    })
    .then((response) => response.data); // Axios ya convierte a JSON, solo necesitas .data
}
