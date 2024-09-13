// controllers/dataController.js
const pool = require('../../config/db').pool;

exports.createData = async (req, res) => {
  const { fecha, tipo, valor } = req.body;

  try {
    // Inserta los datos en la tabla 'presupuesto' (ajusta el nombre si es diferente)
    const query = `
      INSERT INTO presupuesto (fecha, presupuesto, saldo)
      VALUES ($1, $2, $3) RETURNING *;
    `;

    const result = await pool.query(query, [fecha, tipo, valor]);

    res.status(201).json({
      message: 'Datos guardados exitosamente',
      data: result.rows[0],
    });
  } catch (error) {
    console.error('Error al guardar los datos:', error);
    res.status(500).json({ message: 'Error al guardar los datos', error });
  }
};
