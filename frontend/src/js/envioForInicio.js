document.getElementById("formuInicio").addEventListener("submit", async (e) => {
  e.preventDefault(); // Evita que el formulario se envíe por defecto

  // Obtener los valores del formulario
  const correo = document.getElementById("inicioCorreo").value;
  const contrasena = document.getElementById("contraseñaInicio").value;

  // Crear un objeto con los datos del formulario
  const userData = {
    correo,
    contrasena,
  };

  console.log(userData);

  // Enviar la solicitud a la API para iniciar sesión
  try {
    const response = await fetch("http://localhost:3000/inicio", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (response.ok) {
      console.log("Inicio de sesión exitoso");
      // Redirigir al usuario a la página de inicio o dashboard
      window.location.href = "/registro";
    } else {
      console.error("Error en el inicio de sesión");
      // Mostrar mensaje de error al usuario
      document.getElementById("correoError").textContent =
        "Correo o contraseña incorrectos.";
    }
  } catch (error) {
    console.error("Error al enviar la solicitud:", error);
  }
});
