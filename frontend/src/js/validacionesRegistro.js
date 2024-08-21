document.addEventListener("DOMContentLoaded", function () {
    const formu = document.getElementById("formu");
    const nombre = document.getElementById("registroNombre");
    const correoRegistro = document.getElementById("CorreoRegistro");
    const contrasenaRegistro = document.getElementById("ContraseñaRegistro");
    const numeroDc = document.getElementById("documento");
    const nombreError = document.getElementById("nombreError");
    const correoError = document.getElementById("correoError");
    const contrasenaError = document.getElementById("contrasenaError");
    const numeroDcError = document.getElementById("numeroDcError");
    const modal = document.getElementById("exitoModal");

    if (formu) formu.reset();
    
    if (togglePassword && contrasenaRegistro) {
        togglePassword.addEventListener("click", function () {
        const type =
            contrasenaRegistro.getAttribute("type") === "password"
            ? "text"
            : "password";
        contrasenaRegistro.setAttribute("type", type);
        this.classList.toggle("bx-show");
        this.classList.toggle("bx-hide");
        });
    }
    if (formu) {
        formu.addEventListener("submit", function (event) {
            let valid = true;
            

            // Limpiar mensajes de error previos
            nombreError.textContent = "";
            correoError.textContent = "";
            contrasenaError.textContent = "";
            numeroDcError.textContent = "";

            // Validación del nombre
            if (nombre) {
                const nombreValue = nombre.value;
                if (!nombreValue || !/^[A-Za-z\s]+$/.test(nombreValue)) {
                    valid = false;
                    nombreError.textContent = "Ingrese un nombre válido.";
                }
            }

            // Validación del correo electrónico
            if (correoRegistro) {
                const correoValue = correoRegistro.value;
                if (!correoValue || !/\S+@\S+\.\S+/.test(correoValue)) {
                    valid = false;
                    correoError.textContent = "Ingrese un correo electrónico válido.";
                }
            }

            // Validación de la contraseña
            if (contrasenaRegistro) {
                const contrasenaValue = contrasenaRegistro.value;
                if (!contrasenaValue || contrasenaValue.length < 8) {
                    valid = false;
                    contrasenaError.textContent =
                        "La contraseña debe tener al menos 8 caracteres.";
                }
            }

            // Validación del número de documento
            if (numeroDc) {
                const numeroDcValue = numeroDc.value.trim();
                if (!numeroDcValue || isNaN(parseInt(numeroDcValue))) {
                    valid = false;
                    numeroDcError.textContent = "Ingrese un número de documento válido.";
                }
            }

            // Mostrar modal solo si todos los campos son válidos
            if (valid) {
                event.preventDefault(); // Evitar el envío del formulario
                modal.classList.remove("hidden"); // Mostrar el modal
            } else {
                event.preventDefault(); // Evitar el envío del formulario
            }
        });
    }

    document.getElementById('aceptarBtn').addEventListener('click', function () {
        modal.classList.add("hidden");
        window.location.href = '/inicioSesion';
    });
});

window.addEventListener("pageshow", function (event) {
    const formu = document.getElementById("formu");
    if (event.persisted && formu) {
        formu.reset();
    }
});