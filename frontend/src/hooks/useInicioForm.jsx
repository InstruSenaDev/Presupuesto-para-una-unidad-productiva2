import { useState } from "react";

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

      // Log para verificar si la respuesta fue recibida correctamente
      console.log("Estado de la respuesta:", response.status);

      if (response.ok) {
        const data = await response.json();

        // Log para ver todo el contenido de la respuesta
        console.log("Datos recibidos desde el servidor:", data);

        if (data.user && data.user.id) {
          localStorage.setItem("id", data.user.id);
          console.log("ID de usuario guardado en localStorage:", data.user.id);
        } else {
          console.error("No se recibió un ID de usuario válido.");
        }

        localStorage.setItem("nombre", data.nombre || "");
        localStorage.setItem("correo", data.correo || "");
        localStorage.setItem("numeroDc", data.documento || "");
        localStorage.setItem("tipoDc", data.tipodedocumento || "");

        setSuccess(true); // Indicar éxito para mostrar el modal
      } else {
        // Si la respuesta no es OK, lo mostramos
        console.log("Error en la respuesta, estado:", response.status);
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
