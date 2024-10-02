// controllers/post/postInicio.js
const { Pool } = require("pg");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { CONFIG_BD } = require("../../config/db");
const { claveSecreta } = require('../middleware/crypto'); // Importar la clave secreta

const pool = new Pool(CONFIG_BD);

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
                // Obtener el último presupuesto activo de cada tipo
                const presupuestos = await pool.query(`
                    SELECT id, idtipopresupuesto, fecha
                    FROM presupuesto 
                    WHERE idusuario = $1 AND estado = 1
                    ORDER BY fecha DESC
                `, [user.idusuario]);

                const presupuestosPorTipo = {
                    personal: presupuestos.rows.find(p => p.idtipopresupuesto === '1') || null,
                    familiar: presupuestos.rows.find(p => p.idtipopresupuesto === '2') || null,
                    empresarial: presupuestos.rows.find(p => p.idtipopresupuesto === '3') || null
                };

                // Generar el token JWT
                const token = jwt.sign(
                    { idusuario: user.idusuario, correo: user.correo },
                    claveSecreta, // Usar la clave secreta importada
                    { expiresIn: '1h' }
                );

                // Enviar el token y los datos del usuario al cliente
                res.status(200).json({
                    message: "Inicio de sesión exitoso",
                    token,
                    user: {
                        id: user.id,
                        nombre: user.nombre,
                        correo: user.correo,
                        documento: user.documento,
                        tipodocumento: user.tipodocumento,
                        presupuestos: presupuestosPorTipo
                    },
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
