import { useState } from 'react';

const useLoginForm = () => {
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (correo, contrasena) => {
        setLoading(true);
        setErrors({});

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

    return { handleSubmit, errors, loading, success };
};

export default useLoginForm;
