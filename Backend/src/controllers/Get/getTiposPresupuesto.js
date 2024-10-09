// controllers/Get/getTiposPresupuesto.js

const { Pool } = require('pg');
const { CONFIG_BD } = require('../../config/db');

const pool = new Pool(CONFIG_BD);

// Obtener tipos de presupuestos únicos para un usuario
const getTiposPresupuesto = async (req, res) => {
    const { idusuario } = req.params;
    try {
        // Obtener presupuestos
        const presupuestosResult = await pool.query(
            'SELECT * FROM presupuesto WHERE idusuario = $1',
            [idusuario]
        );

        // Obtener tipos de presupuestos únicos
        const tiposResult = await pool.query(
            'SELECT DISTINCT idtipopresupuesto FROM presupuesto WHERE idusuario = $1',
            [idusuario]
        );

        res.status(200).json({
            presupuestos: presupuestosResult.rows,
            tipos: tiposResult.rows,
        });
    } catch (error) {
        console.error('Error al obtener presupuestos y tipos:', error);
        res.status(500).json({ message: 'Error interno al procesar la solicitud', error });
    }
};

module.exports = {
    getTiposPresupuesto,
};
