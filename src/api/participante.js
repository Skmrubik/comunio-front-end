export function getAccess(user, pass) {
    return fetch('http://localhost:8080/api/auth/getAccess',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username: user, password: pass})
        }
    )
    .then((response) => response.json())
}

export function getClasificacion() {
    return fetch('http://localhost:8080/getClasificacion')
        .then((response) => response.json())
}

export function getClasificacionTotal() {
    return fetch('http://localhost:8080/getClasificacionTotal')
        .then((response) => response.json())
}

export function reiniciarJornadaParticipantes() {
    return fetch('http://localhost:8080/reiniciarJornadaParticipantes')
        .then((response) => response.json())
}