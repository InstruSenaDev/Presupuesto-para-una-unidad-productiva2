import { useState, useEffect } from 'react';


const usePresupuesto = () => {
    const [presupuestos, setPresupuestos] = useState([]);
    const [budgetTypes, setBudgetTypes] = useState([]); // Estado para los tipos de presupuestos
    const [error, setError] = useState(null);
    const [informe, setInforme] = useState(null); // Estado para el informe

    // Función para obtener el idusuario desde el localStorage
    const getIdUsuario = () => {
        const idusuario = JSON.parse(localStorage.getItem('id'));
        return idusuario;
    };

    const getIdPresupuesto = () =>{
        const idpresupuesto = JSON.parse(localStorage.getItem('presupuestos'))
        return idpresupuesto;
    }; 

    // Función para crear un nuevo presupuesto
    const crearPresupuesto = async (presupuestoData) => {
        const idusuario = getIdUsuario();
        try {
            const response = await fetch(`http://localhost:3000/presupuestos/${idusuario}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // Añadir token
                body: JSON.stringify(presupuestoData),
            });

            if (!response.ok) throw new Error('Error al crear el presupuesto');
            const data = await response.json();
            // Actualiza la lista de presupuestos después de crear uno nuevo
            setPresupuestos((prev) => [...prev, data]);
        } catch (err) {
            setError(err.message);
        }
    };

    // Función para crear un nuevo movimiento
    const crearMovimiento = async (movimientoData, idpresupuesto) => {
        const idusuario = getIdUsuario();
        try {
            const response = await fetch(`http://localhost:3000/movimientos/${idusuario}/${idpresupuesto}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // Añadir token
                body: JSON.stringify(movimientoData),
            });

            if (!response.ok) throw new Error('Error al crear el movimiento');
            const data = await response.json();
            // Actualiza el saldo del presupuesto afectado
            await actualizarSaldoPresupuesto(idpresupuesto);
        } catch (err) {
            setError(err.message);
        }
    };

    // Función para actualizar el saldo del presupuesto
    const actualizarSaldoPresupuesto = async (idpresupuesto) => {
        const idusuario = getIdUsuario();
        try {
            const response = await fetch(`http://localhost:3000/presupuestos/${idusuario}`, {
                headers: {},
                credentials: 'include', // Añadir token
            });
            if (!response.ok) throw new Error('Error al obtener los presupuestos');
            const data = await response.json(); 
            
            // Verifica que `data` sea un arreglo
            if (!Array.isArray(data)) {
                throw new Error('La respuesta de presupuestos no es un arreglo');
            }

            const presupuestoActualizado = data.find(p => p.id === idpresupuesto);
            if (presupuestoActualizado) {
                setPresupuestos((prev) =>
                    prev.map(p =>
                        p.id === idpresupuesto ? { ...p, saldo: presupuestoActualizado.saldo } : p
                    )
                );
            }
        } catch (err) {
            setError(err.message);
        }
    };

    // Función para obtener los presupuestos
    const obtenerPresupuestos = async () => {
        const idusuario = getIdUsuario();
        try {
            const response = await fetch(`http://localhost:3000/presupuestos/${idusuario}`, {
                headers: {},
                credentials: 'include', 
            });
            if (!response.ok) throw new Error('Error al obtener los presupuestos');
            const data = await response.json();
            
            // Verifica que `data` sea un arreglo
            if (!Array.isArray(data)) {
                throw new Error('La respuesta de presupuestos no es un arreglo');
            }

            setPresupuestos(data);
        } catch (err) {
            setError(err.message);
        }
    };

    // Función para obtener el informe de movimientos (ingresos/egresos)
    const obtenerInformeMovimientos = async () => {
        const idpresupuesto = getIdPresupuesto();
        try {
            const response = await fetch(`http://localhost:3000/informe/${idpresupuesto}`, {
                headers: {},
                credentials: 'include',
            });
            if (!response.ok) throw new Error('Error al obtener el informe');
            const data = await response.json();
            setInforme(data); // Guardamos los datos del informe en el estado
        } catch (err) {
            setError(err.message);
        }
    };

    // Función para obtener los tipos de presupuestos
    const obtenerTiposPresupuesto = async () => {
        const idusuario = getIdUsuario();
        try {
            const response = await fetch(`http://localhost:3000/presupuestos/tipos/${idusuario}`, {
                headers: {},
                credentials: 'include',
            });
            if (!response.ok) throw new Error('Error al obtener los tipos de presupuesto');
            const data = await response.json();
            setBudgetTypes(data);
        } catch (err) {
            setError(err.message);
        }
    };

    // Función para obtener el presupuesto activo para un tipo
    const getActivePresupuestoByTipo = async (idtipopresupuesto) => {
        const idusuario = getIdUsuario();
        try {
            const response = await fetch(`http://localhost:3000/presupuestos/activos/${idusuario}/${idtipopresupuesto}`, {
                headers: {},
                credentials: 'include',
            });
            if (!response.ok) throw new Error('Error al obtener el presupuesto activo');
            const data = await response.json();
            return data; // Asume que retorna un objeto de presupuesto
        } catch (err) {
            setError(err.message);
            return null;
        }
    };

    // Obtener tipos de presupuesto al montar el hook
    useEffect(() => {
        obtenerTiposPresupuesto();
    }, []);

    return {
        presupuestos,
        budgetTypes, // Retornamos los tipos de presupuestos
        informe, // Retornamos el informe
        crearPresupuesto,
        crearMovimiento,
        obtenerPresupuestos,
        obtenerInformeMovimientos,
        obtenerTiposPresupuesto,
        getActivePresupuestoByTipo, // Retornamos la nueva función
        error
    };
};

export default usePresupuesto;
