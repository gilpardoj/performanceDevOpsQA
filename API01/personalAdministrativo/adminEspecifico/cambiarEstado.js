import { getToken } from '../../directivo.js';
import { getBaseUrl } from '../../utils/urlManager.js';
import http from 'k6/http';
import { check} from 'k6';

export let options = {
  vus: 50,
  duration: '30s',
};

const dniAdmin = __ENV.DNI_ADMIN;
export default function () {
  const token = getToken();
  const baseUrl = getBaseUrl();
  const getUrl = baseUrl + `/api/personal-administrativo/${dniAdmin}/estado`;
  const body = ''; 

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