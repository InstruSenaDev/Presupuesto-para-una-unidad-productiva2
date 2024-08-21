const {Pool} = require('pg')
const {CONFIG_BD} = require('../../config/db')

const pool = new Pool(CONFIG_BD)

const postPago = async (req, res) => {
    try {
        const { detale, maestro} = req.body;

        const movimientoMaestro = await pool.query("INSERT INTO maestro (idusuario, numerofactura, impuesto, descuento, total, estado) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id")


    } catch (error) {
        
    }
}
module.exports = {
    postPago
}