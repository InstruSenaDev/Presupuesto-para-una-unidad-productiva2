const { Pool } = require("pg");
const bcrypt = require("bcrypt");
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

    console.log(result.rows[0]);

    // Verificar si se encontró un usuario con el correo proporcionado
    if (result.rows.length > 0) {
      const user = result.rows[0];
      // Comparar la contraseña proporcionada con la contraseña encriptada almacenada
      const isMatch = await bcrypt.compare(contrasena, user.contrasena);

      if (isMatch) {
        res
          .status(200)
          .json({ message: "Inicio de sesión exitoso", user: user });
      } else {
        res.status(400).json({ message: "Contraseña incorrecta" });
      }
    } else {
      res.status(404).json({ message: "Usuario no encontrado" });
    }
  } catch (error) {
    console.log("Error al iniciar sesión: ", error);
    res
    
      .status(500)
      .json({ message: "Error interno al procesar la solicitud: ", error });
  }
};

module.exports = {
  iniciarSesion,
};
