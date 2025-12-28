import http from 'k6/http';
import { check } from 'k6';
import { getBaseUrl } from '../../utils/urlManager.js';

export let options = {
  vus: 12,
  duration: '30s',
};  

const dniAuxiliar = __ENV.DNI_AUXILIAR;

export function setup() {
  const token = getToken();
  return { token: token }; 
}

export default function (data) {
  const token = data.token; 
  
  const baseUrl = getBaseUrl();
  const getUrl = baseUrl + `/api/auxiliares/${dniAuxiliar}/estado`;

  const body = JSON.stringify({}); 

  const response = http.request('PATCH', getUrl, body, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  check(response, {
    'PATCH request fue exitoso': (r) => r.status === 200,
  });
}