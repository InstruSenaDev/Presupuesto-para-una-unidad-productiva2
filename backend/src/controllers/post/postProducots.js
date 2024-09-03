const { Pool } = require("pg");
const { CONFIG_BD } = require("../../config/db");

const pool = new Pool(CONFIG_BD);

const productos = async (req, res) => {
const { nombre, descripcion, codigo, valorunitario } = req.body;
console.log(nombre);

try {
    const resultMovimiento = await pool.query(
    "INSERT INTO producto (nombre, descripcion,codigo, valorunitario, cantidad) VALUES ($1, $2, $3, $4, $5) RETURNING * ",
    [nombre, descripcion, codigo, valorunitario, "1"]
    );
    res.status(201).json(resultMovimiento.rows[0]);
} catch (error) {
    console.log("Error al registrar producto: ", error);
    res
    .status(500)
    .json({ message: "Error interno al procesar la solicitud: ", error });
    console.log(res.status)
}
};

module.exports = {
productos
};