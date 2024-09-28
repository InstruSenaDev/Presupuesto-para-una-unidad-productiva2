const { Pool } = require('pg');
const { CONFIG_BD } = require('../../config/db');

const pool = new Pool(CONFIG_BD);

// Función para generar un número de factura aleatorio
const generarNumeroFactura = () => {
    return Math.floor(Math.random() * 900000) + 100000; // Genera un número de 6 dígitos
};

// Procesar pagos empresariales (postPago) con fecha del presupuesto empresarial
const postPago = async (req, res) => {
    const { idusuario, seleccionados, total } = req.body;
    const impuesto = 0;
    const descuento = 0;
    const estado = '1'; 
    const numerofactura = generarNumeroFactura();

    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        // Obtener la fecha del presupuesto empresarial activo
        const presupuestoEmpresarial = await client.query(
            'SELECT fecha FROM presupuesto WHERE idusuario = $1 AND idtipopresupuesto = $2 AND estado = $3',
            [idusuario, 3, '1']
        );

        if (presupuestoEmpresarial.rows.length === 0) {
            return res.status(404).json({ message: 'No hay presupuestos empresariales activos' });
        }

        const fechaPresupuesto = presupuestoEmpresarial.rows[0].fecha;

        // Insertar en la tabla maestro
        const queryMaestro = `
            INSERT INTO maestro (idusuarios, numerofactura, impuesto, descuento, total, fecha, estado)
            VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id;
        `;
        const resultMaestro = await client.query(queryMaestro, [
            idusuario,
            numerofactura,
            impuesto,
            descuento,
            total,
            fechaPresupuesto,
            estado,
        ]);

        const idMaestro = resultMaestro.rows[0].id;

        // Insertar en la tabla detalle para cada producto seleccionado
        const queryDetalle = `
            INSERT INTO detalle (idmaestro, idproducto, cantidad, valorunitario, impuesto, fecha, total)
            VALUES ($1, $2, $3, $4, $5, $6, $7);
        `;
        for (const producto of seleccionados) {
            const { id, cantidad, valorunitario } = producto;
            const totalProducto = cantidad * valorunitario;

            await client.query(queryDetalle, [
                idMaestro,
                id,
                cantidad,
                valorunitario,
                impuesto,
                fechaPresupuesto,
                totalProducto,
            ]);
        }

        await client.query('COMMIT');
        res.status(200).json({
            message: 'Pago realizado con éxito',
            numerofactura,
            idMaestro,
        });
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Error al realizar el pago:', error);
        res.status(500).json({ message: 'Error al procesar el pago' });
    } finally {
        client.release();
    }
};

module.exports = {
    postPago,
};
