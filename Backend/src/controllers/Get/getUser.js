const { Pool } = require("pg");
const { CONFIG_BD } = require("../../config/db");

const pool = new Pool(CONFIG_BD);

const llamadoUser = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT nombre,  correo , tipodocumento FROM usuarios"
    );

    if (result.rows.length > 0) {
      return res.status(200).json(result.rows);
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  llamadoUser,
};
