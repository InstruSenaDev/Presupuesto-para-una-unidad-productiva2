const nodemailer = require("nodemailer");

const emailHelper = async (to, subject, text) => {
  // Configuración del transportador usando nodemailer
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "marcosdavidarroyoescobar@gmail.com", // Tu dirección de correo
      pass: "bcpl bcsb eccv vkeu", // Debería ser una Contraseña de Aplicación, no tu contraseña normal
     
    },
  });

  // Opciones del correo
  const mailOptions = {
    from: "marcosdavidarroyoescobar@gmail.com",
    to:"pupsena2024@gmail.com",
    subject: "Cambiar Contraseña (Pup) Presupuesto para una unidad productiva",
    text: "ingresa a este link para cambiar la contraseña:",
    
  };

  try {
    let info = await transporter.sendMail(mailOptions);
    console.log("Correo enviado: " + info.response);
    return info;
  } catch (error) {
    console.error("Error al enviar el correo:", error);
    throw error;
  }
};

module.exports = emailHelper;
