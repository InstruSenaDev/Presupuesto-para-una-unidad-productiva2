
  const form = document.getElementById('formu');

  form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Evita que el formulario se envíe por defecto

    // Obtener los valores del formulario
    const nombre = document.getElementById('registroNombre').value;
    const correo = document.getElementById('CorreoRegistro').value;
    const contrasena = document.getElementById('ContraseñaRegistro').value;
    const identificacion = document.getElementById('identificacion').value;
    const numeroDc = document.getElementById('numeroDc').value;

    // Crear un objeto con los datos del formulario
    const userData = {
      nombre,
      correo,
      contrasena,
      identificacion,
      numeroDc,
    };

    console.log(userData);
    
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
      const response = await fetch('/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (data.error) {
        console.error(data.error);
      } else {
        console.log('Usuario creado con éxito!');
        // Redirigir al usuario a la página de inicio de sesión
        window.location.href = '/login';
      }
    } catch (error) {
      console.error(error);
    }
  });
