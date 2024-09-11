import React, { useState } from 'react';
import usePresupuesto from '../hooks/usePresupuesto';
import LayoutN from '../components/Layout/NabvarSisebar';
import imgP from '../components/Img/imgP.png'
import imgF from '../components/Img/imgF.png'


const PresupuestoForm = () => {
    const { crearPresupuesto, crearMovimiento, obtenerPresupuestos } = usePresupuesto();
    const [paso, setPaso] = useState(1); // Para controlar los pasos
    const [presupuestoData, setPresupuestoData] = useState({
        idtipopresupuesto: null,  // Para establecer el tipo seleccionado
        presupuesto: 0,
        saldo: 0,
        estado: 1,
        fecha: '',
    });
    const [movimientoData, setMovimientoData] = useState({
        descripcion: '',
        valor: 0,
        idtipomovimiento: 1,
        estado: 1,
        fecha: '',
    });
    const [mostrarModal, setMostrarModal] = useState(null);

    const handleTipoPresupuesto = (tipo) => {
        setPresupuestoData({ ...presupuestoData, idtipopresupuesto: tipo });
        setMostrarModal('seleccion'); // Mostrar el primer modal basado en la selección
    };

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
        <LayoutN>
            <div className="container mx-auto p-4 h-full mr-52">
                {/* Botones para seleccionar tipo de presupuesto */}
                {paso === 1 && !mostrarModal && (
                    <div className="flex justify-center items-center h-full">
                        <div className="flex flex-col w-full h-full justify-between gap-y-4">
                            <div className='bg-griscard h-full text-blanquito rounded  '>

                                <div className='flex items-center justify-around rounded h-2/6'>

                                    <img src={imgP} alt="" className='h-20 rounded flex justify-center text-center' />


                                    <button


                                        onClick={() => handleTipoPresupuesto(1)} // Presupuesto Personal
                                        className="bg-blue-500 text-white px-4 py-2 rounded underline"
                                    >
                                        Presupuesto Personal

                                    </button>

                                    <h2>Fecha</h2>

                                    <button className='curson-pointer'>

                                        <box-icon name='down-arrow-alt' color='#ffffff' ></box-icon>
                                    </button>


                                </div>


                            </div>

                            <div className='bg-griscard h-full text-blanquito rounded'>

                                <div className='flex items-center justify-around rounded h-2/6'>
                                    <img src={imgF} alt="" className='h-20 rounded' />

                                    <button
                                        onClick={() => handleTipoPresupuesto(2)} // Presupuesto Familiar
                                        className="bg-green-500 text-white px-4 py-2 rounded underline"
                                    >
                                        Presupuesto Familiar
                                    </button>
                                    <h2>Fecha</h2>
                                    <button className='curson-pointer'>

                                        <box-icon name='down-arrow-alt' color='#ffffff' ></box-icon>
                                    </button>


                                </div>
                            </div>


                        </div>
                    </div>
                )}

                {/* Modal Selección */}
                {paso === 1 && mostrarModal === 'seleccion' && (
                    <div className="modal fixed inset-0 flex items-center  justify-center bg-gray-500 bg-opacity-50">
                        <div className=" p-8 rounded shadow-lg w-3/12">
                            <div>
                                <h2 className="bg-blueUwu text-xl w-auto font-bold rounded">Nuevo</h2>


                            </div>
                            <select
                                value={presupuestoData.idtipopresupuesto}
                                onChange={(e) => setPresupuestoData({ ...presupuestoData, idtipopresupuesto: parseInt(e.target.value, 10) })}
                                className="block w-full p-2 border border-gray-300 rounded mt-4"
                            >
                                <option value={1}>Presupuesto</option>
                                <option value={2}>Movimiento</option>
                            </select>
                            <button
                                onClick={() => {
                                    if (presupuestoData.idtipopresupuesto === 1) {
                                        setMostrarModal('fecha');
                                    } else {
                                        setMostrarModal('tipoMovimiento');
                                        setPaso(2); // Cambiar a paso 2 si selecciona Movimiento
                                    }
                                }}
                                className="bg-blue-500 text-white px-4 py-2 mt-4"
                            >
                                Aceptar
                            </button>
                        </div>
                    </div>
                )}

                {/* Modal Fecha */}
                {paso === 1 && mostrarModal === 'fecha' && (
                    <div className="modal fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
                        <div className="bg-white p-8 rounded shadow-lg w-3/12">
                            <div>

                                <h2 className="bg-blueUwu  text-xl font-bold rounded">Fecha</h2>

                            </div>
                            <input
                                type="date"
                                value={presupuestoData.fecha}
                                onChange={(e) => setPresupuestoData({ ...presupuestoData, fecha: e.target.value })}
                                className="block w-full p-2 border border-gray-300 rounded mt-4"
                            />
                            <button onClick={handlePresupuestoSubmit} className="bg-blue-500 text-white px-4 py-2 mt-4">
                                Aceptar
                            </button>
                        </div>
                    </div>
                )}

                {/* Modal Tipo de Movimiento */}
                {paso === 2 && mostrarModal === 'tipoMovimiento' && (
                    <div className="modal fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
                        <div className="bg-white p-8 rounded shadow-lg w-3/12">

                            <div>

                                <h2 className="bg-blueUwu  text-xl font-bold rounded">Tipo de Movimiento</h2>

                            </div>
                            <select
                                value={movimientoData.idtipomovimiento}
                                onChange={(e) => setMovimientoData({ ...movimientoData, idtipomovimiento: parseInt(e.target.value, 10) })}
                                className="block w-full p-2 border border-gray-300 rounded mt-4"
                            >
                                <option value={1}>Ingreso</option>
                                <option value={2}>Egreso</option>
                            </select>
                            <button onClick={() => setMostrarModal('movimiento')} className="bg-blue-500 text-white px-4 py-2 mt-4">
                                Aceptar
                            </button>
                        </div>
                    </div>
                )}

                {/* Modal Movimientos */}
                {paso === 2 && mostrarModal === 'movimiento' && (
                    <div className="modal fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
                        <div className="bg-white p-8 rounded shadow-lg w-3/12">

                            <div>

                                <h2 className="bg-blueUwu  text-xl font-bold rounded">Movimientos</h2>

                            </div>
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
                            <button onClick={handleMovimientoSubmit} className="bg-blue-500 text-white px-4 py-2 mt-4">
                                Aceptar
                            </button>
                        </div>
                    </div>
                )}

                {/* Modal Confirmar Otro Movimiento */}
                {paso === 2 && mostrarModal === 'confirmarOtroMovimiento' && (
                    <div className="modal fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
                        <div className="bg-white p-8 rounded shadow-lg w-3/12">

                            <div>
                                <h2 className="bg-blueUwu  text-xl font-bold rounded">¿Quieres hacer otro movimiento?</h2>

                            </div>
                            <button onClick={handleOtroMovimiento} className="bg-green-500 text-white px-4 py-2 mt-4 mr-2">
                                Sí
                            </button>
                            <button onClick={handleFinalizar} className="bg-red-500 text-white px-4 py-2 mt-4">
                                No
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </LayoutN>
    );
};

export default PresupuestoForm;
