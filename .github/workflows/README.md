# 🚀 GitHub Actions Workflows - K6 Performance Tests

## 📁 Archivos Disponibles

Tienes **3 workflows** para diferentes necesidades:

### 1️⃣ `k6-tests.yml` - **Manual Simple**
✅ **Mejor para:** Ejecutar un test específico en un ambiente determinado

**Características:**
- Ejecución 100% manual desde GitHub
- Seleccionas ambiente (CERT/DEV/PROD)
- Seleccionas archivo de test específico
- No se ejecuta automáticamente

**Cómo usar:**
1. Ve a GitHub → Actions → "K6 Performance Tests"
2. Click en "Run workflow"
3. Elige ambiente: CERT/DEV/PROD
4. Elige archivo: `API01/login/auxiliar.js` (o el que quieras)
5. Click "Run workflow"

---

### 2️⃣ `k6-auto-tests.yml` - **Automático por Cambios**
✅ **Mejor para:** CI/CD automático que detecta qué cambió

**Características:**
- Se ejecuta AUTOMÁTICAMENTE cuando:
  - Haces push a `main` o `develop`
  - Abres/actualizas un Pull Request
- Detecta qué archivos `.js` modificaste en `API01/`
- Ejecuta SOLO los tests que cambiaron
- Usa ambiente CERT por defecto

**Cómo funciona:**
```bash
# Modificas un archivo
git add API01/login/auxiliar.js
git commit -m "Actualizar test de auxiliar"
git push

# 🤖 GitHub Actions detecta el cambio y ejecuta solo ese test
```

---

### 3️⃣ `k6-complete.yml` - **TODO EN UNO** ⭐ RECOMENDADO
✅ **Mejor para:** Tener todo en un solo workflow

**Características:**
- **Modo Manual:** Selecciona ambiente + archivo específico
- **Modo "Todos los tests":** Ejecuta TODOS los tests de una vez
- **Modo Automático:** Detecta cambios en push/PR
- Sube resultados como artifacts (descargas reportes)

**Modos de uso:**

#### A) Manual - Test Específico
1. Actions → "K6 Tests Completo"
2. Run workflow
3. Ambiente: CERT
4. Test file: `API01/login/auxiliar.js`
5. Run

#### B) Manual - Todos los Tests
1. Actions → "K6 Tests Completo"
2. Run workflow
3. Ambiente: PROD
4. Test file: `TODOS_LOS_TESTS` ← Selecciona esta opción
5. Run (ejecuta todos los tests en carpeta API01)

#### C) Automático
```bash
git commit -m "feat: nuevo endpoint login"
git push
# Se ejecuta automáticamente en CERT
```

---

## 🎯 ¿Cuál Usar?

| Situación | Workflow Recomendado |
|-----------|---------------------|
| Quiero probar UN test manualmente | `k6-tests.yml` |
| Quiero CI/CD que ejecute tests modificados | `k6-auto-tests.yml` |
| Quiero TODO (manual + auto + reportes) | `k6-complete.yml` ⭐ |
| Estoy en producción y quiero ejecutar TODOS | `k6-complete.yml` con "TODOS_LOS_TESTS" |

---

## 🔒 Configurar Secrets en GitHub

Para que funcionen los workflows, debes agregar las credenciales como **secrets**:

## 📊 Ver Resultados

Después de ejecutar:
1. Ve a Actions → Click en la ejecución
2. Verás logs en tiempo real
3. Al finalizar, descarga "Artifacts" con reportes detallados

---

## 🛠️ Personalización

### Cambiar ambiente por defecto en modo automático:
Edita el archivo y cambia:
```yaml
TARGET_ENV: ${{ github.event.inputs.environment || 'CERT' }}
#                                                    ↑ Cambia esto
```

### Agregar más archivos de test:
Agrega en la sección `options:` del input `test_file`:
```yaml
- 'API01/nuevo_test.js'
```

### Cambiar ramas de ejecución automática:
```yaml
branches:
  - main
  - develop
  - tu-rama-aqui  ← Agregar aquí
```

---

## 🚨 Troubleshooting

### ❌ Error: "Secret not found"
→ Verifica que agregaste todos los secrets en GitHub Settings

### ❌ Tests fallan con 401
→ Credenciales incorrectas o usuario no existe en ese ambiente

### ❌ Workflow no se ejecuta automáticamente
→ Verifica que modificaste archivos en `API01/**/*.js`
→ Verifica que hiciste push a `main` o `develop`

### ❌ Timeout en tests
→ El workflow tiene límite de 60 segundos por test
→ Ajusta la configuración de VUs/duration en tus scripts

---

## 💡 Tips

- **Recomendación:** Usa `k6-complete.yml` y desactiva los otros dos
- **En producción:** Siempre ejecuta manualmente en PROD
- **En desarrollo:** Deja el modo automático en CERT/DEV
- **Pull Requests:** Los tests se ejecutan automáticamente antes de mergear

---

## 📞 Soporte

Si tienes dudas sobre cómo usar los workflows, revisa:
- [Documentación de GitHub Actions](https://docs.github.com/es/actions)
- [K6 Documentation](https://k6.io/docs/)
