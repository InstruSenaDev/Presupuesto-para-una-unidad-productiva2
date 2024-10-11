const { Pool } = require('pg'); // Importar Pool desde pg
const { CONFIG_BD } = require('../../config/db'); // Importar configuración de la base de datos

const pool = new Pool(CONFIG_BD); // Crear una nueva instancia de Pool con la configuración

const apiUsuarios = async (req, res) => {
  const { nombre } = req.params; // Obtener idusuario de los parámetros de la URL
  console.log('ID usuario:', nombre);

  try {
    // Realizar la consulta a la base de datos
    const result = await pool.query(
      'SELECT nombre FROM usuarios WHERE id = $1', // Cambia 'usuarios' por el nombre correcto de tu tabla
      [idusuario] // Pasar el idusuario como parámetro
    );

    // Verificar si se encontraron usuarios
    if (result.rows.length > 0) {
      return res.status(200).json(result.rows); // Devolver los usuarios encontrados
    } else {
      return res.status(404).json({ message: 'No se encontraron usuarios' });
    }
  } catch (error) {
    // Capturar cualquier error de la base de datos
    console.error('Error al obtener usuarios:', error);
    return res.status(500).json({
      message: 'Error interno del servidor',
      error: error.message || error // Devolver el mensaje de error
    });
  }
};

module.exports = {
  apiUsuarios,
};
