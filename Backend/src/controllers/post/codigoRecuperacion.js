const { Resend } = require('resend');
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const { Pool } = require("pg");
const { CONFIG_BD } = require("../../config/db");

const pool = new Pool(CONFIG_BD);

// Inicializar Resend con tu API key
const resend = new Resend(process.env.RESEND_API_KEY);

const enviarCodigoRecuperacion = async (req, res) => {
    const { correo } = req.body;
    
    try {
        const result = await pool.query('SELECT * FROM usuarios WHERE correo = $1', [correo]);
        
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Correo no registrado" });
        }

        const usuario = result.rows[0];
        const codigoRecuperacion = crypto.randomInt(100000, 999999).toString();
        const expiracion = new Date(Date.now() + 3600000); // 1 hora de validez

        await pool.query('UPDATE usuarios SET codigo_recuperacion = $1, codigo_expiracion = $2 WHERE id = $3', 
            [codigoRecuperacion, expiracion, usuario.id]);

        // Enviar correo usando Resend
        await resend.emails.send({
            from: 'noreply@tudominio.com',
            to: correo,
            subject: 'Recuperación de contraseña',
            html: `<p>Tu código de recuperación es: <strong>${codigoRecuperacion}</strong></p>
                   <p>Este código expirará en 1 hora.</p>`
        });

        res.status(200).json({ message: 'Correo enviado con el código de recuperación' });
    } catch (error) {
        console.error('Error al enviar el correo:', error);
        res.status(500).json({ message: 'Error al enviar el correo de recuperación' });
    }
};

const validarCodigoYRestablecer = async (req, res) => {
    const { correo, codigo, nuevaContrasena } = req.body;

    try {
        const result = await pool.query('SELECT * FROM usuarios WHERE correo = $1 AND codigo_recuperacion = $2 AND codigo_expiracion > NOW()', [correo, codigo]);

        if (result.rows.length === 0) {
            return res.status(400).json({ message: 'Código incorrecto o expirado' });
        }

        // Validar complejidad de la contraseña
        if (nuevaContrasena.length < 8) {
            return res.status(400).json({ message: 'La contraseña debe tener al menos 8 caracteres' });
        }

        const hashedPassword = await bcrypt.hash(nuevaContrasena, 10);

        await pool.query('UPDATE usuarios SET contrasena = $1, codigo_recuperacion = NULL, codigo_expiracion = NULL WHERE correo = $2', [hashedPassword, correo]);

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