const {Pool} = require('pg')
const {CONFIG_BD} = require('../../config/db')

const pool = new Pool(CONFIG_BD)

const getUsuarios = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM usuario")
        if (result.rows.length > 0) {
            return res.status(200).json(result.rows)
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:'error al recuperar usuarios'})
    }
}

module.exports = {
    getUsuarios
}