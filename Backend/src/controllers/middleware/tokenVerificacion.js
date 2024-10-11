const verificarSesion = (req, res, next) => {
    if (!req.session.id || !req.session.claveSecreta) {
        return res.status(401).json({ message: 'Acceso denegado. No hay sesión activa.' });
    }

    // Continúa con la solicitud si la sesión es válida
    next();
};

module.exports = verificarSesion;
