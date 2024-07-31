const { supabase } = require("../../config/db");

const registerUser = async (req, res) => {
  const { nombre, correo, contrasena, identificacion, numeroDc } = req.body;

  try {
    const { data, error } = await supabase
     .from("usuarios")
     .insert({
        nombre,
        correo,
        contraseña: contrasena,
        tipoDocumento: identificacion,
        documento: numeroDc,
      });

    if (error) {
      console.log("Error al registrar usuario:", error);
      res.status(500).json({ message: "Error interno al procesar la solicitud" });
    } else {
      res.status(201).json({ message: "Usuario registrado con éxito" });
    }
  } catch (error) {
    console.log("Error al registrar usuario:", error);
    res.status(500).json({ message: "Error interno al procesar la solicitud" });
  }
};

module.exports = registerUser;