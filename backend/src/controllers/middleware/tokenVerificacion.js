// middleware/verificarToken.js
const jwt = require('jsonwebtoken');
const { claveSecreta } = require('./crypto'); 

const verificarToken = (req, res, next) => {
    const authHeader = req.header('Authorization');

    if (!authHeader) {
        return res.status(401).json({ message: 'Acceso denegado. No hay token proporcionado.' });
    }

    const token = authHeader.split(' ')[1]; // Asumiendo formato "Bearer token"

    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado. Formato de token incorrecto.' });
    }

    try {
        const decoded = jwt.verify(token, claveSecreta); // Usar la clave secreta importada
        req.user = decoded; // Almacenar la información del usuario en la solicitud
        next(); // Continuar al siguiente middleware o controlador
    } catch (error) {
        res.status(400).json({ message: 'Token inválido.' });
    }
};

module.exports = verificarToken;
