import http from 'k6/http';
import { check } from 'k6';
import { getBaseUrl } from './utils/urlManager.js';

export function getToken() {
  const baseUrl = getBaseUrl();
  const loginUrl = baseUrl + '/api/login/directivo';
  const loginPayload = JSON.stringify({
    Nombre_Usuario: __ENV.NOMBRE_USUARIO_DIRECTIVO,
    Contraseña: __ENV.CONTRASENA_DIRECTIVO,
  });

  const headers = { 'Content-Type': 'application/json' };
  const response = http.post(loginUrl, loginPayload, { headers });

  check(response, {
    'Login exitoso': (r) => r.status === 200,
  });

  const token = response.json('data.token');
  return token; 
}

export default function() {
  const token = getToken();
  console.log(`Token obtenido: ${token}`);
}