import http from 'k6/http';
import { check } from 'k6';
import { getBaseUrl } from '../utils/urlManager.js';
export let options = {
    vus: 20,
    duration: '10s',
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
    check(response, {
        'is status 200': (r) => r.status === 200,
        'is response time < 2000ms': (r) => r.timings.duration < 2000,
    });

}