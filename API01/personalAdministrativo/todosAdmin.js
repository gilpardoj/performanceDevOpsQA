import { getToken } from '../directivo.js'; 
import http from 'k6/http';
import { check } from 'k6';
export const BASE_URL = __ENV.URL_CERT;
export let options = {
  vus: 20,
  duration: '30s',
};

export default function () {
  const token = getToken();
  const baseUrl = getBaseUrl();
  const getUrl = baseUrl + '/api/personal-administrativo';
  const response = http.get(getUrl, {
    headers: {
      Authorization: `Bearer ${token}`, 
    },
  });

  check(response, {
    'GET request fue exitoso': (r) => r.status === 200,
    'Response time < 2000ms': (r) => r.timings.duration < 2000,
  });

}
