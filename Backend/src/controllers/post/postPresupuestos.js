const { Pool } = require('pg');
const { CONFIG_BD } = require('../../config/db');

const pool = new Pool(CONFIG_BD);

// Crear presupuesto
const crearPresupuesto = async (req, res) => {

    const { idtipopresupuesto, presupuesto, saldo, fechaPresupuesto, estadoPresupuesto, descripcion, valor, idtipomovimiento, fechaMovimiento, estadoMovimiento } = req.body;
    
    const { idusuario } = req.params;

    try {
        const result = await pool.query(
            'INSERT INTO presupuesto (idusuario, idtipopresupuesto, presupuesto, saldo, estado, fecha) VALUES ($1, $2, $3, $4,$5,$6) RETURNING *',
            [Number(idusuario), idtipopresupuesto, Number(presupuesto), Number(saldo), "1", fecha]
        );
        res.status(201).json(result.rows[0]);
        console.log(result);
        
    } catch (error) {
        console.error('Error al crear presupuesto:', error);
        res.status(500).json({ message: 'Error interno al procesar la solicitud', error });
    }
};

// Crear movimiento
const crearMovimiento = async (req, res) => {
    const { descripcion, valor } = req.body;
    const { idusuario, idpresupuesto } = req.params;

    try {
        // Obtener el tipo de movimiento (ingreso o egreso) de algún parámetro o lógica
        // Aquí se asume que el tipo de movimiento se envía en el cuerpo de la solicitud
        const { idtipomovimiento } = req.body;

        // Obtener el presupuesto actual
        const presupuestoResult = await pool.query(
            'SELECT saldo FROM presupuesto WHERE id = $1',
            [idpresupuesto]
        );
        if (presupuestoResult.rows.length === 0) {
            return res.status(404).json({ message: 'Presupuesto no encontrado' });
        }

        const saldoActual = presupuestoResult.rows[0].saldo;

        // Calcular el nuevo saldo
        const nuevoSaldo = idtipomovimiento === 1 ? saldoActual + Number(valor) : saldoActual - Number(valor);

        // Insertar el movimiento
        await pool.query(
            'INSERT INTO movimientos (descripcion, valor, estado, idpresupuesto, idtipomovimiento, fecha) VALUES ($1, $2, true, $3, $4, NOW())',
            [descripcion, Number(valor), idpresupuesto, idtipomovimiento]
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
