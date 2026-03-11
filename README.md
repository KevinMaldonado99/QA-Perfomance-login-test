# PRUEBA DE CARGA – SERVICIO DE LOGIN

Autor: Kevin Samir Maldonado Cotacachi

---

# 1. DESCRIPCIÓN

En este ejercicio implementé una prueba de carga sobre el servicio de autenticación expuesto en el endpoint:

https://fakestoreapi.com/auth/login

La prueba fue desarrollada utilizando la herramienta **k6**, con el objetivo de simular múltiples solicitudes concurrentes al servicio y evaluar su comportamiento bajo carga.

El escenario definido busca generar aproximadamente **20 transacciones por segundo (TPS)**, validando además que:

* El tiempo de respuesta sea menor a **1.5 segundos**
* La tasa de error sea menor al **3%**

Los datos de autenticación utilizados en la prueba se parametrizan mediante un archivo **CSV**, lo que permite reutilizar el script con diferentes credenciales.

---

# 2. TECNOLOGÍAS UTILIZADAS

Las herramientas utilizadas para la implementación del ejercicio fueron:

* **k6 v1.6.1**
* Sistema operativo: Windows
* Editor utilizado: IntelliJ IDEA
* Lenguaje de scripting: JavaScript (k6)

---

# 3. ESTRUCTURA DEL PROYECTO

El repositorio contiene la siguiente estructura:

```
QA-Perfomance-login-test

data/
   users.csv
   Archivo CSV que contiene las credenciales utilizadas durante la prueba.

scripts/
   login_test.js
   Script de prueba de carga implementado con k6.

results/
   Carpeta destinada a almacenar los resultados exportados de la ejecución.

README.md
   Archivo con las instrucciones para ejecutar el ejercicio.

CONCLUSIONES.txt
   Archivo con los hallazgos y conclusiones obtenidas durante la prueba.
```

---

# 4. CLONAR EL REPOSITORIO

Para ejecutar el ejercicio primero se debe clonar el repositorio desde GitHub:

```
git clone https://github.com/KevinMaldonado99/QA-Perfomance-login-test.git
```

Luego ingresar a la carpeta del proyecto:

```
cd QA-Perfomance-login-test
```

---

# 5. PREPARACIÓN DEL ENTORNO

Para ejecutar la prueba es necesario instalar la herramienta **k6**.

Instalación en Windows utilizando **Winget**:

```
winget install k6
```

Una vez instalada la herramienta, se puede verificar la instalación ejecutando:

```
k6 version
```

La salida esperada debe mostrar la versión instalada de **k6**.

---

# 6. EJECUCIÓN DE LA PRUEBA

Para ejecutar el script de carga se debe ubicar en la raíz del proyecto y ejecutar el siguiente comando:

```
k6 run scripts/login_test.js
```

Durante la ejecución se simulará un escenario de carga que genera aproximadamente **20 solicitudes por segundo durante 1 minuto**.

### Nota para entornos Windows / PowerShell

En algunos entornos de Windows el comando **k6** puede no ser reconocido directamente en la terminal porque la ruta del ejecutable no está agregada en las variables de entorno (PATH).

Si ocurre este problema, se puede identificar la ubicación del ejecutable utilizando el siguiente comando en **CMD**:

```
where k6
```

La salida mostrará la ruta donde se encuentra instalado el ejecutable, por ejemplo:

```
C:\Program Files\k6\k6.exe
```

Una vez identificada la ruta, el script puede ejecutarse especificando la ruta completa del ejecutable.

En **PowerShell** se debe utilizar el operador `&` para ejecutar el archivo:

```
& "C:\Program Files\k6\k6.exe" run scripts/login_test.js
```

Este comando ejecutará la prueba de carga utilizando el script ubicado en la carpeta **scripts** del proyecto.

---

# 7. EXPORTAR RESULTADOS

Para exportar los resultados de la ejecución a un archivo JSON se puede utilizar el siguiente comando:

```
k6 run scripts/login_test.js --summary-export=results/resultados.json
```

Si el comando **k6** no es reconocido en PowerShell, se puede ejecutar utilizando la ruta completa del ejecutable:

```
& "C:\Program Files\k6\k6.exe" run scripts/login_test.js --summary-export=results/resultados.json
```

Este comando generará el archivo:

```
results/resultados.json
```

El archivo contiene el resumen de métricas obtenidas durante la ejecución de la prueba, incluyendo:

* número total de solicitudes realizadas
* tiempo de respuesta promedio
* percentiles de latencia
* tasa de errores
* throughput (TPS)

Este archivo puede ser utilizado posteriormente para análisis o generación de reportes adicionales.

---

# 8. ESCENARIO DE PRUEBA IMPLEMENTADO

El escenario configurado en el script contempla las siguientes características:

* Tipo de ejecución: **constant-arrival-rate**
* Solicitudes por segundo (TPS): **20**
* Duración de la prueba: **1 minuto**
* Usuarios virtuales preasignados: **20**
* Máximo de usuarios virtuales: **50**

Validaciones configuradas:

* Percentil 95 del tiempo de respuesta menor a **1.5 segundos**
* Validación del tiempo de respuesta por solicitud

---

# 9. ENDPOINT UTILIZADO

El endpoint evaluado durante la prueba es:

https://fakestoreapi.com/auth/login

Tipo de solicitud: **POST**

Header utilizado:

```
Content-Type: application/json
```

Payload enviado en cada solicitud:

```
{
  "username": "user",
  "password": "passwd"
}
```

---

# 10. RESULTADOS Y ANÁLISIS

El análisis detallado de los resultados obtenidos durante la ejecución de la prueba se encuentra documentado en el archivo:

**CONCLUSIONES.txt**

En dicho documento se describen los hallazgos observados durante la prueba de carga y la interpretación de los resultados obtenidos.
