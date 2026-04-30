# Predicción de Delitos en Uruguay

Este proyecto busca predecir la cantidad de delitos mensuales en Uruguay usando machine learning.

## Idea

La idea fue bastante simple, ver si a partir de lo que pasó en meses anteriores se puede estimar lo que va a pasar el mes siguiente.

## Datos

Se usaron datos reales de delitos en Uruguay, que se agruparon por mes para construir una serie temporal.

## Qué hice

- Limpieza de datos
- Agrupación por año y mes
- Creación de variables de rezago 
- Entrenamiento de un modelo de regresión lineal
- Evaluación con MAE y R²

## Modelo

Se usó regresión lineal porque:

- Es simple
- Es fácil de interpretar
- Para este problema alcanza

## Resultados

- MAE: 654
- R²: 0.27

No es un modelo perfecto, pero tiene sentido porque los datos tienen bastante variabilidad.

## Predicción

La predicción para el próximo mes es de aproximadamente:

**13.943 delitos**

## Pruebas extra

Se probó agregar homicidios como variable adicional para ver si mejoraba el modelo, pero no hubo cambios en los resultados, por lo que se descartó.

## Tech stack

- Python (pandas, sklearn)
- Jupyter Notebook
- React + Bootstrap (para visualización)

## Conclusión

El modelo logra capturar parte del comportamiento temporal, pero muestra las limitaciones típicas de este tipo de problemas, mucha variabilidad y dificultad para predecir cambios bruscos.

Aún así, sirve como una buena aproximación y como ejercicio práctico de machine learning aplicado a datos reales.