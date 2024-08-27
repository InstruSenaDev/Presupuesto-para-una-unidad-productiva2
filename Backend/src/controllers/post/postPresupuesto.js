const { Pool } = require("pg");
const { CONFIG_BD } = require("../../config/db");

const pool = new Pool(CONFIG_BD);

const Presupuesto = async (req, res) => {
const { id, idUsuario, idPresupuesto, prosupuesto, saldo, estado, fecha } = req.body;
console.log(id);

try {
    const resultPresupuesto = await pool.query(
    "INSERT INTO presupuesto (id, idUsuario,idPresupuesto, prosupuesto, saldo, estado, fecha) VALUES ($1, $2, $3, $4, $5, $6, 7$) RETURNING * ",
    [id, idUsuario, idPresupuesto, prosupuesto, saldo, estado, fecha, "1"]
    );
    res.status(201).json(resultPresupuesto.rows[0]);
} catch (error) {
    console.log("Error al registrar presupuesto: ", error);
    res
    .status(500)
    .json({ message: "Error interno al procesar la solicitud: ", error });
    console.log(res.status)
}
};

module.exports = {
Presupuesto
};
