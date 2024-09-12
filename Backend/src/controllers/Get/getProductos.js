const { Pool } = require('pg');
const { CONFIG_BD } = require('../../config/db');

const pool = new Pool(CONFIG_BD);

const apiProductos = async (req, res) => {
  const { idusuario } = req.params; // Obtener idusuario de los parámetros de la URL
  console.log('ID usuario:', idusuario);

  try {
    const result = await pool.query(
      "SELECT * FROM producto WHERE idusuario = $1",
      [Number(idusuario)] // Usar el idusuario dinámico
    );

    if (result.rows.length > 0) {
      return res.status(200).json(result.rows);
    } else {
      return res.status(404).json({ message: "No se encontraron productos" });
    }
  } catch (error) {
    console.error("Error al obtener productos:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

module.exports = {
  apiProductos,
};
