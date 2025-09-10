export function getPartidosJornada(numJornada) {
    return fetch('http://localhost:8080/getJornada?numJornada='+numJornada)
        .then((response) => response.json())
}