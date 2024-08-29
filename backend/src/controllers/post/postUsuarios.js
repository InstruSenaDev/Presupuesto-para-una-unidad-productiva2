const mysql = require("mysql2/promise");
const bcrypt = require('bcrypt');
const { CONFIG_BD } = require("../../config/db");

const pool = mysql.createPool(CONFIG_BD);

const nuevosUser = async (req, res) => {
  const { nombre, correo, contrasena, tipodocumento, documento } = req.body;

  try {
    const [rows] = await pool.query(
      "SELECT * FROM usuarios WHERE correo = ? OR documento = ?",
      [correo, documento]
    );

    if (rows.length >= 1) {
      return res.status(400).json({ "message": "El correo o documento ya existe" });
    }

    const hashedPassword = await bcrypt.hash(contrasena, 10);
    const [result] = await pool.query(
      "INSERT INTO usuarios (nombre, correo, contrasena, estado, tipodocumento, documento, idrol) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [nombre, correo, hashedPassword, "1", tipodocumento, documento, "1"]
    );

    res.status(201).json({ id: result.insertId, nombre, correo });
  } catch (error) {
    console.log("Error al registrar usuario: ", error);
    res.status(500).json({ message: "Error interno al procesar la solicitud.", error: error.message });
  }
};

module.exports = {
  nuevosUser,
};
