const { Pool } = require("pg");
const { CONFIG_BD } = require("../config/db");

const pool = new Pool(CONFIG_BD);

const nuevosUser = async (req, res) => {
 // const idEmpleado = req.params.idEmpleado;
  const nombre= req.body.nombreUser
  const correo= req.body.correoUser
  const contrasena = req.body.contrasenaUser
  const estado = req.body.estadoUser
  const tipoDc = req.body.tdcUser
  const documentoNumero = req.body.nDocumento
  const idRol = req.body.rolUser;

  try {
    const resultMovimiento = await pool.query(
      "INSERT INTO usuarios (nombre, correo, contraseña, estado, tipoDocumento,documento, idRol) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING * ",
      []
    );


res.status(201).json(resultMovimiento.rows[0]);
  } catch (error) {
    console.log("Error al registrar usuario: ", error);
    res
      .status(500)
      .json({ message: "Error interno al procesar la solicitud: ", error });
  }
};

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

module.exports = {
  nuevosUser,
};