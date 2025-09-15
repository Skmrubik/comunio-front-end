export function getJugadoresTitulares(idParticipante) {
    return fetch('http://localhost:8080/listJugadoresTitulares?idParticipante='+idParticipante)
        .then((response) => response.json())
}

export function getJugadoresEquipo(idEquipo) {
    return fetch('http://localhost:8080/listJugadoresPorEquipo?idEquipo='+idEquipo)
        .then((response) => response.json())
}

export function actualizarJugadores() {
    return fetch('http://localhost:8080/actualizarJugadores')
        .then((response) => response.json())
}

export function getPuntosJugador(idJugador) {
    return fetch('http://localhost:8081/getPuntosJugador?idJugador='+idJugador)
        .then((response) => response.json())
}

export function getJugadoresSuplentesPosicion(idParticipante, posicion) {
    return fetch('http://localhost:8080/listJugadoresSuplentesPosicion?idParticipante='+idParticipante+'&posicion='+posicion)
        .then((response) => response.json())
}

export function cambioJugador(idTitular, idSuplente) {
    return fetch('http://localhost:8080/cambioJugador?idTitular='+idTitular+'&idSuplente='+idSuplente)
        .then((response) => response.json())
}
