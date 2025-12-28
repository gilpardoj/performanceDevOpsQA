import http from 'k6/http';
import { check } from 'k6';
import { getBaseUrl } from '../utils/urlManager.js';

export let options = {
    vus: 10,
    duration: '10s',
    thresholds: {
        http_req_failed: ['rate<0.01'], 
        http_req_duration: ['p(95)<2000'], 
    },
};
const loginPayload = JSON.stringify({
    Nombre_Usuario: __ENV.NOMBRE_USUARIO_AUXILIAR,
    Contraseña: __ENV.CONTRASENA_AUXILIAR,
});

const params = {
    headers: { 'Content-Type': 'application/json' },
    tags: { name: 'LoginAuxiliar' } 
};

export default function () {
    const url = getBaseUrl() + '/api/login/auxiliar';
    
    const response = http.post(url, loginPayload, params);

    if (response.status !== 200) {
        console.error(`❌ Error Login [${response.status}] URL: ${url} - Body: ${response.body}`);
    }

    check(response, {
        'Login exitoso (200)': (r) => r.status === 200,
        'Tiempo respuesta < 2s': (r) => r.timings.duration < 2000,
    });
}