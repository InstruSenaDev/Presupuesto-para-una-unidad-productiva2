    document.addEventListener("DOMContentLoaded", function () {
    const formuInicio = document.getElementById("formuInicio");
    const inicioCorreo = document.getElementById("inicioCorreo");
    const contraseñaInicio = document.getElementById("contraseñaInicio");
    const correoError = document.getElementById("correoError");
    const contrasenaError = document.getElementById("contrasenaError");
    const togglePassword = document.getElementById("togglePassword");

    if (formuInicio) formuInicio.reset();

    if (togglePassword && contraseñaInicio) {
        togglePassword.addEventListener("click", function () {
        const type =
            contraseñaInicio.getAttribute("type") === "password"
            ? "text"
            : "password";
        contraseñaInicio.setAttribute("type", type);
        this.classList.toggle("bx-show");
        this.classList.toggle("bx-hide");
        });
    }

    if (formuInicio) {
        formuInicio.addEventListener("submit", function (event) {
        let valid = true;
        if (correoError) correoError.textContent = "";
        if (contrasenaError) contrasenaError.textContent = "";

        // Validación del correo electrónico
        if (inicioCorreo) {
            const correoValue = inicioCorreo.value;
            if (!correoValue || !/\S+@\S+\.\S+/.test(correoValue)) {
            valid = false;
            if (correoError)
                correoError.textContent = "Ingrese un correo electrónico válido.";
            }
        }

        // Validación de la contraseña
        if (contraseñaInicio) {
            const contrasenaValue = contraseñaInicio.value;
            if (!contrasenaValue || contrasenaValue.length < 8) {
            valid = false;
            if (contrasenaError)
                contrasenaError.textContent =
                "La contraseña debe tener al menos 8 caracteres.";
            }
        }

        if (!valid) {
            event.preventDefault();
        }
        });
    }
    });

    window.addEventListener("pageshow", function (event) {
    const formuInicio = document.getElementById("formuInicio");
    if (event.persisted && formuInicio) {
        formuInicio.reset();
    }
    });
