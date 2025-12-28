
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
  const getUrl =   baseUrl + `/api/personal-administrativo/${dniAdmin}`;
  const response = http.get(getUrl, {
    headers: {
      Authorization: `Bearer ${token}`, 
    },
  });

  check(response, { 
    'GET request fue exitoso': (r) => r.status === 200,
  });

}
