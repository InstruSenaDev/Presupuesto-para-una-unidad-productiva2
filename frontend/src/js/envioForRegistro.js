const form = document.getElementById("formu");

form.addEventListener("submit", async (e) => {
  e.preventDefault(); // Evita que el formulario se envíe por defecto

  // Obtener los valores del formulario
  const nombre = document.getElementById("registroNombre").value;
  const correo = document.getElementById("CorreoRegistro").value;
  const contrasena = document.getElementById("ContraseñaRegistro").value;
  // const estado = document.getElementById("estado").value;
  const tipodocumento = document.getElementById("tipodocumento").value;
  // const idrol = document.getElementById("idrol").value;
  const documento = document.getElementById("documento").value;

  // Crear un objeto con los datos del formulario
  const userData = {
    nombre,
    correo,
    contrasena,
    // estado,
    tipodocumento,
    documento,
    // idrol,
  };

  console.log(userData);
  console.log(tipodocumento);

  
  /*
      nombre,
      correo,
      contrasena,
      estado,
      tipoDocumento,
      documento,
      idrol
    */
  // Enviar la solicitud a la API para crear un nuevo usuario

  try {
    const response = await fetch("http://localhost:3000/registro", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (response.ok) {
      console.log("Registro exitoso");
    } else {
      console.error("Error en el registro");
    }
  } catch (error) {
    console.error("Error al enviar la solicitud:", error);
  }
});
