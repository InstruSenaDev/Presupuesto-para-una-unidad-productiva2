document.getElementById("formuInicio").addEventListener("submit", async (e) => {
  e.preventDefault(); // Evita que el formulario se envíe por defecto

  // Obtener los valores del formulario
  const correo = document.getElementById("inicioCorreo").value;
  const contrasena = document.getElementById("contraseñaInicio").value;

  // const modal = document.getElementById("modalInicio");
  // const abrirModal = document.getElementById("abrirModal");
  // // const cerrarModal = document.getElementById("cerrarModal")[0];
  // const aceptarBtn = document.getElementById("aceptarBtn");


  //   abrirModal.onclick = function () {
  //     modal.classList.remove("hidden");
  //   }

  //   cerrarModal.onclick = function () {
  //     modal.classList.add("hidden");
  //   }

  //   window.onclick = function (event) {
  //     if (event.target == modal) {
  //       modal.classList.add("hidden")
  //     }
  //   }

  // Crear un objeto con los datos del formulario
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

      // Almacenar el nombre en localStorage
      localStorage.setItem("nombre", data.user.nombre);
      localStorage.setItem("id", data.user.id);

      // Redirigir al usuario a la página de inicio o dashboard
      window.location.href = "/home";
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