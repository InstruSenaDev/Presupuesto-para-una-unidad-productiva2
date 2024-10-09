const express = require("express");
const router = express.Router();
const { Pool } = require("pg");
const { CONFIG_BD } = require("../../config/db");

const pool = new Pool(CONFIG_BD);

const desactivarUsuario = async () => {
  try {
    const response = await fetch(`http://localhost:3000/user/deactivate/${usuarioADesactivar.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al desactivar el usuario');
    }

    const updatedUser = await response.json();

    // Actualiza la lista de usuarios en el estado
    setUsuarios(usuarios.map(user => 
      user.id === usuarioADesactivar.id ? { ...user, estado: updatedUser.usuario.estadox } : user
    ));
    
    // Muestra un mensaje de éxito
    alert('Usuario desactivado exitosamente');
    closeModal();
  } catch (error) {
    console.error('Error al desactivar el usuario:', error);
    alert(`Error: ${error.message}`);
  }
};

module.exports = router;