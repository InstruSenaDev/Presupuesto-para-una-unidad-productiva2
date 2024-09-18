const { Pool } = require("pg");
const bcrypt = require('bcrypt')
// const { CONFIG_BD } = require("../../config/db");
const { CONFIG_BD } = require("../../config/db");

const pool = new Pool(CONFIG_BD);

const nuevosUser = async (req, res) => {
  const { nombre, correo, contrasena, tipodocumento, documento } = req.body;

  console.log("Datos recibidos:", { nombre, correo, contrasena, tipodocumento, documento });

  // Validación de campos vacíos
  if (!nombre || !correo || !contrasena || !tipodocumento || !documento) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  try {
    const buscarUsuario = await pool.query("SELECT * FROM usuarios WHERE correo = $1 OR documento = $2"
      ,[correo, documento]

    )

    console.log(buscarUsuario.rowCount);

    if (buscarUsuario.rowCount >= 1) {
      return res.status(400).json({"message" : "El correo o documento ya existe"})
     
    }

    if (buscarUsuario.rowCount >= 1) {
      return res.status(400).json({ message: "El correo o documento ya existe" });
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(contrasena, 10);
    const resultMovimiento = await pool.query(
      "INSERT INTO usuarios (nombre, correo, contrasena, estado, tipodocumento,documento, idrol) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING * ",
      [ nombre, correo, hashedPassword, true, tipodocumento, documento, "1" ]
    );

    if (buscarUsuario.rowCount >= 1) {
      return res.status(400).json({ message: "El correo o documento ya existe" });
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(contrasena, 10);

    // Insertar el usuario en la base de datos
    const resultMovimiento = await pool.query(
      "INSERT INTO usuarios (nombre, correo, contrasena, estado, tipodocumento, documento, idrol) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [nombre, correo, hashedPassword, true, tipodocumento, documento, "1"]
    );

    const user = resultMovimiento.rows[0];

    // Crear token JWT
    const token = jwt.sign(
      { id: user.idusuario, nombre: user.nombre, correo: user.correo },
      process.env.SECRET_KEY,
      { expiresIn: '1h' }
    );

    res.status(201).json({ user, token });
  } catch (error) {
    console.log("Error al registrar usuario: ", error);
    res.status(500).json({ message: "Error interno al registrar usuario", error: error.message });
  }
};

// Exporta la función para que pueda ser usada en las rutas
module.exports = {
  nuevosUser,
};
