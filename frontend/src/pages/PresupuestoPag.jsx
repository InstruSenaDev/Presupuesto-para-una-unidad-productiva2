import React, { useEffect, useState } from 'react';
import usePresupuesto from '../hooks/usePresupuesto';
import imgP from '../components/Img/imgP.png';
import imgF from '../components/Img/imgF.png';
import imgE from '../components/Img/imgE.png';
import { Link } from 'react-router-dom';

const PresupuestoPage = () => {
    const [mostrarModal, setMostrarModal] = useState('');
    const [paso, setPaso] = useState(1);
    const [presupuestoData, setPresupuestoData] = useState({
        idtipopresupuesto: null,
        fecha: '',
    });
    const [movimientoData, setMovimientoData] = useState({
        descripcion: '',
        valor: 0,
    });
    const { presupuestos, crearPresupuesto, crearMovimiento, obtenerPresupuestos, error } = usePresupuesto();

    useEffect(() => {
        obtenerPresupuestos();
    }, [obtenerPresupuestos]);

    const handleModalClose = () => {
        setMostrarModal(''); // Cierra el modal
    };

    const handleMovimientoSubmit = async () => {
        const idpresupuesto = localStorage.getItem('ultimoPresupuesto');
        if (idpresupuesto) {
            await crearMovimiento(movimientoData, idpresupuesto);
            handleModalClose();
        } else {
            alert('No se ha seleccionado ningún presupuesto.');
        }
    };

    const handlePresupuestoSubmit = async () => {
        await crearPresupuesto(presupuestoData);
        setMostrarModal('tipoMovimiento')
    };

    const handleTipoPresupuesto = (tipo) => {
        setPresupuestoData({ ...presupuestoData, idtipopresupuesto: tipo });
        setMostrarModal('seleccion'); // Abre el modal de selección
    };

    const handleSeleccionPresupuesto = (id) => {
        localStorage.setItem('ultimoPresupuesto', id);
        setMostrarModal('movimiento'); // Abre el modal de movimiento
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            {paso === 1 && !mostrarModal && (
                <div className="flex justify-center items-center h-full">
                    <div className="flex flex-col w-full h-full justify-between gap-y-4">
                        {/* Presupuesto Personal */}
                        <div className='bg-griscard h-full text-blanquito rounded'>
                            <div className='flex items-center justify-around rounded h-2/6'>
                                <img src={imgP} alt="" className='h-20 rounded flex justify-center text-center' />
                                <button
                                    onClick={() => handleTipoPresupuesto("1")} // Presupuesto Personal
                                    className="bg-blue-500 text-white px-4 py-2 rounded underline"
                                >
                                    Presupuesto personal
                                </button>
                                <h2 className=''>Fecha:</h2>
                                <Link to="/PersonalPag">
                                    <button className='curson-pointer underline'>
                                        <box-icon name='download' color='#ffffff'></box-icon>
                                    </button>
                                </Link>
                            </div>
                        </div>
                        {/* Presupuesto Familiar */}
                        <div className='bg-griscard h-full text-blanquito rounded'>
                            <div className='flex items-center justify-around rounded h-2/6'>
                                <img src={imgF} alt="" className='h-20 rounded' />
                                <button
                                    onClick={() => handleTipoPresupuesto("2")} // Presupuesto Familiar
                                    className="bg-green-500 text-white px-4 py-2 rounded underline"
                                >
                                    Presupuesto familiar
                                </button>
                                <h2>Fecha:</h2>
                                <Link to="/FamiliarPag">
                                    <button className='curson-pointer underline'>
                                        <box-icon name='download' color='#ffffff'></box-icon>
                                    </button>
                                </Link>
                            </div>
                        </div>
                        {/* Presupuesto Empresarial */}
                        <div className='bg-griscard h-full text-blanquito rounded'>
                            <div className='flex items-center justify-around rounded h-2/6'>
                                <img src={imgE} alt="" className='h-20 rounded flex justify-center text-center' />
                                <button
                                    onClick={() => handleTipoPresupuesto("3")} // Presupuesto Empresarial
                                    className="bg-blue-500 text-white px-4 py-2 rounded underline"
                                >
                                    Presupuesto empresarial
                                </button>
                                <Link to="/Productos">
                                    <button className='curson-pointer underline'>
                                        <box-icon name='edit' color='#ffffff'></box-icon>
                                    </button>
                                </Link>
                                <h2 className=''>Fecha:</h2>
                                <Link to="/PersonalPag">
                                    <button className='curson-pointer underline'>
                                        <box-icon name='download' color='#ffffff'></box-icon>
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal de Selección de Presupuesto */}
            {mostrarModal === 'seleccion' && (
                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow-lg">
                        <h2 className="text-xl mb-4">Selecciona la fecha</h2>
                        <input
                            type="date"
                            value={presupuestoData.fecha}
                            onChange={(e) => setPresupuestoData({ ...presupuestoData, fecha: e.target.value })}
                            className="mb-4 p-2 border rounded"
                        />
                        <button
                            onClick={handlePresupuestoSubmit}
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                            Crear Presupuesto
                        </button>
                        <button
                            onClick={handleModalClose}
                            className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            )}

            {/* Modal de Movimiento */}
            {mostrarModal === 'movimiento' && (
                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow-lg">
                        <h2 className="text-xl mb-4">Nuevo Movimiento</h2>
                        <input
                            type="text"
                            placeholder="Descripción"
                            value={movimientoData.descripcion}
                            onChange={(e) => setMovimientoData({ ...movimientoData, descripcion: e.target.value })}
                            className="mb-4 p-2 border rounded"
                        />
                        <input
                            type="number"
                            placeholder="Valor"
                            value={movimientoData.valor}
                            onChange={(e) => setMovimientoData({ ...movimientoData, valor: parseFloat(e.target.value) })}
                            className="mb-4 p-2 border rounded"
                        />
                        <button
                            onClick={handleMovimientoSubmit}
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                            Crear Movimiento
                        </button>
                        <button
                            onClick={handleModalClose}
                            className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PresupuestoPage;
