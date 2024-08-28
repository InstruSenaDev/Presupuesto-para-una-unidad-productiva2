require('dotenv').config();  // Importa y configura dotenv al inicio

const { Pool } = require("pg");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const { CONFIG_BD } = require("../../config/db");

const pool = new Pool(CONFIG_BD);

const iniciarSesion = async (req, res) => {
  const { correo, contrasena } = req.body;

  try {
    // Buscar un usuario con el correo proporcionado
    const result = await pool.query(
      "SELECT * FROM usuarios WHERE correo = $1",
      [correo]
    );

    // Verificar si se encontró un usuario con el correo proporcionado
    if (result.rows.length > 0) {
      const user = result.rows[0];
      // Comparar la contraseña proporcionada con la contraseña encriptada almacenada
      const isMatch = await bcrypt.compare(contrasena, user.contrasena);

      if (isMatch) {
        // Si las credenciales son correctas, generar un token JWT
        const token = jwt.sign(
          { id: user.idusuario, nombre: user.nombre, correo: user.correo },
          process.env.SECRET_KEY,  // Usamos la clave secreta desde el archivo .env
          { expiresIn: '1h' }  // El token expira en 1 hora
        );

        res.status(200).json({ message: "Inicio de sesión exitoso", token });
      } else {
        res.status(400).json({ message: "Contraseña incorrecta" });
      }
    } else {
      res.status(404).json({ message: "Usuario no encontrado" });
    }
  } catch (error) {
    console.log("Error al iniciar sesión: ", error);
    res.status(500).json({ message: "Error interno al procesar la solicitud", error: error.message });
  }
};

module.exports = {
  iniciarSesion,
};
