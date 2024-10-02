const nodemailer = require("nodemailer");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Pool } = require("pg");
const { CONFIG_BD } = require("../../config/db");

const pool = new Pool(CONFIG_BD);

// Configuración de nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail, hotmail',
    auth: {
        user: 'tuemail@gmail.com', // Cambia por tu correo
        pass: 'tucontraseña' // Cambia por tu contraseña
    }
});

// Enviar código de recuperación
const enviarCodigoRecuperacion = async (req, res) => {
    const { correo } = req.body;
    
    try {
        // Verificar si el correo existe
        const result = await pool.query('SELECT * FROM usuarios WHERE correo = $1', 
            [correo]);
        
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Correo no registrado" });
        }

        const usuario = result.rows[0];

        // Generar un código de recuperación de 6 dígitos
        const codigoRecuperacion = crypto.randomInt(100000, 999999).toString();

        // Guardar el código en la base de datos temporalmente
        await pool.query('UPDATE usuarios SET codigo_recuperacion = $1 WHERE id = $2', 
            [codigoRecuperacion, usuario.id]);

        // Enviar correo con el código
        const mailOptions = {
            from: 'cespedesvillotaj@gmail.com',
            to: correo,
            subject: 'Recuperación de contraseña',
            text: `Tu código de recuperación es: ${codigoRecuperacion}`
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'Correo enviado con el código de recuperación' });
    } catch (error) {
        console.error('Error al enviar el correo:', error);
        res.status(500).json({ message: 'Error al enviar el correo de recuperación' });
    }
};

// Validar código de recuperación y permitir restablecer la contraseña
const validarCodigoYRestablecer = async (req, res) => {
    const { correo, codigo, nuevaContrasena } = req.body;

    try {
        // Verificar el código de recuperación
        const result = await pool.query('SELECT * FROM usuarios WHERE correo = $1 AND codigo_recuperacion = $2', [correo, codigo]);

        if (result.rows.length === 0) {
            return res.status(400).json({ message: 'Código incorrecto o expirado' });
        }

        const hashedPassword = await bcrypt.hash(nuevaContrasena, 10);

        // Actualizar la contraseña en la base de datos
        await pool.query('UPDATE usuarios SET contrasena = $1, codigo_recuperacion = NULL WHERE correo = $2', [hashedPassword, correo]);

        res.status(200).json({ message: 'Contraseña actualizada correctamente' });
    } catch (error) {
        console.error('Error al restablecer la contraseña:', error);
        res.status(500).json({ message: 'Error al restablecer la contraseña' });
    }
};

module.exports = {
    enviarCodigoRecuperacion,
    validarCodigoYRestablecer
};
