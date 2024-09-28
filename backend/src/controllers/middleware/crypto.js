const crypto = require('crypto');

// Función para generar la clave secreta
const generarClaveSecreta = () => {
    return crypto.randomBytes(32).toString('hex');
};

// Generar la clave secreta al iniciar la aplicación
const claveSecreta = generarClaveSecreta();
console.log('Clave secreta generada:', claveSecreta);


module.exports = { claveSecreta };
