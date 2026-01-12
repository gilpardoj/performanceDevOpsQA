export function getBaseUrl(environment = 'CERT') {
  const envUrls = {
    CERT: [
      __ENV.URL_CERT,
    ],
    DEV: [
      __ENV.URL_DEV,      
    ],
    PROD: [
      __ENV.URL_PROD,
    ]
  };

  const targetEnv = __ENV.TARGET_ENV || environment;
  const urls = envUrls[targetEnv];
  
  if (!urls || urls.length === 0) {
    throw new Error(`No se encontraron URLs para el ambiente: ${targetEnv}`);
  }

  const urlIndex = (__VU - 1) % urls.length;
  const selectedUrl = urls[urlIndex];
  
  console.log(`🎯 VU-${__VU} → ${targetEnv}[${urlIndex}] → ${selectedUrl}`);
  
  return selectedUrl;
}
