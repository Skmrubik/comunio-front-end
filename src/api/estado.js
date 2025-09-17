import apiClient from "./apiClient";

/* export function getEstado() {
    return fetch('http://localhost:8080/getEstado')
        .then((response) => response.json())
} */

export function getEstado() {
    // Axios maneja la URL y el token automáticamente
    return apiClient.get('/getEstado')
    .then((response) => response.data); // Axios ya convierte a JSON, solo necesitas .data
}

/* export function siguienteJornada() {
    return fetch('http://localhost:8080/siguienteJornada')
        .then((response) => response.json())
}
 */
export function siguienteJornada() {
    // Axios maneja la URL y el token automáticamente
    return apiClient.get('/siguienteJornada')
    .then((response) => response.data); // Axios ya convierte a JSON, solo necesitas .data
}

/* export function siguientePartido() {
    return fetch('http://localhost:8080/siguientePartido')
        .then((response) => response.json())
} */

export function siguientePartido() {
    // Axios maneja la URL y el token automáticamente
    return apiClient.get('/siguientePartido')
    .then((response) => response.data); // Axios ya convierte a JSON, solo necesitas .data
}

/* export function reiniciarDatos() {
    return fetch('http://localhost:8080/reiniciarDatos')
        .then((response) => response.json())
} */

export function reiniciarDatos() {
    // Axios maneja la URL y el token automáticamente
    return apiClient.get('/reiniciarDatos')
    .then((response) => response.data); // Axios ya convierte a JSON, solo necesitas .data
}

export function borrarDocumentos() {
    return fetch('http://localhost:8081/borrarTodosDocumentos')
        .then((response) => response.json())
} 


