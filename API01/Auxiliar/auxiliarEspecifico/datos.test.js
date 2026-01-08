
import { getToken } from '../../directivo.js'; 
import http from 'k6/http';
import { check, sleep } from 'k6';
import { getBaseUrl } from '../../utils/urlManager.js';
export let options = {
  vus: 20,
  duration: '30s', 
};
const dniAuxiliar =   __ENV.DNI_AUXILIAR; 


export default function () {
  const token = getToken();
  const baseUrl = getBaseUrl();
  const getUrl =  baseUrl + `/api/auxiliares/${dniAuxiliar}`;
  const response = http.get(getUrl, {
    headers: {
      Authorization: `Bearer ${token}`, 
    },
  });

  check(response, { 
    'GET request fue exitoso': (r) => r.status === 200,
  });

}
