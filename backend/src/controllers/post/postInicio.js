const { Pool } = require("pg");
const bcrypt = require("bcrypt");
const crypto = require("crypto"); // Importar módulo crypto
const session = require('express-session'); // Asegúrate de configurar las sesiones en tu aplicación
const { CONFIG_BD } = require("../../config/db");

const pool = new Pool(CONFIG_BD);

// Función para generar una clave secreta única
const generarClaveSecreta = () => {
    return crypto.randomBytes(32).toString('hex');
};

const iniciarSesion = async (req, res) => {
    const { correo, contrasena } = req.body;

    try {
        const result = await pool.query(
            "SELECT * FROM usuarios WHERE correo = $1",
            [correo]
        );

        if (result.rows.length > 0) {
            const user = result.rows[0];
            const isMatch = await bcrypt.compare(contrasena, user.contrasena);

            if (isMatch) {
                // Generar clave secreta única para la sesión del usuario
                const claveSecretaUsuario = generarClaveSecreta();

                // Almacenar la clave secreta en la sesión
                req.session.id = user.id; // Guardar el ID del usuario en la sesión
                req.session.claveSecreta = claveSecretaUsuario; // Guardar la clave secreta en la sesión
                console.log("Sesión activa:", req.session);
                // Enviar respuesta exitosa con datos del usuario
                res.status(200).json({
                    
                    message: "Inicio de sesión exitoso",
                    user: {
                        id: user.id,
                        nombre: user.nombre,
                        correo: user.correo,
                        documento: user.documento,
                        tipodocumento: user.tipodocumento,
                    },
                    claveSecreta: claveSecretaUsuario // Enviar la clave secreta al cliente solo para referencia
                });
            } else {
                res.status(400).json({ message: "Contraseña incorrecta" });
            }
        } else {
            res.status(404).json({ message: "Usuario no encontrado" });
        }
    } catch (error) {
        console.log("Error al iniciar sesión: ", error);
        res.status(500).json({ message: "Error interno al procesar la solicitud", error });
    }
};

module.exports = {
    iniciarSesion,
};
