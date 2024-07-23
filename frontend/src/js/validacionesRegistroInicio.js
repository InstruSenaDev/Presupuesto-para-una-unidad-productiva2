//validacion registro
document.addEventListener('DOMContentLoaded', function() {
    const formu = document.getElementById('formu');
    const nombre = document.getElementById('registroNombre');
    const correoRegistro = document.getElementById('CorreoRegistro');
    const contrasenaRegistro = document.getElementById('ContraseñaRegistro');
    const numeroDc = document.getElementById('numeroDc');
    const nombreError = document.getElementById('nombreError');
    const correoError = document.getElementById('correoError');
    const contrasenaError = document.getElementById('contrasenaError');
    const numeroDcError = document.getElementById('numeroDcError');
    const togglePassword = document.getElementById('togglePassword');

    // Resetear el formulario
    formu.reset();

    // Toggle password visibility
    togglePassword.addEventListener('click', function() {
      const type = contrasenaRegistro.getAttribute('type') === 'password' ? 'text' : 'password';
      contrasenaRegistro.setAttribute('type', type);
      this.classList.toggle('bx-show');
      this.classList.toggle('bx-hide');
    });

    formu.addEventListener('submit', function(event) {
      let valid = true;
      nombreError.textContent = '';
      correoError.textContent = '';
      contrasenaError.textContent = '';
      numeroDcError.textContent = '';

      // Validación del nombre
      const nombreValue = nombre.value;
      if (!nombreValue || !/^[A-Za-z\s]+$/.test(nombreValue)) {
        valid = false;
        nombreError.textContent = 'Ingrese un nombre válido.';
      }

      // Validación del correo electrónico
      const correoValue = correoRegistro.value;
      if (!correoValue || !/\S+@\S+\.\S+/.test(correoValue)) {
        valid = false;
        correoError.textContent = 'Ingrese un correo electrónico válido.';
      }

      // Validación de la contraseña
      const contrasenaValue = contrasenaRegistro.value;
      if (!contrasenaValue || contrasenaValue.length < 8) {
        valid = false;
        contrasenaError.textContent = 'La contraseña debe tener al menos 8 caracteres.';
      }

      // Validación del número de documento
      const numeroDcValue = numeroDc.value;
      if (!numeroDcValue || isNaN(parseInt(numeroDcValue))) {
        valid = false;
        numeroDcError.textContent = 'Ingrese un número de documento válido.';
      }

      if (!valid) {
        event.preventDefault();
      }
    });
  });

  window.addEventListener('pageshow', function(event) {
    const formu = document.getElementById('formu');
    if (event.persisted) {
      formu.reset();
    }
  });

///validacion inicio
  


  document.addEventListener('DOMContentLoaded', function() {
    const formuInicio = document.getElementById('formuInicio');
    const inicioCorreo = document.getElementById('inicioCorreo');
    const contraseñaInicio = document.getElementById('contraseñaInicio');
    const correoError = document.getElementById('correoError');
    const contrasenaError = document.getElementById('contrasenaError');
    const togglePassword = document.getElementById('togglePassword');
  
    // Resetear el formulario
    formuInicio.reset();
  
    // Toggle password visibility
    togglePassword.addEventListener('click', function() {
      const type = contraseñaInicio.getAttribute('type') === 'password' ? 'text' : 'password';
      contraseñaInicio.setAttribute('type', type);
      this.classList.toggle('bx-show');
      this.classList.toggle('bx-hide');
    });
  
    formuInicio.addEventListener('submit', function(event) {
      let valid = true;
      correoError.textContent = '';
      contrasenaError.textContent = '';
  
      // Validación del correo electrónico
      const correoValue = inicioCorreo.value;
      if (!correoValue || !/\S+@\S+\.\S+/.test(correoValue)) {
        valid = false;
        correoError.textContent = 'Ingrese un correo electrónico válido.';
      }
  
      // Validación de la contraseña
      const contrasenaValue = contraseñaInicio.value;
      if (!contrasenaValue || contrasenaValue.length < 8) {
        valid = false;
        contrasenaError.textContent = 'La contraseña debe tener al menos 8 caracteres.';
      }
  
      if (!valid) {
        event.preventDefault();
      }
    });
  });
  
  window.addEventListener('pageshow', function(event) {
    const formuInicio = document.getElementById('formuInicio');
    if (event.persisted) {
      formuInicio.reset();
    }
  });
  
