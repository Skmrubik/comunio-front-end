export function getPartidosJornada(numJornada) {
    return fetch('http://localhost:8080/getJornada?numJornada='+numJornada)
        .then((response) => response.json())
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