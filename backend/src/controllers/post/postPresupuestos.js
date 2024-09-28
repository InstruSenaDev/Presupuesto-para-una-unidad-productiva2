const { Pool } = require('pg');
const { CONFIG_BD } = require('../../config/db');

const pool = new Pool(CONFIG_BD);

// Crear presupuesto
const crearPresupuesto = async (req, res) => {
    const { idtipopresupuesto, presupuesto, saldo, fecha } = req.body;
    const { idusuario } = req.params;

    let client;

    try {
        client = await pool.connect();
        await client.query('BEGIN');

        // Verificar si hay presupuestos existentes para el usuario y tipo
        const presupuestoActivo = await client.query(
            'SELECT id, fecha FROM presupuesto WHERE idusuario = $1 AND idtipopresupuesto = $2 AND estado = $3',
            [idusuario, idtipopresupuesto, '1']
        );

        if (presupuestoActivo.rows.length > 0) {
            // Actualizar presupuestos anteriores a inactivos
            await client.query(
                'UPDATE presupuesto SET estado = $1 WHERE idusuario = $2 AND idtipopresupuesto = $3',
                ['2', idusuario, idtipopresupuesto]
            );
        }

        // Crear el nuevo presupuesto
        const result = await client.query(
            'INSERT INTO presupuesto (idusuario, idtipopresupuesto, presupuesto, saldo, estado, fecha) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, fecha',
            [Number(idusuario), idtipopresupuesto, Number(presupuesto), Number(saldo), '1', fecha]
        );

        const nuevoPresupuestoId = result.rows[0].id;
        const nuevaFechaPresupuesto = result.rows[0].fecha;

        // Actualizar movimientos del presupuesto anterior a inactivos
        await client.query(
            'UPDATE movimientos SET estados = $1, fecha = $2 WHERE idpresupuesto IN (SELECT id FROM presupuesto WHERE idusuario = $3 AND idtipopresupuesto = $4 AND estado = $5)',
            ['2', nuevaFechaPresupuesto, idusuario, idtipopresupuesto, '2']
        );

        // Actualizar las tablas "detalle" y "maestro" en el caso del presupuesto empresarial
        if (idtipopresupuesto === 3) {
            await client.query(
                'UPDATE detalle SET fecha = $1 WHERE idmaestro IN (SELECT id FROM maestro WHERE idusuarios = $2)',
                [nuevaFechaPresupuesto, idusuario]
            );
            await client.query(
                'UPDATE maestro SET fecha = $1 WHERE idusuarios = $2',
                [nuevaFechaPresupuesto, idusuario]
            );
        }

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
        // Verificar si hay un presupuesto activo
        const presupuestoActivo = await pool.query(
            'SELECT saldo, fecha FROM presupuesto WHERE id = $1 AND estado = $2',
            [idpresupuesto, '1']
        );

        if (presupuestoActivo.rows.length === 0) {
            return res.status(404).json({ message: 'No hay presupuestos activos' });
        }

        const saldoActual = presupuestoActivo.rows[0].saldo;
        const fechaPresupuesto = presupuestoActivo.rows[0].fecha;

        const nuevoSaldo = idtipomovimiento === 1 
            ? saldoActual + Number(valor) 
            : saldoActual - Number(valor);

        await pool.query(
            'INSERT INTO movimientos (descripcion, valor, estados, idpresupuesto, idtipomovimiento, fecha) VALUES ($1, $2, $3, $4, $5, $6)',
            [descripcion, Number(valor), '1', idpresupuesto, idtipomovimiento, fechaPresupuesto]
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

// Obtener la fecha y saldo de un presupuesto
const getPresupuestoInfo = async (req, res) => {
    const { idpresupuesto } = req.params;

    try {
        // Obtener el saldo del presupuesto
        const saldoResult = await pool.query(
            'SELECT saldo, fecha FROM presupuesto WHERE id = $1',
            [idpresupuesto]
        );

        if (saldoResult.rows.length === 0) {
            return res.status(404).json({ message: 'Presupuesto no encontrado' });
        }

        // Obtener los ingresos y egresos
        const ingresos = await pool.query(
            'SELECT SUM(valor) as total_ingresos FROM movimientos WHERE idpresupuesto = $1 AND idtipomovimiento = 1 AND estados = 1',
            [idpresupuesto]
        );

        const egresos = await pool.query(
            'SELECT SUM(valor) as total_egresos FROM movimientos WHERE idpresupuesto = $1 AND idtipomovimiento = 2 AND estados = 1',
            [idpresupuesto]
        );

        const totalIngresos = ingresos.rows[0].total_ingresos || 0;
        const totalEgresos = egresos.rows[0].total_egresos || 0;
        const saldoFinal = totalIngresos - totalEgresos;

        // Responder con el saldo y la fecha
        res.status(200).json({
            saldoFinal,
            fecha: saldoResult.rows[0].fecha,
            totalIngresos,
            totalEgresos,
        });
    } catch (error) {
        console.error('Error al obtener información del presupuesto:', error);
        res.status(500).json({ message: 'Error interno al procesar la solicitud', error });
    }
};

module.exports = {
    crearPresupuesto,
    crearMovimiento,
    getPresupuestoInfo,
};
