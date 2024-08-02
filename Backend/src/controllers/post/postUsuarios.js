const { Pool } = require("pg");
const bcrypt = require('bcrypt')
const { CONFIG_BD } = require("../../config/db");
// app.use(cors());
// app.use(express.json());

const pool = new Pool(CONFIG_BD);

const nuevosUser = async (req, res) => {
  // const idEmpleado = req.params.idEmpleado;
  const { nombre, correo, contrasena, tipodocumento, documento} = req.body;
  console.log(nombre);


  try {
    const buscarUsuario = await pool.query("SELECT * FROM usuarios WHERE correo = $1 OR documento = $2"
      ,[correo, documento]

    )

    console.log(buscarUsuario.rowCount);

    if (buscarUsuario.rowCount >= 1) {
      return res.status(400).json({"message" : "El correo o documento ya existe"})
     
    }

    const hashedPassword = await bcrypt.hash(contrasena, 10);
    const resultMovimiento = await pool.query(
      "INSERT INTO usuarios (nombre, correo, contrasena, estado, tipodocumento,documento, idrol) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING * ",
      [ nombre, correo, hashedPassword, true, tipodocumento, documento, "1" ]
    );

    res.status(201).json(resultMovimiento.rows[0]);
    //res.status(201).json("porno");
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
