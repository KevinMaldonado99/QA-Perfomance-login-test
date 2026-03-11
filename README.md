PRUEBA DE CARGA – SERVICIO DE LOGIN

Autor: Kevin Samir Maldonado Cotacachi

1. DESCRIPCIÓN

En este ejercicio implementé una prueba de carga sobre el servicio de autenticación expuesto en el endpoint:

https://fakestoreapi.com/auth/login

La prueba fue desarrollada utilizando la herramienta K6 con el objetivo de simular múltiples solicitudes concurrentes al servicio y evaluar su comportamiento bajo carga.

El escenario definido busca generar aproximadamente 20 transacciones por segundo (TPS), validando además que:

* El tiempo de respuesta sea menor a 1.5 segundos.
* La tasa de error sea menor al 3%.

Los datos de autenticación utilizados en la prueba se parametrizan mediante un archivo CSV.

---

2. TECNOLOGÍAS UTILIZADAS

Las siguientes herramientas fueron utilizadas para la implementación del ejercicio:

* K6 v1.6.1
* Sistema operativo: Windows
* Editor utilizado: IntelliJ IDEA
* Lenguaje de scripting: JavaScript (K6)

---

3. ESTRUCTURA DEL PROYECTO

El repositorio contiene la siguiente estructura:

qa-performance-login-test

data/
users.csv
Archivo CSV que contiene las credenciales utilizadas durante la prueba.

scripts/
login_test.js
Script de prueba de carga implementado con K6.

results/
Carpeta destinada a almacenar los resultados exportados de la ejecución.

README.txt
Archivo con las instrucciones para ejecutar el ejercicio.

CONCLUSIONES.txt
Archivo con los hallazgos y conclusiones obtenidas durante la prueba.

---

4. PREPARACIÓN DEL ENTORNO

Para ejecutar la prueba es necesario instalar la herramienta K6.

Instalación en Windows utilizando Winget:

winget install k6

Una vez instalada la herramienta, se puede verificar la instalación ejecutando:

k6 version

La salida esperada debe mostrar la versión instalada de K6.

---

5. EJECUCIÓN DE LA PRUEBA

Para ejecutar el script de carga se debe ubicar en la raíz del proyecto y ejecutar el siguiente comando:

k6 run scripts/login_test.js

Durante la ejecución se simulará un escenario de carga con aproximadamente 20 solicitudes por segundo durante 1 minuto.

---

6. EXPORTAR RESULTADOS

Si se desea exportar los resultados de la prueba a un archivo JSON se puede utilizar el siguiente comando:

k6 run scripts/login_test.js --summary-export=results/resultados.json

Este archivo puede ser utilizado posteriormente para análisis o generación de reportes adicionales.

---

7. ESCENARIO DE PRUEBA IMPLEMENTADO

El escenario configurado en el script contempla las siguientes características:

* Tipo de ejecución: constant-arrival-rate
* Solicitudes por segundo (TPS): 20
* Duración de la prueba: 1 minuto
* Usuarios virtuales preasignados: 20
* Máximo de usuarios virtuales: 50

Validaciones configuradas:

* Percentil 95 del tiempo de respuesta menor a 1.5 segundos.
* Validación del tiempo de respuesta por solicitud.

---

8. ENDPOINT UTILIZADO

El endpoint evaluado durante la prueba es:

https://fakestoreapi.com/auth/login

Tipo de solicitud: POST

Content-Type: application/json

Payload enviado en cada solicitud:

{
"username": "user",
"password": "passwd"
}

---

9. RESULTADOS Y ANÁLISIS

El análisis detallado de los resultados obtenidos durante la ejecución de la prueba se encuentra documentado en el archivo:

CONCLUSIONES.txt

En dicho documento se describen los hallazgos observados durante la prueba de carga.
