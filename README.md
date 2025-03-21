# API REST para Gestión de Transacciones, Categorías, Etiquetas y Evidencias de Audio

Esta API REST permite gestionar registros de transacciones de dinero, categorías, etiquetas y evidencias de audio. La aplicación está construida con Node.js, Express y MongoDB, y sigue las mejores prácticas de desarrollo, incluyendo validaciones, manejo de errores y modularidad en la estructura del código.

## Índice

- [Instalación](#instalación)
- [Ejecución](#ejecución)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Documentación de los Servicios](#documentación-de-los-servicios)
  - [Transacciones](#transacciones)
  - [Categorías](#categorías)
  - [Etiquetas](#etiquetas)
  - [Evidencias de Audio](#evidencias-de-audio)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Autor](#autor)

## Instalación

1. Clona el repositorio:
   ```bash
   git clone https://tu-repositorio-url.git
   ```
Navega al directorio del proyecto:
   ```bash
   cd mi-api
   ```
Instala las dependencias:
   ```bash
   npm install
   ```
Configura tu conexión a MongoDB en app.js o en config/database.js.

## Ejecución

Para iniciar el servidor en modo desarrollo (con nodemon):
   ```bash
   npm run dev
   ```
Para iniciar el servidor en modo producción:
   ```bash
   npm start
   ```
El servidor se iniciará por defecto en el puerto 3000 (o el definido en la variable de entorno PORT).

## Estructura del Proyecto

```
mi-api/
├── package.json
├── app.js
├── config/
│   └── database.js
├── controllers/
│   ├── transactionController.js
│   ├── categoryController.js
│   ├── tagController.js
│   └── audioEvidenceController.js
├── middlewares/
│   ├── errorHandler.js
│   └── validators.js
├── models/
│   ├── Transaction.js
│   ├── Category.js
│   ├── Tag.js
│   └── AudioEvidence.js
└── routes/
    ├── transactionRoutes.js
    ├── categoryRoutes.js
    ├── tagRoutes.js
    └── audioEvidenceRoutes.js
```

## Documentación de los Servicios

### Transacciones

#### Crear Transacción
- **URL**: /api/transactions
- **Método HTTP**: POST
- **Parámetros (JSON)**:
  - amount (Number, requerido): Monto de la transacción.
  - description (String, requerido): Descripción de la transacción.
  - date (String, formato ISO8601, requerido): Fecha de la transacción.
  - type (String, requerido): Tipo de transacción.
  - categoryId (String, requerido): ID de la categoría asociada.
  - audioPath (String, opcional): Ruta del audio asociado.
  - llmReasoning (String, opcional): Razonamiento o descripción extendida.
  - status (String, requerido): Estado de la transacción.
  - tagIds (Array de Strings, opcional): IDs de las etiquetas asociadas.
- **Descripción**: Crea una nueva transacción en la base de datos.
- **Resultado Exitoso (201)**:
  ```json
  {
    "_id": "60d9f9f9f9f9f9f9f9f9f9f9",
    "amount": 100.0,
    "description": "Compra de insumos",
    "date": "2025-03-21T00:00:00.000Z",
    "type": "egreso",
    "categoryId": "60d9f9f9f9f9f9f9f9f9f9f8",
    "audioPath": "/path/to/audio.mp3",
    "llmReasoning": "Razonamiento de la transacción",
    "status": "completado",
    "tagIds": ["60d9f9f9f9f9f9f9f9f9f9f7"],
    "__v": 0
  }
  ```
- **Errores (400)**: Si faltan campos obligatorios o los datos no cumplen con los validadores, se retorna un JSON con el detalle de los errores.

#### Listar Transacciones
- **URL**: /api/transactions
- **Método HTTP**: GET
- **Descripción**: Retorna la lista de todas las transacciones.
- **Resultado Exitoso (200)**:
  ```json
  [
    {
      "_id": "60d9f9f9f9f9f9f9f9f9f9f9",
      "amount": 100.0,
      "description": "Compra de insumos",
      "date": "2025-03-21T00:00:00.000Z",
      "type": "egreso",
      "categoryId": "60d9f9f9f9f9f9f9f9f9f9f8",
      "audioPath": "/path/to/audio.mp3",
      "llmReasoning": "Razonamiento de la transacción",
      "status": "completado",
      "tagIds": ["60d9f9f9f9f9f9f9f9f9f9f7"],
      "__v": 0
    }
  ]
  ```

### Categorías

#### Crear Categoría
- **URL**: /api/categories
- **Método HTTP**: POST
- **Parámetros (JSON)**:
  - name (String, requerido): Nombre de la categoría.
  - parentId (String, opcional): ID de la categoría padre, si existe.
  - level (Number, requerido): Nivel jerárquico de la categoría.
- **Descripción**: Crea una nueva categoría en la base de datos.
- **Resultado Exitoso (201)**:
  ```json
  {
    "_id": "60d9f9f9f9f9f9f9f9f9f9f8",
    "name": "Alimentos",
    "parentId": null,
    "level": 1,
    "__v": 0
  }
  ```
- **Errores (400)**: Se retornará un JSON con el detalle de errores si los parámetros no son válidos.

#### Listar Categorías
- **URL**: /api/categories
- **Método HTTP**: GET
- **Descripción**: Retorna la lista de todas las categorías.
- **Resultado Exitoso (200)**:
  ```json
  [
    {
      "_id": "60d9f9f9f9f9f9f9f9f9f9f8",
      "name": "Alimentos",
      "parentId": null,
      "level": 1,
      "__v": 0
    }
  ]
  ```

### Etiquetas

#### Crear Etiqueta
- **URL**: /api/tags
- **Método HTTP**: POST
- **Parámetros (JSON)**:
  - name (String, requerido): Nombre de la etiqueta.
- **Descripción**: Crea una nueva etiqueta en la base de datos.
- **Resultado Exitoso (201)**:
  ```json
  {
    "_id": "60d9f9f9f9f9f9f9f9f9f9f7",
    "name": "Urgente",
    "__v": 0
  }
  ```
- **Errores (400)**: Se retornará un JSON con el detalle de errores en caso de datos inválidos.

#### Listar Etiquetas
- **URL**: /api/tags
- **Método HTTP**: GET
- **Descripción**: Retorna la lista de todas las etiquetas.
- **Resultado Exitoso (200)**:
  ```json
  [
    {
      "_id": "60d9f9f9f9f9f9f9f9f9f9f7",
      "name": "Urgente",
      "__v": 0
    }
  ]
  ```

### Evidencias de Audio

#### Crear Evidencia de Audio

- **URL:** `/api/audio-evidences`
- **Método HTTP:** `POST`
- **Parámetros:**
  - **Body (form-data):**
    - `transactionId` (String, requerido): ID de la transacción asociada.
    - `transcription` (String, requerido): Transcripción del audio.
    - `audio` (File, requerido): Archivo de audio a subir.
    - `createdAt` (Date, opcional): Fecha de creación (por defecto se asigna la fecha actual).
- **Descripción:**  
  Sube un archivo de audio y crea una nueva evidencia asociada a una transacción. El archivo se almacena en la carpeta `media/` del proyecto.
- **Resultado Exitoso (201):**
  ```json
  {
    "_id": "60d9f9f9f9f9f9f9f9f9f9f6",
    "transactionId": "60d9f9f9f9f9f9f9f9f9f9f9",
    "audioPath": "media/abcdef123456",  // Ruta del archivo almacenado
    "transcription": "Transcripción del audio",
    "createdAt": "2025-03-21T00:00:00.000Z",
    "__v": 0
  }
   ```

#### Listar Evidencias de Audio
- **URL**: /api/audio-evidences
- **Método HTTP**: GET
- **Descripción**: Este comando utiliza multipart/form-data para subir un archivo de audio.
El campo transactionId asocia la evidencia a una transacción.
El campo transcription contiene la transcripción del audio.
El campo audio envía el archivo; asegúrate de reemplazar /ruta/al/audio.mp3 con la ruta real del archivo en tu sistema.
Sube un archivo de audio y crea una nueva evidencia asociada a una transacción. El archivo se almacena en la carpeta media/ del proyecto.

- **Resultado Exitoso (200)**:
  ```json
  [
    {
      "_id": "60d9f9f9f9f9f9f9f9f9f9f6",
      "transactionId": "60d9f9f9f9f9f9f9f9f9f9f9",
      "audioPath": "/path/to/audio.mp3",
      "transcription": "Transcripción del audio",
      "createdAt": "2025-03-21T00:00:00.000Z",
      "__v": 0
    }
  ]
  ```

## Tecnologías Utilizadas

- **Node.js & Express**: Framework y runtime para construir el API.
- **MongoDB & Mongoose**: Base de datos NoSQL y ODM para definir esquemas y relaciones.
- **express-validator**: Validación de datos en las peticiones HTTP.
- **Nodemon**: Herramienta para desarrollo que reinicia el servidor automáticamente en cada cambio.

