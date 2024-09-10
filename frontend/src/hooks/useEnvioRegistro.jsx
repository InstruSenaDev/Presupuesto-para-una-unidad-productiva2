export const useRegistroFetch = () => {
    const registrarUsuario = async (datosUsuario) => {
        try {
            const respuesta = await fetch("http://localhost:3000/registro", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(datosUsuario),
            });

            const datos = await respuesta.json();

            if (respuesta.ok) {
                console.log("Registro exitoso");
                localStorage.setItem('token', datos.token);
            } else {
                console.error("Error en el registro:", datos.message);
            }
        } catch (error) {
            console.error("Error al enviar la solicitud:", error);
        }
    };

    return { registrarUsuario };
};
