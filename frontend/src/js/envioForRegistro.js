const form = document.getElementById("formu");
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nombre = document.getElementById("registroNombre").value;
  const correo = document.getElementById("CorreoRegistro").value;
  const contrasena = document.getElementById("ContraseñaRegistro").value;
  const tipodocumento = document.getElementById("tipodocumento").value;
  const documento = document.getElementById("documento").value;

  const userData = {
    nombre,
    correo,
    contrasena,
    tipodocumento,
    documento,
  };

  try {
    const response = await fetch("http://localhost:3000/registro", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (response.ok) {
      console.log("Registro exitoso");

      // Almacenar el token en localStorage
      localStorage.setItem('token', data.token);

      // Redirigir al inicio o a otra página
      window.location.href = '/inicioSesion';  // Redirigir al home o donde sea necesario
    } else {
      console.error("Error en el registro:", data.message);
    }
  } catch (error) {
    console.error("Error al enviar la solicitud:", error);
  }
});
