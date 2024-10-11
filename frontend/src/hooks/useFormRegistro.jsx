import { useState, useEffect } from 'react';

export const useValidaciones = () => {
    const [errores, setErrores] = useState({
        errorNombre: "",
        errorCorreo: "",
        errorContrasena: "",
        errorDocumento: "",
    });

    useEffect(() => {
        const formulario = document.getElementById("formu");
        const nombre = document.getElementById("registroNombre");
        const correo = document.getElementById("CorreoRegistro");
        const contrasena = document.getElementById("ContraseñaRegistro");
        const documento = document.getElementById("documento");

        if (formulario) formulario.reset();

        const togglePassword = document.getElementById("togglePassword");
        if (togglePassword && contrasena) {
            togglePassword.addEventListener("click", function () {
                const tipo =
                    contrasena.getAttribute("type") === "password" ? "text" : "password";
                contrasena.setAttribute("type", tipo);
                this.classList.toggle("bx-show");
                this.classList.toggle("bx-hide");
            });
        }

        const validarFormulario = (evento) => {
            let valido = true;

            setErrores({
                errorNombre: "",
                errorCorreo: "",
                errorContrasena: "",
                errorDocumento: "",
            });

            if (nombre) {
                // Validar que el nombre sea valido
                const valorNombre = nombre.value;
                if (!valorNombre || !/^[A-Za-z\s]+$/.test(valorNombre)) {
                    valido = false;
                    setErrores((prev) => ({ ...prev, errorNombre: "Ingrese un nombre válido." }));
                }
            }

            if (correo) {
                // Validar que se ingrese un correo valido
                const valorCorreo = correo.value;
                if (!valorCorreo || !/\S+@\S+\.\S+/.test(valorCorreo)) {
                    valido = false;
                    setErrores((prev) => ({
                        ...prev,
                        errorCorreo: "Ingrese un correo electrónico válido.",
                    }));
                }
            }

            if (contrasena) {
                // Validar que la contraseña tenga 8 caracteres
                const valorContrasena = contrasena.value;
                if (!valorContrasena || valorContrasena.length < 8) {
                    valido = false;
                    setErrores((prev) => ({
                        ...prev,
                        errorContrasena: "La contraseña debe tener al menos 8 caracteres.",
                    }));
                }
            }

            if (documento) {
                const valorDocumento = documento.value.trim();
                // Validar que el documento sea exactamente 10 números sin espacios
                if (!/^\d{10}$/.test(valorDocumento)) {
                    valido = false;
                    setErrores((prev) => ({
                        ...prev,
                        errorDocumento: "El documento debe tener exactamente 10 números sin espacios.",
                    }));
                }
            }

            if (!valido) {
                evento.preventDefault(); // Evitar el envío si no es válido
            }
        };

        if (formulario) formulario.addEventListener("submit", validarFormulario);

        return () => {
            if (formulario) {
                formulario.removeEventListener("submit", validarFormulario);
            }
        };
    }, []);

    return { errores };
};
