export function getJugadoresTitulares(idParticipante) {
    return fetch('http://localhost:8080/listJugadoresTitulares?idParticipante='+idParticipante)
        .then((response) => response.json())
}