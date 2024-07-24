const { Pool } = require("pg");
const { CONFIG_BD } = require("../config/db");

const pool = new Pool(CONFIG_BD);

const nuevosUser = async (req, res) => {
  // const idEmpleado = req.params.idEmpleado;
  const { nombre, correo, contrasena, estado, tipoDocumento, documento, idrol } = req.body;
  console.log(nombre);

  try {
    const resultMovimiento = await pool.query(
      "INSERT INTO usuarios (nombre, correo, contrasena, estado, tipoDocumento,documento, idRol) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING * ",
      [ nombre, correo, contrasena, estado, tipoDocumento, documento, idrol ]
    );

    res.status(201).json(resultMovimiento.rows[0]);
  } catch (error) {
    console.log("Error al registrar usuario: ", error);
    res
      .status(500)
      .json({ message: "Error interno al procesar la solicitud: ", error });
  }
};

/*
router.post('/registro', async (req, res) => {
  try {
      const { nombre, correo, contraseña, estado, tipodocumento, numeroDc,  idrol } = req.body;
      const newPerson = await registerPerson({ nombre, correo, contraseña, estado, tipodocumento, numeroDc, idrol });
      res.status(201).json(newPerson);
  } catch (error) {
      console.error('Error al registrar persona:', error);
      res.status(500).json({ error: 'Internal server error', details: error.message });
  }
})
*/

module.exports = {
  nuevosUser,
};
