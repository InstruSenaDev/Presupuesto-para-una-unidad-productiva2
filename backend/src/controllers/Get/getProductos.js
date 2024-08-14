const { Pool } = require('pg');
const { CONFIG_BD } = require('../../config/db');

const pool = new Pool(CONFIG_BD);

const apiProductos = async (req, res) => {
  const { idusuario } = req.body; // Asumiendo que tienes el idusuario disponible en req.user
  
  try {
    const result = await pool.query(
      "SELECT * FROM producto WHERE idusuario IS NULL OR idusuario = $1",
      [idusuario] // Aquí pasamos el idusuario como parámetro
    );
    
    if (result.rows.length > 0) {
      return res.status(200).json(result.rows);
    } else {
      return res.status(404).json({ message: "No se encontraron productos" });
    }
  } catch (error) {
    console.log("Error al obtener productos:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

module.exports = {
  apiProductos,
};
