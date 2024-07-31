    // validación registro
    document.addEventListener("DOMContentLoaded", function () {
    const formu = document.getElementById("formu");
    const nombre = document.getElementById("registroNombre");
    const correoRegistro = document.getElementById("CorreoRegistro");
    const contrasenaRegistro = document.getElementById("ContraseñaRegistro");
    const numeroDc = document.getElementById("numeroDc");
    const nombreError = document.getElementById("nombreError");
    const correoError = document.getElementById("correoError");
    const contrasenaError = document.getElementById("contrasenaError");
    const numeroDcError = document.getElementById("numeroDcError");
    const togglePassword = document.getElementById("togglePassword");

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
        if (nombreError) nombreError.textContent = "";
        if (correoError) correoError.textContent = "";
        if (contrasenaError) contrasenaError.textContent = "";
        if (numeroDcError) numeroDcError.textContent = "";

        // Validación del nombre
        if (nombre) {
            const nombreValue = nombre.value;
            if (!nombreValue || !/^[A-Za-z\s]+$/.test(nombreValue)) {
            valid = false;
            if (nombreError)
                nombreError.textContent = "Ingrese un nombre válido.";
            }
        }

        // Validación del correo electrónico
        if (correoRegistro) {
            const correoValue = correoRegistro.value;
            if (!correoValue || !/\S+@\S+\.\S+/.test(correoValue)) {
            valid = false;
            if (correoError)
                correoError.textContent = "Ingrese un correo electrónico válido.";
            }
        }

        // Validación de la contraseña
        if (contrasenaRegistro) {
            const contrasenaValue = contrasenaRegistro.value;
            if (!contrasenaValue || contrasenaValue.length < 8) {
            valid = false;
            if (contrasenaError)
                contrasenaError.textContent =
                "La contraseña debe tener al menos 8 caracteres.";
            }
        }

        // Validación del número de documento
        if (numeroDc) {
            const numeroDcValue = numeroDc.value;
            if (!numeroDcValue || isNaN(parseInt(numeroDcValue))) {
            valid = false;
            if (numeroDcError)
                numeroDcError.textContent =
                "Ingrese un número de documento válido.";
            }
        }

        if (!valid) {
            event.preventDefault();
        }
        });
    }
    });

    window.addEventListener("pageshow", function (event) {
    const formu = document.getElementById("formu");
    if (event.persisted && formu) {
        formu.reset();
    }
    });
