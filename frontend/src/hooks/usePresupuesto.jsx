import { useState } from 'react';

const usePresupuesto = () => {
    const [error, setError] = useState(null);

    const crearPresupuesto = async (datos) => {
        try {
            const idusuario = localStorage.getItem('id');
            const response = await fetch(`http://localhost:3000/presupuestos/${idusuario}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(datos),
            });
            if (!response.ok) {
                throw new Error('Error al crear el presupuesto');
            }
            const result = await response.json();
            // Guardar el idpresupuesto del resultado en localStorage
            localStorage.setItem('ultimoPresupuesto', result.idpresupuesto);
            return result;
        } catch (err) {
            setError(err.message);
            console.error('Error en crearPresupuesto:', err);
        }
    };

    const crearMovimiento = async (datos, idpresupuesto) => {
        try {
            const idusuario = localStorage.getItem('id');
            const response = await fetch(`http://localhost:3000/movimientos/${idusuario}/${idpresupuesto}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(datos),
            });
            if (!response.ok) {
                throw new Error('Error al crear el movimiento');
            }
            return await response.json();
        } catch (err) {
            setError(err.message);
            console.error('Error en crearMovimiento:', err);
        }
    };

    const obtenerPresupuestos = async () => {
        try {
            const idusuario = localStorage.getItem('id');
            const response = await fetch(`http://localhost:3000/presupuestos/${idusuario}`, {
                method: 'GET',
            });
            if (!response.ok) {
                throw new Error('Error al obtener presupuestos');
            }
            return await response.json();
        } catch (err) {
            setError(err.message);
            console.error('Error en obtenerPresupuestos:', err);
        }
    };

    return {
        crearPresupuesto,
        crearMovimiento,
        obtenerPresupuestos,
        error,
    };
};

export default usePresupuesto;
