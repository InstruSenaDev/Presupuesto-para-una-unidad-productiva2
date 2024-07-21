const { Pool } = require("pg");
const { CONFIG_BD } = require("../config/db");

const pool = new Pool(CONFIG_BD);

const getRoles = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM roles");

    if (result.rows.length > 0) {
      return res.status(200).json(result.rows);
    }
  } catch (error) {
    console.log(error);
  }
};

async function nuevoUsuario (nombre, correo, contraseña, tipoDocumento,documento, id_rol) {
  try {
      console.log('Insertando nuevo cliente...');
      const client = await pool.connect();
      const queryText = 'INSERT INTO usuarios (nombre, correo, contraseña, tipoDocumento,documento, id_rol) VALUES  ($1, $2, $3, $4, ,$5 ,$6) RETURNING *';
      const values = [nombre, correo, contraseña, tipoDocumento,documento, id_rol];
      const result = await client.query(queryText, values);
      client.release();
      console.log('Usuario insertado con éxito:', result.rows[0]);
      return result.rows[0]; // Devuelve el usuario insertado
  } catch (error) {
      console.error('Error al insertar cliente:', error);
      throw error;
  }
}


module.exports = {
  getRoles,nuevoUsuario
};
