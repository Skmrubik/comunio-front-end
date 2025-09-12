export function getAccess(username, password) {
    return fetch('http://localhost:8080/getAccess?username='+username+'&password='+password)
        .then((response) => response.json())
}

export function getClasificacion() {
    return fetch('http://localhost:8080/getClasificacion')
        .then((response) => response.json())
}

export function reiniciarJornadaParticipantes() {
    return fetch('http://localhost:8080/reiniciarJornadaParticipantes')
        .then((response) => response.json())
}