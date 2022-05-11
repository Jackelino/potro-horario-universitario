# Generador de Horarios Universitario 

## Descripción

El Generador de Horarios Universitario es una aplicación que, alimentada
de una lista de grupos en un archivo .csv que respeta cierto formato,
genera todas las posibles combinaciones de horarios disponibles que
respetan las limitaciones del usuario.

## Instalación

La aplicación utiliza Vue 3 y webpack para funcionar.

1. Descargar el repositorio de git, a través de `git clone` o en zip.

2. Instalar `node_modules` en la terminal a través del siguiente comando:
```
npm install
```

3. Para levantar el servidor de desarrollo, ejecutar uno de los siguientes
   comandos:
```
npm run watch
npm run dev 
```

4. Para compilar la versión de producción, ejecutar el siguiente comando:

```
npm run build

```
## Especificación de los archivos .csv admitidos

Actualmente, los archivos .csv admitidos por la aplicación tienen la
siguiente especificación por columna:

* Id: tipo de dato entero, numera a las filas. Equivalente a un auto
  incrementable en una base de datos. __Tiene que ser único por fila__.
  * ej. 1, 2, 3

* Nombre de profesor: cadena que representa el nombre del profesor.
  * ej. 'Alan Turing'

* Clave de la materia: cadena alfanumérica que identifica de manera única a
  una materia. Para que dos grupos sean considerados de la misma materia,
  tienen que compartir la misma clave. Puede tener múltiples claves que
  representan a la misma materia, separadas por un '/'.
  * ej. 'LINC17/L41031', 'L4588A3'

* Nombre de la materia: cadena que especifica el nombre de la materia. 
  * ej. 'Introducción a la Física Moderna'

* Clave del grupo: cadena que especifíca un nombre para un grupo
  particular. No se verifica que la cadena sea única porque el
  identificador único del grupo es el primer campo.
  * ej. 'G01', 'Grupo 2'

* Horas de inicio y fin de lunes a domingo: cadena que especifica la hora
  de inicio y fin de una clase por día en formato 24 horas 'HH:MM'.
  Componen 14 campos en total.
  * ej. '13:00'

Si se toman en cuenta todas las especificaciones anteriores, el archivo
resultante tiene el siguiente formato:
```
0,'Stephen Hawking','LINC19/L41031','Física Moderna I','FM02',,,,,'10:00','12:00',,,'10:00','12:00',,,,
1,'Isaac Newton','LINC17','Cálculo Diferencial','CD03','19:00','21:00',,,'19:00','21:00',,,,,,,,
2,'John Von Neumann','LINC18','Arquitectura de Computadoras','AC01','07:00','09:00',,,'07:00','09:00',,,,,,,,
```

### Notas importantes
* Las cadenas solo aceptan la comilla simple __" ' "__ como delimitador.
* EL archivo __no__ debe de tener los descriptores de columna en la primera
  fila.

## Créditos
Creado con ❤️ por [Jose Manuel Fernandez Gomez](https://github.com/Jackelino) y [Carlos Carral Cortés](https://github.com/ccarral).
