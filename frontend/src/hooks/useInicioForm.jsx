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

                console.log("Inicio de sesión exitoso");

                // Almacenar el token JWT y la información del usuario en localStorage
                localStorage.setItem("id", data.user.id);
                localStorage.setItem("nombre", data.user.nombre);
                localStorage.setItem("correo", data.user.correo);
                localStorage.setItem("numeroDc", data.user.documento);
                localStorage.setItem("tipoDc", data.user.tipodedocumento);
                // Almacena otros datos del usuario según sea necesario

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
