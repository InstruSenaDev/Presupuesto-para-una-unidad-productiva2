const { Pool } = require("pg");
const { CONFIG_BD } = require("../../config/db");

const pool = new Pool(CONFIG_BD);

// Crear un presupuesto
const crearPresupuesto = async (req, res) => {
    const { idtipopresupuesto, presupuesto, saldo, estado, fecha } = req.body;
    const { idusuario } = req.params;

    // Validación de parámetros
    if (!idusuario || isNaN(parseInt(idusuario))) {
        return res.status(400).json({ message: "ID de usuario inválido" });
    }
    if (!idtipopresupuesto || isNaN(parseInt(idtipopresupuesto))) {
        return res.status(400).json({ message: "ID de tipo de presupuesto inválido" });
    }
    if (isNaN(presupuesto)) {
        return res.status(400).json({ message: "Presupuesto inválido" });
    }
    if (isNaN(saldo)) {
        return res.status(400).json({ message: "Saldo inválido" });
    }
    if (isNaN(estado)) {
        return res.status(400).json({ message: "Estado inválido" });
    }
    if (!fecha) {
        return res.status(400).json({ message: "Fecha es requerida" });
    }

    try {
        const resultPresupuesto = await pool.query(
            "INSERT INTO presupuesto (idusuario, idtipopresupuesto, presupuesto, saldo, estado, fecha) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
            [parseInt(idusuario, 10), parseInt(idtipopresupuesto, 10), parseFloat(presupuesto), parseFloat(saldo), parseInt(estado, 10), fecha]
        );

        res.status(201).json(resultPresupuesto.rows[0]);
    } catch (error) {
        console.error("Error al registrar presupuesto: ", error);
        res.status(500).json({ message: "Error al registrar presupuesto", error });
    }
};

// Crear un movimiento
const crearMovimiento = async (req, res) => {
    const { descripcion, valor, idtipomovimiento, fecha } = req.body;
    const { idusuario, idpresupuesto } = req.params;

    // Validación de parámetros
    if (!idusuario || !idpresupuesto || isNaN(parseInt(idusuario)) || isNaN(parseInt(idpresupuesto))) {
        return res.status(400).json({ message: "ID de usuario o presupuesto inválido" });
    }
    if (!descripcion) {
        return res.status(400).json({ message: "Descripción es requerida" });
    }
    if (isNaN(valor)) {
        return res.status(400).json({ message: "Valor inválido" });
    }
    if (isNaN(idtipomovimiento)) {
        return res.status(400).json({ message: "ID de tipo de movimiento inválido" });
    }
    if (!fecha) {
        return res.status(400).json({ message: "Fecha es requerida" });
    }

    try {
        const resultMovimiento = await pool.query(
            "INSERT INTO movimientos (descripcion, valor, estado, idpresupuesto, idtipomovimiento, fecha) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
            [descripcion, parseFloat(valor), "1", parseInt(idpresupuesto, 10), parseInt(idtipomovimiento, 10), fecha]
        );

        res.status(201).json(resultMovimiento.rows[0]);
    } catch (error) {
        console.error("Error al registrar movimiento: ", error);
        res.status(500).json({ message: "Error al registrar movimiento", error });
    }
};

// Obtener los presupuestos por usuario
const obtenerPresupuestos = async (req, res) => {
    const { idusuario } = req.params;

    // Validación de parámetros
    if (!idusuario || isNaN(parseInt(idusuario))) {
        return res.status(400).json({ message: "ID de usuario inválido" });
    }

    try {
        const resultPresupuestos = await pool.query(
            "SELECT * FROM presupuesto WHERE idusuario = $1",
            [parseInt(idusuario, 10)]
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
