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
                    localStorage.setItem("idpresupuesto", data.idpresupuesto);
                    setSuccess(true);
                }
            } else {
                const errorData = await response.json();
                setErrors({ general: errorData.error || "Error al iniciar sesión" });
            }
        } catch (error) {
            setErrors({ general: "Error de conexión" });
        }

        setLoading(false);
    };

    const enviarCodigoRecuperacion = async (correo) => {
        setLoading(true);
        setErrors({});
        setSuccess(false);
        setCodigoEnviado(false);

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
            } else {
                const errorData = await response.json();
                setErrors({ general: errorData.error || "Error al enviar el código" });
            }
        } catch (error) {
            setErrors({ general: "Error de conexión" });
        }

        setLoading(false);
    };

    const validarCodigoYRestablecer = async (correo, codigoRecuperacion, nuevaContrasena) => {
        setLoading(true);
        setErrors({});
        setSuccess(false);

        try {
            const response = await fetch("http://localhost:3000/validar-codigo", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ correo, codigoRecuperacion, nuevaContrasena }),
            });

            if (response.ok) {
                setSuccess(true);
            } else {
                const errorData = await response.json();
                setErrors({ general: errorData.error || "Error al validar el código" });
            }
        } catch (error) {
            setErrors({ general: "Error de conexión" });
        }

        setLoading(false);
    };

    return {
        handleSubmit,
        enviarCodigoRecuperacion,
        validarCodigoYRestablecer,
        errors,
        loading,
        success,
        codigoEnviado,
    };
};

export default useLoginForm;
