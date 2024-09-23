const { Pool } = require('pg');
const { CONFIG_BD } = require('../../config/db');

const pool = new Pool(CONFIG_BD);

// Crear presupuesto
const crearPresupuesto = async (req, res) => {
    const { idtipopresupuesto, presupuesto, saldo, fecha } = req.body;
    const { idusuario } = req.params;

    let client; // Inicializar fuera del bloque try

    try {
        client = await pool.connect();
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
            'UPDATE movimientos SET estados = $1 WHERE idpresupuesto IN (SELECT id FROM presupuesto WHERE idusuario = $2 AND idtipopresupuesto = $3 AND estado = $4)',
            ['2', idusuario, idtipopresupuesto, '2']
        );

        await client.query('COMMIT');
        res.status(201).json({ message: 'Presupuesto creado con éxito', nuevoPresupuestoId });
    } catch (error) {
        if (client) {
            await client.query('ROLLBACK');
        }
        console.error('Error al crear presupuesto:', error);
        res.status(500).json({ message: 'Error interno al procesar la solicitud', error });
    } finally {
        if (client) {
            client.release();
        }
    }
};

// Crear movimiento
const crearMovimiento = async (req, res) => {
    const { descripcion, valor, idtipomovimiento } = req.body;
    const { idusuario, idpresupuesto } = req.params;

    try {
        const presupuestoResult = await pool.query(
            'SELECT saldo FROM presupuesto WHERE id = $1',
            [idpresupuesto]
        );

        if (presupuestoResult.rows.length === 0) {
            return res.status(404).json({ message: 'Presupuesto no encontrado' });
        }

        const saldoActual = presupuestoResult.rows[0].saldo;
        const nuevoSaldo = idtipomovimiento === 1 
            ? saldoActual + Number(valor) 
            : saldoActual - Number(valor);

        await pool.query(
            'INSERT INTO movimientos (descripcion, valor, estados, idpresupuesto, idtipomovimiento, fecha) VALUES ($1, $2, $3, $4, $5, NOW())',
            [descripcion, Number(valor), '1', idpresupuesto, idtipomovimiento]
        );

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

// Actualizar el estado de movimientos anteriores
const actualizarEstadoMovimientos = async (idpresupuesto) => {
    try {
        await pool.query(
            'UPDATE movimientos SET estados = $1 WHERE idpresupuesto = $2 AND estados = $3',
            ['2', idpresupuesto, '1']
        );
    } catch (error) {
        console.error('Error al actualizar movimientos:', error);
    }
};

// Obtener informe de ingresos y egresos
const obtenerInformeMovimientos = async (req, res) => {
    const { idpresupuesto } = req.params;

    try {
        // Obtener los ingresos del presupuesto
        const ingresos = await pool.query(
            'SELECT SUM(valor) as total_ingresos FROM movimientos WHERE idpresupuesto = $1 AND idtipomovimiento = 1 AND estados = 1',
            [idpresupuesto]
        );

        // Obtener los egresos del presupuesto
        const egresos = await pool.query(
            'SELECT SUM(valor) as total_egresos FROM movimientos WHERE idpresupuesto = $1 AND idtipomovimiento = 2 AND estados = 1',
            [idpresupuesto]
        );

        // Cálculos para el informe
        const totalIngresos = ingresos.rows[0].total_ingresos || 0;
        const totalEgresos = egresos.rows[0].total_egresos || 0;
        const totalPresupuesto = totalIngresos - totalEgresos;

        // Respuesta con el informe
        res.status(200).json({
            ingresos: totalIngresos,
            egresos: totalEgresos,
            total: totalPresupuesto
        });
    } catch (error) {
        console.error('Error al generar el informe:', error);
        res.status(500).json({ message: 'Error interno al generar el informe', error });
    }
};

module.exports = {
    crearPresupuesto,
    crearMovimiento,
    actualizarEstadoMovimientos,
    obtenerInformeMovimientos
};
