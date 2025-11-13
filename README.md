    README.md — AgroTrack V2.0
    Datos del estudiante
- Nombre: Benjamín Nicolás Siragusa Arbeloa
- DNI / Legajo: 45.235.482
- Materia: Programación Web II
    
    - Actividad Obligatoria 2

 AgroTrack – V 2.0
Portal interno con servidor Express + API REST + MySQL.
Este proyecto es la evolución del MVP desarrollado en la Actividad Obligatoria 1.
En esta segunda versión se incorporan:


- Express como framework HTTP
- API REST de contactos
- Base de datos MySQL
- Validaciones, middlewares y manejo centralizado de errores
- Separación profesional por módulos
- Variables de entorno con dotenv
- Colección de Postman



     Estructura del proyecto

agrotrack/
│
├── server.js
├── db.js
│
├── routes/
│   └── contactos.js
│
├── middleware/
│   ├── loggers.js
│   └── errorHandler.js
│
├── public/
│   ├── index.html
│   ├── contacto.html
│   ├── productos.html
│   ├── login.html
│   ├── consultas.html
│   └── estilos.css
│
├── sql/
│   └── schema.sql
│
├── .env
├── .env.example
├── .gitignore
├── package.json
└── README.md


     Instalación y ejecución
 1. Clonar el repositorio
git clone https://github.com/TU-USUARIO/AgroTrack-V2.0.git
cd AgroTrack-V2.0

 2. Instalar dependencias
npm install

 3. Configurar las variables de entorno
Crear un archivo .env siguiendo este ejemplo:
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_clave
DB_NAME=agrotrack
DB_PORT=3306
PORT=8888

También está incluido un archivo .env.example de referencia.
 4. Crear la base de datos
En MySQL Workbench o consola:
SOURCE sql/schema.sql;

Esto creará la BD agrotrack y la tabla contactos.
 5. Ejecutar el servidor
npm start

Si todo está OK verás:
Servidor Express escuchando en http://localhost:8888


     Rutas disponibles
 1. Rutas del frontend (HTML)
Servidas desde /public:
MétodoRutaDescripciónGET/Página principalGET/contacto.htmlFormulario de contacto (fetch API)GET/productos.htmlPágina de productosGET/login.htmlLogin de demostraciónGET/consultas.htmlVista HTML de consultas guardadasGET/api/contactosVista directa del JSON

 2. Endpoints API REST
📬 POST /api/contactos
Registra una consulta nueva.
Body (JSON):
{
  "nombre": "Benja",
  "email": "benja@example.com",
  "mensaje": "Hola!"
}

Respuestas:

201 Created

{
  "id": 5,
  "nombre": "Benja",
  "email": "benja@example.com",
  "mensaje": "Hola!"
}

400 Bad Request

{ "error": "Todos los campos son obligatorios." }

 GET /api/contactos
Retorna todas las consultas.
Ejemplo:
[
  {
    "id": 1,
    "nombre": "Jorge",
    "email": "jorge@gmail.com",
    "mensaje": "Consulta ejemplo",
    "fecha": "2025-11-12T18:36:00.000Z"
  }
]

 GET /health
Estado del servidor:
{
  "status": "ok",
  "version": "AgroTrack 2.0",
  "time": "2025-11-12T19:08:00.000Z"
}

 Middlewares
 Logger (logger.js)
Registra cada petición en un archivo logs.txt:
[2025-11-12T18:22:00] GET /api/contactos

 Manejo centralizado de errores (errorHandler.js)
Devuelve errores uniformes en formato JSON:
{ "error": "Error interno del servidor" }

 Postman Collection
Se incluye el archivo:
AgroTrack.postman_collection.json

Contiene pruebas para:

-GET /health

-POST /api/contactos

-GET /api/contactos

-Pruebas con email inválido (400)

-Pruebas con campos faltantes (400)

     Validaciones implementadas
-Todos los campos obligatorios (nombre, email, mensaje).
-Email con expresión regular.
-Errores 400 si el input es inválido.
-Errores 500 manejados por middleware.