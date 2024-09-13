const { Pool } = require('pg');
const { CONFIG_BD } = require('../../config/db');

const pool = new Pool(CONFIG_BD);

const estadosPersonal = async(req,res) =>{

}
const estadosFamiliar = async (req, res) =>{

}
const estadosEmpresarial = async (req, res) =>{

} 
module.exports= {
    estadosPersonal, estadosFamiliar, estadosEmpresarial
}