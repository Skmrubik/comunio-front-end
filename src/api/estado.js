export function getEstado() {
    return fetch('http://localhost:8080/getEstado')
        .then((response) => response.json())
}
