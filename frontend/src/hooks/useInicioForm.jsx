import { useState } from "react";

const useLoginForm = () => {
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [codigoEnviado, setCodigoEnviado] = useState(false);

    const handleSubmit = async (correo, contrasena) => {
        setLoading(true);
        setErrors({});
        setSuccess(false);

        const userData = {
            correo,
            contrasena,
        };

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

                // Verificar y almacenar los datos en localStorage
                if (data.user && data.user.id) {
                    localStorage.setItem("id", data.user.id);
                    localStorage.setItem("nombre", data.user.nombre || "");
                    localStorage.setItem("correo", data.user.correo || "");
                    localStorage.setItem("numeroDc", data.user.documento || "");
                    localStorage.setItem("tipoDc", data.user.tipodocumento || "");

                    // Almacenar el último presupuesto activo, si existe
                    if (data.user.ultimoPresupuesto) {
                        localStorage.setItem("idpresupuesto", data.user.ultimoPresupuesto);
                        console.log("Último presupuesto activo guardado:", data.user.ultimoPresupuesto);
                    } else {
                        console.log("No hay un presupuesto activo");
                        localStorage.removeItem("idpresupuesto"); // Limpia si no hay presupuesto activo
                    }

                    console.log("Datos del usuario guardados en localStorage:", {
                        id: data.user.id,
                        nombre: data.user.nombre,
                        correo: data.user.correo,
                        numeroDc: data.user.documento,
                        tipoDc: data.user.tipodocumento,
                        ultimoPresupuesto: data.user.ultimoPresupuesto,
                    });
                } else {
                    console.error("No se recibió un ID de usuario válido.");
                }

                setSuccess(true); // Indicar éxito para mostrar el modal
            } else {
                setErrors({ general: "Correo o contraseña incorrectos" });
            }
        } catch (error) {
            console.error("Error al enviar la solicitud:", error);
            setErrors({ general: "Ocurrió un error en la solicitud" });
        } finally {
            setLoading(false);
        }
    };

    // Función para enviar el código de recuperación
    const enviarCodigoRecuperacion = async (correo) => {
        setLoading(true);
        setErrors({});
        setSuccess(false);

        try {
            const response = await fetch("http://localhost:3000/recuperar-contrasena", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ correo }),
            });

            if (response.ok) {
                setCodigoEnviado(true);
                setSuccess(true);
            } else {
                const data = await response.json();
                setErrors({ general: data.message || "Error al enviar el código" });
            }
        } catch (error) {
            console.error("Error al enviar el código:", error);
            setErrors({ general: "Ocurrió un error en la solicitud" });
        } finally {
            setLoading(false);
        }
    };

    // Función para validar el código y restablecer la contraseña
    const validarCodigoYRestablecer = async (correo, codigo, nuevaContrasena) => {
        setLoading(true);
        setErrors({});
        setSuccess(false);

        try {
            const response = await fetch("http://localhost:3000/validar-codigo", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ correo, codigo, nuevaContrasena }),
            });

            if (response.ok) {
                setSuccess(true); // Indicar éxito
            } else {
                const data = await response.json();
                setErrors({ general: data.message || "Error al restablecer la contraseña" });
            }
        } catch (error) {
            console.error("Error al restablecer la contraseña:", error);
            setErrors({ general: "Ocurrió un error en la solicitud" });
        } finally {
            setLoading(false);
        }
    };

    return { handleSubmit, enviarCodigoRecuperacion, validarCodigoYRestablecer, errors, loading, success, codigoEnviado };
};

export default useLoginForm;
