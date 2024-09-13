const { Pool } = require('pg');
const { CONFIG_BD } = require('../../config/db');

const pool = new Pool(CONFIG_BD);

// Crear presupuesto
const crearPresupuesto = async (req, res) => {
    const { idtipopresupuesto, presupuesto, saldo, fecha } = req.body;
    const { idusuario } = req.params;

    try {
        const result = await pool.query(
            'INSERT INTO presupuesto (idusuario, idtipopresupuesto, presupuesto, saldo, estado, fecha) VALUES ($1, $2, $3, $4,$5,$6) RETURNING *',
            [Number(idusuario), idtipopresupuesto, Number(presupuesto), Number(saldo), "1", fecha]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error al crear presupuesto:', error);
        res.status(500).json({ message: 'Error interno al procesar la solicitud', error });
    }
};
module.exports = {
    crearPresupuesto,
   
};
