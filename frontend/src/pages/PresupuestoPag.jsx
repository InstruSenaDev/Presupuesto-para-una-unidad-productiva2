import React, { useState } from 'react';
import usePresupuesto from '../hooks/usePresupuesto';

const PresupuestoForm = () => {
    const { crearPresupuesto, crearMovimiento, obtenerPresupuestos } = usePresupuesto();
    const [paso, setPaso] = useState(1); // Para controlar los pasos
    const [presupuestoData, setPresupuestoData] = useState({
        idtipopresupuesto: 1,
        presupuesto: 0,
        saldo: 0,
        estado: true,
        fecha: '',
    });
    const [movimientoData, setMovimientoData] = useState({
        descripcion: '',
        valor: 0,
        idtipomovimiento: 1,
        estado: true,
        fecha: '',
    });
    const [mostrarModal, setMostrarModal] = useState('seleccion');

    const handlePresupuestoSubmit = async () => {
        if (isNaN(presupuestoData.presupuesto) || isNaN(presupuestoData.saldo)) {
            console.error("El valor del presupuesto o saldo no es válido.");
            return;
        }
        const nuevoPresupuesto = await crearPresupuesto(presupuestoData);
        console.log("Presupuesto creado: ", nuevoPresupuesto);
        setMostrarModal('tipoMovimiento');
        setPaso(2); // Cambiar a paso 2 después de crear presupuesto
    };

    const handleMovimientoSubmit = async () => {
        if (isNaN(movimientoData.valor)) {
            console.error("El valor del movimiento no es válido.");
            return;
        }
        const nuevoMovimiento = await crearMovimiento(movimientoData, presupuestoData.idtipopresupuesto);
        console.log("Movimiento creado: ", nuevoMovimiento);
        setMostrarModal('confirmarOtroMovimiento');
    };

    const handleOtroMovimiento = async () => {
        setMostrarModal('tipoMovimiento');
    };

    const handleFinalizar = async () => {
        const presupuestos = await obtenerPresupuestos();
        console.log("Presupuestos obtenidos: ", presupuestos);
    };

    return (
        <div className="container mx-auto p-4">
            {/* Modal Selección */}
            {paso === 1 && mostrarModal === 'seleccion' && (
                <div className="modal">
                    <h2 className="text-xl font-bold">Nuevo</h2>
                    <select
                        value={presupuestoData.idtipopresupuesto}
                        onChange={(e) => setPresupuestoData({ ...presupuestoData, idtipopresupuesto: parseInt(e.target.value, 10) })}
                        className="block w-full p-2 border border-gray-300 rounded mt-4"
                    >
                        <option value={1}>Presupuesto</option>
                        <option value={2}>Movimiento</option>
                    </select>
                    <button onClick={() => {
                        if (presupuestoData.idtipopresupuesto === 1) {
                            setMostrarModal('fecha');
                        } else {
                            setMostrarModal('tipoMovimiento');
                            setPaso(2); // Cambiar a paso 2 si selecciona Movimiento
                        }
                    }} className="bg-blue-500 text-white px-4 py-2 mt-4">Aceptar</button>
                </div>
            )}

            {/* Modal Fecha */}
            {paso === 1 && mostrarModal === 'fecha' && (
                <div className="modal">
                    <h2 className="text-xl font-bold">Fecha</h2>
                    <input
                        type="date"
                        value={presupuestoData.fecha}
                        onChange={(e) => setPresupuestoData({ ...presupuestoData, fecha: e.target.value })}
                        className="block w-full p-2 border border-gray-300 rounded mt-4"
                    />
                    <button onClick={handlePresupuestoSubmit} className="bg-blue-500 text-white px-4 py-2 mt-4">Aceptar</button>
                </div>
            )}

            {/* Modal Tipo de Movimiento */}
            {paso === 2 && mostrarModal === 'tipoMovimiento' && (
                <div className="modal">
                    <h2 className="text-xl font-bold">Tipo de Movimiento</h2>
                    <select
                        value={movimientoData.idtipomovimiento}
                        onChange={(e) => setMovimientoData({ ...movimientoData, idtipomovimiento: parseInt(e.target.value, 10) })}
                        className="block w-full p-2 border border-gray-300 rounded mt-4"
                    >
                        <option value={1}>Ingreso</option>
                        <option value={2}>Egreso</option>
                    </select>
                    <button onClick={() => setMostrarModal('movimiento')} className="bg-blue-500 text-white px-4 py-2 mt-4">Aceptar</button>
                </div>
            )}

            {/* Modal Movimientos */}
            {paso === 2 && mostrarModal === 'movimiento' && (
                <div className="modal">
                    <h2 className="text-xl font-bold">Movimientos</h2>
                    <input
                        type="number"
                        placeholder="Saldo"
                        value={movimientoData.valor}
                        onChange={(e) => setMovimientoData({ ...movimientoData, valor: parseFloat(e.target.value) })}
                        className="block w-full p-2 border border-gray-300 rounded mt-4"
                    />
                    <input
                        type="text"
                        placeholder="Descripción"
                        value={movimientoData.descripcion}
                        onChange={(e) => setMovimientoData({ ...movimientoData, descripcion: e.target.value })}
                        className="block w-full p-2 border border-gray-300 rounded mt-4"
                    />
                    <button onClick={handleMovimientoSubmit} className="bg-blue-500 text-white px-4 py-2 mt-4">Aceptar</button>
                </div>
            )}

            {/* Modal Confirmar Otro Movimiento */}
            {paso === 2 && mostrarModal === 'confirmarOtroMovimiento' && (
                <div className="modal">
                    <h2 className="text-xl font-bold">¿Quieres hacer otro movimiento?</h2>
                    <button onClick={handleOtroMovimiento} className="bg-green-500 text-white px-4 py-2 mt-4 mr-2">Sí</button>
                    <button onClick={handleFinalizar} className="bg-red-500 text-white px-4 py-2 mt-4">No</button>
                </div>
            )}

        </div>
    );
};

export default PresupuestoForm;
