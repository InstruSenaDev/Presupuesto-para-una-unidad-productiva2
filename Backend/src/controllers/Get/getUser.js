const mysql = require("mysql2/promise");
const { CONFIG_BD } = require("../../config/db");

const pool = mysql.createPool(CONFIG_BD);

const llamadoUser = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT nombre, correo, tipodocumento FROM usuarios"
    );

    if (rows.length > 0) {
      return res.status(200).json(rows);
    } else {
      return res.status(404).json({ message: "No se encontraron usuarios" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

module.exports = {
  llamadoUser,
};
