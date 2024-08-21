const {Pool} = require('pg')
const {CONFIG_BD} = require('../../config/db')

const pool = new Pool(CONFIG_BD)

const apiProductos = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM producto")
        if (result.rows.length > 0) {
            return res.status(200).json(result.rows)
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    apiProductos
}