const express = require("express");
const router = express.Router();
const pool = require("../db");

// Función auxiliar para validar email
function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// GET /api/contactos - listar todos
router.get("/", async (req, res, next) => {
  try {
    const [rows] = await pool.query("SELECT * FROM contactos ORDER BY fecha DESC");
    res.json(rows);
  } catch (err) {
    next(err);
  }
});

// POST /api/contactos - registrar un nuevo contacto
router.post("/", async (req, res, next) => {
  try {
    const { nombre, email, mensaje } = req.body;

    // Validaciones
    if (!nombre || !email || !mensaje) {
      return res.status(400).json({ error: "Todos los campos son obligatorios." });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ error: "El formato del email no es válido." });
    }

    const [result] = await pool.query(
      "INSERT INTO contactos (nombre, email, mensaje) VALUES (?, ?, ?)",
      [nombre, email, mensaje]
    );

    res.status(201).json({ id: result.insertId, nombre, email, mensaje });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
