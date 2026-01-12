import http from 'k6/http';
import { check } from 'k6';
import { getBaseUrl } from '../utils/urlManager.js';

export let options = {
    vus: 10,
    duration: '60s',
    thresholds: {
        http_req_duration: ['p(90)<1000'], 
    },
};

const loginPayload = JSON.stringify({
    Nombre_Usuario: __ENV.NOMBRE_USUARIO_DIRECTIVO,
    Contraseña: __ENV.CONTRASENA_DIRECTIVO,
});

const headers = {
    'Content-Type': 'application/json',
};

export default function () {
    const baseUrl = getBaseUrl();
    const getUrl = baseUrl + '/api/login/directivo'
    const response = http.post(getUrl, loginPayload, { headers });
    
    if (response.status !== 200) {
        console.error(`❌ Error Login [${response.status}] URL: ${url} - Body: ${response.body}`);
    }

    check(response, {
        'Login exitoso (200)': (r) => r.status === 200,
        'Tiempo respuesta < 2s': (r) => r.timings.duration < 2000,
    });
}
