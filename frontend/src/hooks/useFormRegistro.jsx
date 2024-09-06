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
        const modal = document.getElementById("exitoModal");

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
            evento.preventDefault();
            let valido = true;

            setErrores({
                errorNombre: "",
                errorCorreo: "",
                errorContrasena: "",
                errorDocumento: "",
            });

            if (nombre) {
                const valorNombre = nombre.value;
                if (!valorNombre || !/^[A-Za-z\s]+$/.test(valorNombre)) {
                    valido = false;
                    setErrores((prev) => ({ ...prev, errorNombre: "Ingrese un nombre válido." }));
                }
            }

            if (correo) {
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
                if (!valorDocumento || isNaN(parseInt(valorDocumento))) {
                    valido = false;
                    setErrores((prev) => ({
                        ...prev,
                        errorDocumento: "Ingrese un número de documento válido.",
                    }));
                }
            }

            if (valido) {
                modal.classList.remove("hidden");
            } else {
                evento.preventDefault();
            }
        };

        if (formulario) formulario.addEventListener("submit", validarFormulario);

        const botonAceptar = document.getElementById('aceptarBtn');
        if (botonAceptar) {
            botonAceptar.addEventListener('click', () => {
                modal.classList.add("hidden");
                window.location.href = '/inicioSesion';
            });
        }

        const resetOnPageShow = (evento) => {
            if (evento.persisted && formulario) {
                formulario.reset();
            }
        };

        window.addEventListener("pageshow", resetOnPageShow);

        return () => {
            window.removeEventListener("pageshow", resetOnPageShow);
        };
    }, []);

    return { errores };
};
