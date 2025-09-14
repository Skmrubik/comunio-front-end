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

export function reiniciarDatos() {
    return fetch('http://localhost:8080/reiniciarDatos')
        .then((response) => response.json())
}

export function borrarDocumentos() {
    return fetch('http://localhost:8081/borrarTodosDocumentos')
        .then((response) => response.json())
}


