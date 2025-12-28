import http from 'k6/http';
import { check } from 'k6';
import { getBaseUrl } from '../utils/urlManager.js';

export let options = {
    vus: 10,
    duration: '10s',
    
    // Thresholds: Si alguno falla, el test falla y bloquea PRs
    thresholds: {
        http_req_failed: ['rate<0.10'],      // Máx 10% de errores
        http_req_duration: ['p(95)<2000'],   // 95% responde < 2s
        checks: ['rate>0.90'],               // 90% de checks OK
    },
};

const loginPayload = JSON.stringify({
    Nombre_Usuario: __ENV.NOMBRE_USUARIO_AUXILIAR,
    Contraseña: __ENV.CONTRASENA_AUXILIAR,
});

const headers = {
    'Content-Type': 'application/json',
};

export default function () {
    // Verificar variables de entorno
    console.log(`🔑 Usuario: ${__ENV.NOMBRE_USUARIO_AUXILIAR ? 'OK' : 'MISSING'}`);
    console.log(`🔑 Contraseña: ${__ENV.CONTRASENA_AUXILIAR ? 'OK' : 'MISSING'}`);
    
    const baseUrl = getBaseUrl();
    const getUrl = baseUrl + '/api/login/auxiliar';
    console.log(`📍 URL completa: ${getUrl}`);
    const response = http.post(getUrl, loginPayload, { headers });
    
    // Log de debugging para ver detalles del response
    console.log(`🔍 Status: ${response.status}`);
    console.log(`⏱️ Response time: ${response.timings.duration}ms`);
    
    // Si no es 200, mostrar más detalles del error
    if (response.status !== 200) {
        console.log(`❌ Error Response Body: ${response.body}`);
        console.log(`❌ Response Headers: ${JSON.stringify(response.headers)}`);
    }
    
    check(response, {
        'is status 200': (r) => {
            const isOk = r.status === 200;
            if (!isOk) {
                console.log(`❌ Expected status 200, got ${r.status}`);
            }
            return isOk;
        },
        'is response time < 2000ms': (r) => {
            const isOk = r.timings.duration < 2000;
            if (!isOk) {
                console.log(`⏱️❌ Response time too slow: ${r.timings.duration}ms`);
            }
            return isOk;
        },
    });
}