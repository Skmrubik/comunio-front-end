import apiClient from "./apiClient";

/* export function getPartidosJornada(numJornada) {
    return fetch('http://localhost:8080/getJornada?numJornada='+numJornada)
        .then((response) => response.json())
} */

export function getPartidosJornada(numJornada) {
    // Axios maneja la URL y el token automáticamente
    return apiClient.get('/getJornada', { 
        params: {
            numJornada: numJornada
        },
    })
    .then((response) => response.data); // Axios ya convierte a JSON, solo necesitas .data
}

/* export function insertPartido(partido) {
    return fetch('http://localhost:8080/insertPartido',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(partido)
        }
    )
    .then((response) => response.json())
} */

export async function insertPartido(partido) {
    // Axios maneja la URL y el token automáticamente
    try {
        // La función .post() toma la URL del endpoint y los datos del cuerpo
        const response = await apiClient.post('/insertPartido', partido,{
            headers: {'Content-Type': 'application/json'}
        });

        console.log('Respuesta del servidor:', response.data);
        return response.data; // O el dato que necesites
    } catch (error) {
        console.error('Hubo un error al enviar los datos:', error);
        // Manejar el error de forma adecuada
        throw error;
    }
/*     return apiClient.post('/insertPartido', {
            method: 'POST',
            headers: {...apiClient.config.headers, 'Content-Type': 'application/json'},
            body: {"partido": JSON.stringify(partido)}
        })
    .then((response) => response.data); // Axios ya convierte a JSON, solo necesitas .data */
}


/* export function getPartidosJornadaJugados(numJornada) {
    return fetch('http://localhost:8080/getPartidosJornada?numJornada='+numJornada)
        .then((response) => response.json())
}  */

export function getPartidosJornadaJugados(numJornada) {
    // Axios maneja la URL y el token automáticamente
    return apiClient.get('/getPartidosJornada', { 
        params: {
            numJornada: numJornada
        },
    })
    .then((response) => response.data); // Axios ya convierte a JSON, solo necesitas .data
}

/* export function getPartidoJornadaJugado(numJornada, idEquipo1) {
    return fetch('http://localhost:8080/getPartidoJornada?numJornada='+numJornada+'&idEquipoLocal='+idEquipo1)
        .then((response) => response.json())
} */

export function getPartidoJornadaJugado(numJornada, idEquipo1) {
    // Axios maneja la URL y el token automáticamente
    return apiClient.get('/getPartidoJornada', { 
        params: {
            numJornada: numJornada,
            idEquipoLocal: idEquipo1
        },
    })
    .then((response) => response.data); // Axios ya convierte a JSON, solo necesitas .data
}

/* export function getJugadoresEquipoJornada(numJornada, equipo) {
    return fetch('http://localhost:8080/getJugadoresPartidoJornada?numJornada='+numJornada+'&equipo='+equipo)
        .then((response) => response.json())
} */

export function getJugadoresEquipoJornada(numJornada, equipo) {
    // Axios maneja la URL y el token automáticamente
    return apiClient.get('/getJugadoresPartidoJornada', { 
        params: {
            numJornada: numJornada,
            equipo: equipo
        },
    })
    .then((response) => response.data); // Axios ya convierte a JSON, solo necesitas .data
}