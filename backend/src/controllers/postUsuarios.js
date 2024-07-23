const { Pool } = require("pg");
const { CONFIG_BD } = require("../config/db");

const pool = new Pool(CONFIG_BD);

const entradaBoveda = async (req, res) => {
  const idEmpleado = req.params.idEmpleado;
  const nombre= req.body.nombreuser
  const entrada_saldo = req.body.entradaSaldo;

  try {
    const resultMovimiento = await pool.query(
      "INSERT INTO usuarios (nombre, correo, contraseña, estado, tipoDocumento,documento, idRol) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING * ",
      []
    );


res.status(201).json(resultMovimiento.rows[0]);
  } catch (error) {
    console.log("Error al registrar movimiento en bóveda: ", error);
    res
      .status(500)
      .json({ message: "Error interno al procesar la solicitud: ", error });
  }
};

module.exports = {
  entradaBoveda,
};