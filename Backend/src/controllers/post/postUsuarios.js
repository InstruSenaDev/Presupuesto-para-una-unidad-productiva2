<<<<<<< HEAD
const { Pool } = require("pg");
const bcrypt = require('bcrypt')
const { CONFIG_BD } = require("../../config/db");

=======
require('dotenv').config();  // Importa y configura dotenv al inicio

const { Pool } = require("pg");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { CONFIG_BD } = require("../../config/db");

// Ahora la clave secreta la obtienes de las variables de entorno
>>>>>>> Juan
const pool = new Pool(CONFIG_BD);

const nuevosUser = async (req, res) => {
  // const idEmpleado = req.params.idEmpleado;
  const { nombre, correo, contrasena, tipodocumento, documento} = req.body;
  console.log(nombre);


  try {
<<<<<<< HEAD
    const buscarUsuario = await pool.query("SELECT * FROM usuarios WHERE correo = $1 OR documento = $2"
      ,[correo, documento]

    )

    console.log(buscarUsuario.rowCount);

    if (buscarUsuario.rowCount >= 1) {
      return res.status(400).json({"message" : "El correo o documento ya existe"})
     
=======
    const buscarUsuario = await pool.query(
      "SELECT * FROM usuarios WHERE correo = $1 OR documento = $2", 
      [correo, documento]
    );

    if (!nombre || !correo || !contrasena || !tipodocumento || !documento) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
>>>>>>> Juan
    }

    if (buscarUsuario.rowCount >= 1) {
      return res.status(400).json({ message: "El correo o documento ya existe" });
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(contrasena, 10);
<<<<<<< HEAD
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
=======

    // Insertar el usuario en la base de datos
    const resultMovimiento = await pool.query(

      "INSERT INTO usuarios (nombre, correo, contrasena, estados, tipodocumento, documento, idrol) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [nombre, correo, hashedPassword, "1", tipodocumento, documento, "1"]
    );

    const user = resultMovimiento.rows[0];

    // Crear token JWT usando la clave secreta del .env
    const token = jwt.sign(
      { id: user.idusuario, nombre: user.nombre, correo: user.correo },
      process.env.SECRET_KEY,  // Se usa la clave secreta desde el archivo .env
      { expiresIn: '1h' }  // El token expira en 1 hora
    );

    res.status(201).json({ user, token });
  } catch (error) {
    console.log("Error al registrar usuario: ", error);
    res.status(500).json({ message: "Error interno al registrar usuario", error: error.message });
>>>>>>> Juan
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
