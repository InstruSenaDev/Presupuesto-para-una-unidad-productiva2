const express = require("express");
const router = express.Router();

const getRoles = require("../../src/controllers/getRoles");

router.get("/rol", getRoles.getRoles);

router.post('/usuarios', async (req, res) => {
    const { nombre, correo, contraseña, tipoDocumento,documento, id_rol } = req.body; // Aquí recibimos id_rol del cuerpo de la solicitud
    try {
        console.log('Recibida solicitud para agregar un nuevo cliente:', req.body);
        const newUser = await datacontroler.nuevoUsuario(nombre, correo, contraseña, tipoDocumento,documento, id_rol); // Pasamos id_rol al insertar el usuario
        console.log('Cliente insertado:', newUser);
        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error al agregar cliente:', error);
        res.status(500).json({ error: 'Error al agregar cliente' });
    }
});

module.exports = router;

