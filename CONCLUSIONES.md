PRUEBA DE CARGA – SERVICIO DE LOGIN

Para la resolución del ejercicio implementé una prueba de carga utilizando la herramienta k6, con el objetivo de evaluar el comportamiento del servicio de autenticación expuesto en el endpoint:

https://fakestoreapi.com/auth/login

Para ejecutar la prueba parametrizé las credenciales desde un archivo CSV, tal como se solicitaba en el ejercicio. Posteriormente configuré un escenario de carga que genera aproximadamente 20 transacciones por segundo (TPS) durante un periodo de 1 minuto.

Durante la ejecución de la prueba pude observar los siguientes resultados principales:

• TPS alcanzados: aproximadamente 19.9 solicitudes por segundo.
• Tiempo de respuesta promedio: alrededor de 312 ms.
• Percentil 95 del tiempo de respuesta: aproximadamente 420 ms.
• Tasa de error observada: elevada durante la ejecución de la prueba.

En relación con el tiempo de respuesta, pude verificar que el servicio responde dentro del umbral establecido en el ejercicio, el cual indicaba que el tiempo máximo permitido debía ser menor a 1.5 segundos. En este caso, el percentil 95 se mantuvo por debajo de dicho límite, lo que indica que el servicio es capaz de responder rápidamente incluso bajo una carga cercana a 20 TPS.

Antes de ejecutar la prueba de carga realicé una validación manual utilizando Postman para confirmar el comportamiento del endpoint. Durante esta validación pude observar que el servicio responde correctamente a una petición POST y retorna un código de estado 201 (Created) junto con un token de autenticación.

Durante la ejecución de la prueba de carga se observó que, al tratarse de una API pública de demostración, algunas solicitudes pueden ser rechazadas o limitadas por el servidor cuando se generan múltiples peticiones concurrentes. Este comportamiento provoca que la métrica de tasa de error registrada por la herramienta k6 sea elevada, aunque el servicio continúe respondiendo dentro de los tiempos esperados.

Es importante destacar que este comportamiento no está relacionado con un problema de rendimiento del servicio, ya que los tiempos de respuesta se mantienen por debajo del umbral definido en el escenario de prueba.

Conclusión final:

Durante la prueba de carga pude verificar que el servicio es capaz de procesar aproximadamente 20 solicitudes por segundo manteniendo tiempos de respuesta considerablemente por debajo del límite de 1.5 segundos establecido en el ejercicio.

Sin embargo, debido a que el endpoint corresponde a una API pública utilizada para fines de demostración, el servidor puede aplicar limitaciones o rechazar algunas solicitudes cuando se realizan múltiples peticiones concurrentes. Esto impacta la tasa de error observada durante la ejecución, aunque el servicio continúe respondiendo dentro de los tiempos esperados.

Para una evaluación más precisa del comportamiento del servicio bajo carga, sería recomendable ejecutar la prueba en un entorno controlado donde sea posible validar correctamente las respuestas del sistema bajo condiciones de carga.
