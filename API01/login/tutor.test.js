import http from 'k6/http';
import { check } from 'k6';
import { getBaseUrl } from '../utils/urlManager.js';
export let options = {
    vus: __ENV.VUS || 10,
    duration: '10s',
};

  const loginPayload = JSON.stringify({
    Nombre_Usuario: __ENV.NOMBRE_USUARIO_TUTOR,
    Contraseña: __ENV.CONTRASENA_TUTOR,
  });

const headers = {
    'Content-Type': 'application/json',
};

export default function () {
    const baseUrl = getBaseUrl();
    const getUrl = baseUrl + '/api/login/profesor-tutor-secundaria'
    console.log(`📍 URL completa: ${getUrl}`);
    const response = http.post(getUrl, loginPayload, { headers });
    check(response, {
        'is status 200': (r) => r.status === 200,
        'is response time < 2000ms': (r) => r.timings.duration < 2000,
    });

}