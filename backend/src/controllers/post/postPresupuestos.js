const { Pool } = require('pg');
const { CONFIG_BD } = require('../../config/db');

const pool = new Pool(CONFIG_BD);

// Función para actualizar la fecha del presupuesto al iniciar sesión
const actualizarFechaPresupuesto = async (req, res) => {
    const { idusuario } = req.params;
    const { fecha } = req.body;

    try {
        // Obtener los presupuestos activos del usuario
        const presupuestosActivos = await pool.query(
            'SELECT id, idtipopresupuesto FROM presupuesto WHERE idusuario = $1 AND estado = $2',
            [idusuario, '1']
        );

        // Actualizar la fecha de los presupuestos activos
        await Promise.all(
            presupuestosActivos.rows.map(async (presupuesto) => {
                const result = await pool.query(
                    'UPDATE presupuesto SET fecha = $1 WHERE id = $2 RETURNING id, idtipopresupuesto',
                    [fecha, presupuesto.id]
                );

                const { id, idtipopresupuesto } = result.rows[0];

                // Actualizar la fecha en los movimientos relacionados si es presupuesto empresarial (idtipopresupuesto === 3)
                if (idtipopresupuesto === 3) {
                    await pool.query(
                        'UPDATE movimientos SET fecha = $1 WHERE idpresupuesto = $2 AND estados = $3',
                        [fecha, id, '1']
                    );
                }
            })
        );

        res.status(200).json({ message: 'Fecha del presupuesto actualizada con éxito' });
    } catch (error) {
        console.error('Error al actualizar fecha del presupuesto:', error);
        res.status(500).json({ message: 'Error interno al procesar la solicitud', error });
    }
};

// Crear movimiento asociado al presupuesto activo
const crearMovimiento = async (req, res) => {
    const { descripcion, valor, idtipomovimiento, fecha } = req.body;
    const { idusuario, idpresupuesto } = req.params;

    try {
        // Verificar si hay un presupuesto activo
        const presupuestoActivo = await pool.query(
            'SELECT saldo FROM presupuesto WHERE id = $1 AND estado = $2',
            [idpresupuesto, '1']
        );

        if (presupuestoActivo.rows.length === 0) {
            return res.status(404).json({ message: 'No hay presupuestos activos' });
        }

        const saldoActual = presupuestoActivo.rows[0].saldo;

        const nuevoSaldo = idtipomovimiento === 1 
            ? saldoActual + Number(valor) 
            : saldoActual - Number(valor);

        // Crear el movimiento
        await pool.query(
            'INSERT INTO movimientos (descripcion, valor, estados, idpresupuesto, idtipomovimiento, fecha) VALUES ($1, $2, $3, $4, $5, $6)',
            [descripcion, Number(valor), '1', idpresupuesto, idtipomovimiento, fecha]
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

module.exports = {
    actualizarFechaPresupuesto,
    crearMovimiento,
};
