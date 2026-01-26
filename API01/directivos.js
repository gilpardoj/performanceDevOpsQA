import http from 'k6/http';
import { check } from 'k6';

export let options = {
    vus: __ENV.VUS || 5,           
    duration: '30s',   
};

export default function () {
    const url = 'https://api01-siasis-dev.vercel.app/api/login/directivo';

    const payload = JSON.stringify({
        Nombre_Usuario: 'director.asuncion8',
        Contraseña: '15430124',
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const res = http.post(url, payload, params);

    check(res, {
        'status is 200': (r) => r.status === 200,
    });
}
