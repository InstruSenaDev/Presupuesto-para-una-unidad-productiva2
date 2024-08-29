document.getElementById("formuInicio").addEventListener("submit", async (e) => {
  e.preventDefault(); // Evita que el formulario se envíe por defecto

  // Obtener los valores del formulario
  const correo = document.getElementById("inicioCorreo").value;
  const contrasena = document.getElementById("contraseñaInicio").value;

  const userData = {
    correo,
    contrasena
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
      const data = await response.json();

      console.log("Inicio de sesión exitoso");

      // Almacenar el nombre y otros datos en localStorage
      localStorage.setItem("nombre", data.user.nombre);
      localStorage.setItem("correo", data.user.correo);
      localStorage.setItem("tipoDc", data.user.tipodocumento);
      localStorage.setItem("numeroDc", data.user.documento);
      localStorage.setItem("id", data.user.id);

      // Verificar si el usuario es administrador
      if (data.user.role === "admin") {
        // Redirigir al panel de administración si es administrador
        window.location.href = "/admin";
      } else {
        // Redirigir a la página de inicio o dashboard para usuarios normales
        window.location.href = "/home";
      }
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
