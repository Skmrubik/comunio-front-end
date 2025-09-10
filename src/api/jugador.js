export function getJugadoresTitulares(idParticipante) {
    return fetch('http://localhost:8080/listJugadoresTitulares?idParticipante='+idParticipante)
        .then((response) => response.json())
}

export function getJugadoresEquipo(idEquipo) {
    return fetch('http://localhost:8080/listJugadoresPorEquipo?idEquipo='+idEquipo)
        .then((response) => response.json())
}
