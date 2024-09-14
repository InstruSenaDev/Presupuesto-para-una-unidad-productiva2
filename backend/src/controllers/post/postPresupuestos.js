const { Pool } = require('pg');
const { CONFIG_BD } = require('../../config/db');

const pool = new Pool(CONFIG_BD);

// Crear presupuesto
const crearPresupuesto = async (req, res) => {
    const { idtipopresupuesto, presupuesto, saldo, fecha } = req.body;
    const { idusuario } = req.params;

    try {
        // Iniciar transacción
        const client = await pool.connect();
        await client.query('BEGIN');

        // Actualizar presupuestos anteriores a inactivos
        await client.query(
            'UPDATE presupuesto SET estado = $1 WHERE idusuario = $2 AND idtipopresupuesto = $3',
            ['2', idusuario, idtipopresupuesto]
        );

        // Crear el nuevo presupuesto
        const result = await client.query(
            'INSERT INTO presupuesto (idusuario, idtipopresupuesto, presupuesto, saldo, estado, fecha) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
            [Number(idusuario), idtipopresupuesto, Number(presupuesto), Number(saldo), '1', fecha]
        );

        const nuevoPresupuestoId = result.rows[0].id;

        // Actualizar los movimientos del presupuesto anterior a inactivos
        await client.query(
            'UPDATE movimientos SET estados = $1 WHERE idpresupuesto IN (SELECT id FROM presupuesto WHERE idusuario = $2 AND idtipopresupuesto = $3 AND estados = $4)',
            ['2', idusuario, idtipopresupuesto, '2']
        );

        await client.query('COMMIT');
        res.status(201).json({ message: 'Presupuesto creado con éxito', nuevoPresupuestoId });
    } catch (error) {
        console.error('Error al crear presupuesto:', error);
        res.status(500).json({ message: 'Error interno al procesar la solicitud', error });
    }
};

// Crear movimiento
const crearMovimiento = async (req, res) => {
    const { descripcion, valor, idtipomovimiento } = req.body;
    const { idusuario, idpresupuesto } = req.params;

    try {
        // Obtener el saldo actual del presupuesto
        const presupuestoResult = await pool.query(
            'SELECT saldo FROM presupuesto WHERE id = $1',
            [idpresupuesto]
        );

        if (presupuestoResult.rows.length === 0) {
            return res.status(404).json({ message: 'Presupuesto no encontrado' });
        }

        const saldoActual = presupuestoResult.rows[0].saldo;
        const nuevoSaldo = idtipomovimiento === 1 ? saldoActual + Number(valor) : saldoActual - Number(valor);

        // Insertar el movimiento
        await pool.query(
            'INSERT INTO movimientos (descripcion, valor, estados, idpresupuesto, idtipomovimiento, fecha) VALUES ($1, $2, $3, $4, $5, NOW())',
            [descripcion, Number(valor), '1', idpresupuesto, idtipomovimiento]
        );

        // Actualizar el saldo del presupuesto
        await pool.query(
            'UPDATE presupuesto SET saldo = $1 WHERE id = $2',
            [nuevoSaldo, idpresupuesto]
        );

        res.status(201).json({ message: 'Movimiento creado con éxito' });
    } catch (error) {
        console.error('Error al crear movimiento:', error);
        res.status(500).json({ message: 'Error interno al procesar la solicitud', error });
    }
};

// Obtener presupuestos
const obtenerPresupuestos = async (req, res) => {
    const { idusuario } = req.params;

    try {
        const result = await pool.query(
            'SELECT id, idtipopresupuesto, presupuesto, saldo, fecha FROM presupuesto WHERE idusuario = $1 AND estado = 1',
            [idusuario]
        );
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error al obtener presupuestos:', error);
        res.status(500).json({ message: 'Error interno al procesar la solicitud', error });
    }
};

module.exports = {
    crearPresupuesto,
    crearMovimiento,
    obtenerPresupuestos
};
