const {Pool} = require('pg')
const {CONFIG_BD} = require('../../config/db')

const pool = new Pool(CONFIG_BD)

const postPago = async (req, res) => {
    try {
        const { detale, maestro} = req.body;

        
    } catch (error) {
        
    }
}
module.exports = {
    postPago
}