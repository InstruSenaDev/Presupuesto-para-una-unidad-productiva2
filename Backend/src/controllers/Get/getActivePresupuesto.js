// controllers/Get/getActivePresupuesto.js

const { Pool } = require('pg');
const { CONFIG_BD } = require('../../config/db');

const pool = new Pool(CONFIG_BD);

// Obtener el presupuesto activo para un tipo específico
const getActivePresupuesto = async (req, res) => {
    const { idusuario, idtipopresupuesto } = req.params;
    try {
        const result = await pool.query(
            'SELECT * FROM presupuesto WHERE idusuario = $1 AND idtipopresupuesto = $2 AND estado = $3',
            [idusuario, idtipopresupuesto, '1']
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'No hay presupuesto activo para este tipo' });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error('Error al obtener presupuesto activo:', error);
        res.status(500).json({ message: 'Error interno al procesar la solicitud', error });
    }
};

module.exports = {
    getActivePresupuesto,
};
