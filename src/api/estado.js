export function getEstado() {
    return fetch('http://localhost:8080/getEstado')
        .then((response) => response.json())
}

export function siguienteJornada() {
    return fetch('http://localhost:8080/siguienteJornada')
        .then((response) => response.json())
}

export function siguientePartido() {
    return fetch('http://localhost:8080/siguientePartido')
        .then((response) => response.json())
}
