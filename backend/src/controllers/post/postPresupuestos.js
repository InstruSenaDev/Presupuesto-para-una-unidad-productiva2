const { Pool } = require("pg");
const { CONFIG_BD } = require("../../config/db");

const pool = new Pool(CONFIG_BD);

// Crear un presupuesto
const crearPresupuesto = async (req, res) => {
    const { idtipopresupuesto, presupuesto, saldo, estado, fecha } = req.body;

    try {
        const { idusuario } = req.params;

        const resultPresupuesto = await pool.query(
            "INSERT INTO presupuesto (idusuario, idtipopresupuesto, presupuesto, saldo, estado, fecha) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
            [idusuario, idtipopresupuesto, presupuesto, saldo, "1", fecha]
        );

        res.status(201).json(resultPresupuesto.rows[0]);
    } catch (error) {
        console.error("Error al registrar presupuesto: ", error);
        res.status(500).json({ message: "Error al registrar presupuesto", error });
    }
};

// Crear un movimiento
const crearMovimiento = async (req, res) => {
    const { descripcion, valor, estados, idtipomovimiento, fecha } = req.body;

    try {
        const { idusuario, idpresupuesto } = req.params;

        const resultMovimiento = await pool.query(
            "INSERT INTO movimientos (descripcion, valor, estados, idpresupuesto, idtipomovimiento, fecha) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
            [descripcion, valor, "1", idpresupuesto, idtipomovimiento, fecha]
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

        const resultPresupuestos = await pool.query(
            "SELECT * FROM presupuesto WHERE idusuario = $1",
            [idusuario]
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
