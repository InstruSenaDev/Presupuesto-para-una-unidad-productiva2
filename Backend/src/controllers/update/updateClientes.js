const express = require("express");
const router = express.Router();
const { Pool } = require("pg");
const { CONFIG_BD } = require("../../config/db");

const pool = new Pool(CONFIG_BD);

// Endpoint para eliminar usuario por ID
router.delete('/user/delete/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      // Cambiar el estado del usuario a 2 (inactivo)
      const result = await pool.query(
        'UPDATE usuarios SET estadox = $1 WHERE id = $2 RETURNING *',
        [2, id]
      );
  
      if (result.rowCount === 0) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
  
      // Devuelve un mensaje de éxito y el usuario actualizado
      res.status(200).json({ message: 'Usuario desactivado exitosamente', usuario: result.rows[0] });
    } catch (error) {
      console.error('Error al desactivar usuario:', error);
      res.status(500).json({ message: 'Error al desactivar el usuario', error });
    }
  });

const eliminarCompras = async (req, res) => {
    const { codigofacturas } = req.body;
  
    if (!codigofacturas) {
      return res.status(400).json({ error: "Código de factura es requerido" });
    }
  
    try {
      const result = await pool.query(
        "UPDATE comprasdet SET estado = $1 WHERE codigofactura = $2 RETURNING *",
        ["inactivo", codigofacturas]
      );
  
      if (result.rowCount === 0) {
        return res.status(404).json({ error: "Compra no encontrada" });
      }
  
      res.status(200).json({ message: "Compra eliminada exitosamente" });
    } catch (error) {
      console.error("Error al eliminar compra:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  };
module.exports = router;
