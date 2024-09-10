import { useState, useEffect } from "react";

const usePresupuesto = () => {
    const [idusuario, setIdusuario] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('id');
        console.log("ID usuario desde localStorage:", storedUser); // Debugging
        try {
            const parsedIdusuario = storedUser ? parseInt(storedUser, 10) : null;
            if (isNaN(parsedIdusuario)) {
                throw new Error("ID de usuario no válido");
            }
            setIdusuario(parsedIdusuario);
            console.log("ID usuario parseado:", parsedIdusuario); // Debugging
        } catch (error) {
            console.error("Error al parsear el ID de usuario:", error);
            setIdusuario(null); // Asegúrate de manejar el caso en el que el ID no es válido
        }
    }, []);

    const crearPresupuesto = async (presupuestoData) => {
        if (idusuario === null) {
            console.error("ID de usuario no disponible");
            return;
        }
        try {
            const response = await fetch(`http://localhost:3000/presupuestos/${idusuario}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(presupuestoData),
            });

            if (!response.ok) {
                throw new Error(`Error HTTP! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error("Error al crear presupuesto: ", error);
        }
    };

    const crearMovimiento = async (movimientoData, idtipopresupuesto) => {
        if (idusuario === null) {
            console.error("ID de usuario no disponible");
            return;
        }
        try {
            const response = await fetch(`http://localhost:3000/movimientos/${idusuario}/${idtipopresupuesto}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(movimientoData),
            });

            if (!response.ok) {
                throw new Error(`Error HTTP! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error("Error al crear movimiento: ", error);
        }
    };

    const obtenerPresupuestos = async () => {
        if (idusuario === null) {
            console.error("ID de usuario no disponible");
            return;
        }
        try {
            const response = await fetch(`http://localhost:3000/presupuestos/${idusuario}`);
            
            if (!response.ok) {
                throw new Error(`Error HTTP! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error("Error al obtener presupuestos: ", error);
        }
    };

    return {
        crearPresupuesto,
        crearMovimiento,
        obtenerPresupuestos,
    };
};

export default usePresupuesto;
