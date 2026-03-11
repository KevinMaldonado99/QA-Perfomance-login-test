PRUEBA DE CARGA – SERVICIO DE LOGIN

Para la resolución del ejercicio implementé una prueba de carga utilizando la herramienta k6, con el objetivo de evaluar el comportamiento del servicio de autenticación expuesto en el endpoint:

https://fakestoreapi.com/auth/login

Para ejecutar la prueba parametrizé las credenciales desde un archivo CSV, tal como se solicitaba en el ejercicio. Posteriormente configuré un escenario de carga que genera aproximadamente 20 transacciones por segundo (TPS) durante un periodo de 1 minuto.

Durante la ejecución de la prueba pude observar los siguientes resultados principales:

• TPS alcanzados: aproximadamente 19.8 solicitudes por segundo.
• Tiempo de respuesta promedio: alrededor de 429 ms.
• Percentil 95 del tiempo de respuesta: aproximadamente 699 ms.
• Tasa de error observada: cercana al 79%.

En relación con el tiempo de respuesta, pude verificar que el servicio responde dentro del umbral establecido en el ejercicio, el cual indicaba que el tiempo máximo permitido debía ser menor a 1.5 segundos. En este caso, el percentil 95 se mantuvo por debajo de dicho límite, lo que indica que el servicio es capaz de responder rápidamente incluso bajo una carga cercana a 20 TPS.

Sin embargo, durante la prueba identifiqué que la mayoría de las solicitudes retornaban respuestas de error asociadas a fallos de autenticación. Para validar este comportamiento realicé pruebas manuales utilizando el comando CURL con las mismas credenciales proporcionadas en el archivo CSV. Como resultado, el servicio respondió con el mensaje "username or password is incorrect".

A partir de esta verificación pude concluir que las credenciales proporcionadas en el archivo de datos no son válidas para el servicio actual de la API pública utilizada en el ejercicio. Debido a esto, el servidor devuelve respuestas de error HTTP en la mayoría de las solicitudes, lo que incrementa significativamente la tasa de error registrada durante la prueba de carga.

Es importante destacar que este comportamiento no está relacionado con un problema de rendimiento del servicio, sino con un fallo funcional en la autenticación de las credenciales utilizadas durante la prueba.

Conclusión final:

Durante la prueba de carga pude verificar que el servicio es capaz de procesar aproximadamente 20 solicitudes por segundo manteniendo tiempos de respuesta por debajo del umbral establecido. No obstante, las credenciales utilizadas generan respuestas de autenticación fallida, lo que provoca una tasa de error superior al 3% definido en el escenario de prueba.

Como recomendación, para una evaluación completa del comportamiento del servicio bajo carga, sería necesario contar con credenciales válidas que permitan obtener respuestas exitosas del endpoint y medir de forma más precisa la tasa real de errores del sistema.
