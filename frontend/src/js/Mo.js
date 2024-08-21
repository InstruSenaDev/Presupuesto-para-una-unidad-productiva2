// Enviar correo electrónico con el token de restablecimiento de contraseña
const sendResetPasswordEmail = async (email) => {
  const token = cryptoRandomString({ length: 32 });
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // or 'STARTTLS'
    auth: {
      user: 'pupsena2024@gmail.com',
      pass: 'xkjk bxdp pkkz vmqc'
    }
  });

  const mailOptions = {
    from: 'pupsena2024@gmail.com',
    to: email,
    subject: 'Restablecer contraseña',
    text: `Hola, haz clic en el siguiente enlace para restablecer tu contraseña: http://localhost:4000/reset-password/${token}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Correo electrónico enviado');
  });
};

// Enviar correo electrónico con el token de restablecimiento de contraseña cuando el usuario solicita restablecer su contraseña
document.getElementById('reset-password-button').addEventListener('click', async () => {
  const email = document.getElementById('email').value;
  sendResetPasswordEmail(email);
});

// Verificar el token y actualizar la contraseña en el evento de envío del formulario
form.addEventListener('submit', async function(event) {
  // ...
  const token = document.getElementById('token').value;
  const newPassword = document.getElementById('new-password').value;
  const confirmPassword = document.getElementById('confirm-password').value;

  // Verificar el token
  if (token) {
    try {
      const response = await fetch('http://localhost:4000/api/update-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token, newPassword, confirmPassword })
      });

      const result = await response.json();

      if (response.ok) {
        messageElement.textContent = 'Contraseña actualizada exitosamente.';
        messageElement.classList.remove('text-red-500');
        messageElement.classList.add('text-green-500');
      } else {
        messageElement.textContent = result.error;
        messageElement.classList.add('text-red-500');
      }
    } catch (error) {
      messageElement.textContent = 'Error al actualizar la contraseña.';
      messageElement.classList.add('text-red-500');
    }
  } else {
    messageElement.textContent = 'Token inválido.';
    messageElement.classList.add('text-red-500');
  }
});