const { Pool } = require("pg");
const { CONFIG_BD } = require("../../config/db");

const pool = new Pool(CONFIG_BD);

// Crear un presupuesto
const crearPresupuesto = async (req, res) => {
    const { idtipopresupuesto, presupuesto, saldo, estado, fecha } = req.body;

    // Validar los datos
    if (isNaN(parseFloat(presupuesto)) || isNaN(parseFloat(saldo))) {
        return res.status(400).json({ message: "El presupuesto o saldo no es válido" });
    }

    try {
        const { idusuario } = req.params;

        // Asegurarse de que idusuario y otros valores sean números válidos
        const idusuarioParsed = parseInt(idusuario, 10);
        const presupuestoParsed = parseFloat(presupuesto);
        const saldoParsed = parseFloat(saldo);

        if (isNaN(idusuarioParsed)) {
            return res.status(400).json({ message: "ID de usuario no válido" });
        }

        const resultPresupuesto = await pool.query(
            "INSERT INTO presupuesto (idusuario, idtipopresupuesto, presupuesto, saldo, estado, fecha) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
            [idusuarioParsed, idtipopresupuesto, presupuestoParsed, saldoParsed, estado, fecha]
        );

        res.status(201).json(resultPresupuesto.rows[0]);
    } catch (error) {
        console.error("Error al registrar presupuesto: ", error);
        res.status(500).json({ message: "Error al registrar presupuesto", error });
    }
};

// Crear un movimiento
const crearMovimiento = async (req, res) => {
    const { descripcion, valor, estado, idtipomovimiento, fecha } = req.body;

    // Validar los datos
    if (isNaN(parseFloat(valor))) {
        return res.status(400).json({ message: "El valor del movimiento no es válido" });
    }

    try {
        const { idusuario, idpresupuesto } = req.params;

        // Asegurarse de que idusuario y otros valores sean números válidos
        const idusuarioParsed = parseInt(idusuario, 10);
        const idpresupuestoParsed = parseInt(idpresupuesto, 10);
        const valorParsed = parseFloat(valor);

        if (isNaN(idusuarioParsed) || isNaN(idpresupuestoParsed)) {
            return res.status(400).json({ message: "ID de usuario o presupuesto no válidos" });
        }

        const resultMovimiento = await pool.query(
            "INSERT INTO movimientos (descripcion, valor, estado, idpresupuesto, idtipomovimiento, fecha) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
            [descripcion, valorParsed, estado, idpresupuestoParsed, idtipomovimiento, fecha]
        );

        res.status(201).json(resultMovimiento.rows[0]);
    } catch (error) {
        console.error("Error al registrar movimiento: ", error);
        res.status(500).json({ message: "Error al registrar movimiento", error });
    }
};

// Obtener los presupuestos por usuario
const obtenerPresupuestos = async (req, res) => {
    try {
        const { idusuario } = req.params;

        // Asegurarse de que idusuario sea un número válido
        const idusuarioParsed = parseInt(idusuario, 10);

        if (isNaN(idusuarioParsed)) {
            return res.status(400).json({ message: "ID de usuario no válido" });
        }

        const resultPresupuestos = await pool.query(
            "SELECT * FROM presupuesto WHERE idusuario = $1",
            [idusuarioParsed]
        );

        res.status(200).json(resultPresupuestos.rows);
    } catch (error) {
        console.error("Error al obtener presupuestos: ", error);
        res.status(500).json({ message: "Error al obtener presupuestos", error });
    }
};

module.exports = {
    crearPresupuesto,
    crearMovimiento,
    obtenerPresupuestos,
};
