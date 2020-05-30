# fraud-ml-model
Modelo de Regresión Logística para detección de fraude en pensiones

## About
El presente repo presenta la implementación de un modelo de ML aplicado a la detección de fraude mediante una regresión logística.

## Despliegue del modelo
Despues de entrenado el modelo y obtenidos los coefientes, estos se almacenan en una bases de datos con demás carácteristicas del modelo para que cuando se corra de nuevo con nuevos datos, se actualicen automáticamente.

Los datos del modelo que está en la base de datos son leidos desde un servicio web (escrito en NodeJS).

La aplicación web (Construida en Angular Framework) consume el servicio web para obtener la predicción desde los datos capturados en el formulario.

