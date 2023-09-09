const BASE_PATH = 'http://localhost:8080/api';

export function fetchCiudades() {
    return fetch(`${BASE_PATH}/ciudades`)
        .then((response) => { return response.json() })
        .then((json) => { return json })
        .catch((e) => console.log(e));
}
