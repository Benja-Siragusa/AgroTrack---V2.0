require("dotenv").config();
const express = require("express");
const path = require("path");
const pool = require("./db");

// Rutas
const contactosRouter = require("./routes/contactos");

// Middleware personalizados
const loggers = require("./middleware/loggers");
const errorHandler = require("./middleware/errorHandler");

const app = express();
const PORT = process.env.PORT || 8888;

/* -----------------------------------------------------
 * 1) MIDDLEWARE GENERAL
 * -----------------------------------------------------*/
app.use(loggers);                                   // Logs
app.use(express.json());                            // Para JSON
app.use(express.urlencoded({ extended: true }));    // Formularios
app.use(express.static(path.join(__dirname, "public"))); // Archivos estáticos

/* -----------------------------------------------------
 * 2) ENDPOINTS DE PÁGINAS HTML
 * -----------------------------------------------------*/

// Página principal
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Vista HTML del listado de consultas
app.get("/contacto/listar", async (req, res, next) => {
  try {
    const [rows] = await pool.query("SELECT * FROM contactos ORDER BY fecha DESC");

    const html = `
      <h2>Consultas registradas</h2>
      <table border="1" cellpadding="6">
        <tr>
          <th>ID</th><th>Nombre</th><th>Email</th><th>Mensaje</th><th>Fecha</th>
        </tr>

        ${rows
          .map(
            (r) => `
              <tr>
                <td>${r.id}</td>
                <td>${r.nombre}</td>
                <td>${r.email}</td>
                <td>${r.mensaje}</td>
                <td>${r.fecha.toISOString().slice(0, 19).replace("T", " ")}</td>
              </tr>`
          )
          .join("")}
      </table>
      <br><a href="/">Volver al inicio</a>
    `;

    res.send(html);
  } catch (err) {
    next(err);
  }
});

/* -----------------------------------------------------
 * 3) ENDPOINTS DE ESTADO
 * -----------------------------------------------------*/
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    version: "AgroTrack 2.0",
    time: new Date().toISOString(),
  });
});

/* -----------------------------------------------------
 * 4) RUTAS API (REST)
 * -----------------------------------------------------*/
app.use("/api/contactos", contactosRouter);

/* -----------------------------------------------------
 * 5) LOGIN DEMO (simulado)
 * -----------------------------------------------------*/
app.post("/auth/recuperar", (req, res) => {
  const { usuario, clave } = req.body;

  if (!usuario || !clave) {
    return res.status(400).json({ error: "Faltan credenciales." });
  }

  // Login simulado
  if (usuario === "demo" && clave === "1234") {
    return res.json({
      mensaje: "Inicio de sesión exitoso",
      usuario,
      rol: "demo",
      token: "fake-jwt-demo-12345",
    });
  }

  res.status(401).json({
    error: "Credenciales incorrectas",
    detalle: { usuario, clave },
  });
});

/* -----------------------------------------------------
 * 6) HANDLER DE ERRORES (GLOBAL)
 * -----------------------------------------------------*/
app.use(errorHandler);

/* -----------------------------------------------------
 * 7) INICIO DEL SERVIDOR
 * -----------------------------------------------------*/
app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en http://localhost:${PORT}`);
});
