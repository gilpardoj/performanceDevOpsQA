import { getToken } from '../../directivo.js';
import http from 'k6/http';
import { check} from 'k6';
import { getBaseUrl } from '../../utils/urlManager.js';
export let options = {
  vus: 12,
  duration: '30s',
};

const dniAuxiliar = __ENV.DNI_AUXILIAR;

export default function () {
  const token = getToken();
  const baseUrl = getBaseUrl();
  const getUrl = baseUrl + `/api/auxiliares/${dniAuxiliar}/estado`;

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