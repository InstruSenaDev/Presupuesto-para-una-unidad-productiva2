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
        tipo: null,
        idtipopresupuesto: null,
        fecha: '',
    });
    const [movimientoData, setMovimientoData] = useState({
        descripcion: '',
        valor: 0,
        idtipomovimiento: 1,
    });
    const { presupuestos, crearPresupuesto, crearMovimiento, obtenerPresupuestos, error } = usePresupuesto();

    useEffect(() => {
        obtenerPresupuestos();
    }, [obtenerPresupuestos]);

    const handleModalClose = () => {
        setMostrarModal(''); // Cierra el modal
        setPaso(1); // Reinicia el paso al inicial
    };

    const handleOtroMovimiento = () => {
        setMostrarModal('tipoMovimiento'); // Abre nuevamente el modal de tipo de movimiento
        setPaso(2); // Permanece en el paso 2
    };

    const handleFinalizar = () => {
        window.location = "/Presupuestos"; // Cierra todos los modales y finaliza
    };

    const handleMovimientoSubmit = async () => {
        const idpresupuesto = localStorage.getItem('ultimoPresupuesto');
        if (idpresupuesto) {
            await crearMovimiento(movimientoData, idpresupuesto);
            setMostrarModal('confirmarOtroMovimiento'); // Después de crear movimiento, abre el modal de confirmación
        } else {
            alert('No se ha seleccionado ningún presupuesto.');
        }
    };

    const handlePresupuestoSubmit = async () => {
        await crearPresupuesto(presupuestoData);
        setMostrarModal('tipoMovimiento');
    };

    // Ajusta el idtipopresupuesto de acuerdo con el tipo de presupuesto seleccionado
    const handleTipoPresupuesto = (tipo) => {
        let idtipopresupuesto;

        if (tipo === 'seleccion') {
            idtipopresupuesto = 1; // Presupuesto Personal
        } else if (tipo === 'seleccionFamiliar') {
            idtipopresupuesto = 2; // Presupuesto Familiar
        } else if (tipo === 'seleccionEmpresarial') {
            idtipopresupuesto = 3; // Presupuesto Empresarial
        }

        // Actualiza el estado con el idtipopresupuesto seleccionado
        setPresupuestoData({ ...presupuestoData, idtipopresupuesto });

        // Abre el modal correspondiente
        setMostrarModal(tipo);
    };

    const handleSeleccionPresupuesto = (id) => {
        localStorage.setItem('ultimoPresupuesto', id);
        setMostrarModal('tipoMovimiento'); // Abre el modal de tipo de movimiento
        setPaso(2); // Cambia al paso del movimiento
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            {/* Vista principal de los presupuestos */}
            {paso === 1 && !mostrarModal && (
                <div className="flex justify-center items-center h-full">
                    <div className="flex flex-col w-full h-full justify-between gap-y-4">
                        {/* Presupuesto Personal */}
                        <div className='bg-griscard h-full text-blanquito rounded'>
                            <div className='flex items-center justify-around rounded h-2/6'>
                                <img src={imgP} alt="Presupuesto Personal" className='h-20 rounded flex justify-center text-center' />
                                <button
                                    onClick={() => handleTipoPresupuesto('seleccion')}
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
                                <img src={imgF} alt="Presupuesto Familiar" className='h-20 rounded' />
                                <button
                                    onClick={() => handleTipoPresupuesto('seleccionFamiliar')}
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
                                <img src={imgE} alt="Presupuesto Empresarial" className='h-20 rounded flex justify-center text-center' />
                                <button
                                    onClick={() => handleTipoPresupuesto('seleccionEmpresarial')}
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
                    <button
                        onClick={() => {
                            if (presupuestoData.idtipopresupuesto === 1) {
                                setMostrarModal('fecha');
                            } else {
                                setMostrarModal('tipoMovimiento');
                            }
                        }}
                        className="bg-blue-500 text-white px-4 py-2 mt-4"
                    >
                        Aceptar
                    </button>
                </div>
            )}
         {/* Modal de Selección de Presupuesto */}
         {paso === 1 && mostrarModal === 'seleccionFamiliar' && (
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
                    <button
                        onClick={() => {
                            if (presupuestoData.idtipopresupuesto === 1) {
                                setMostrarModal('fechaFamiliar');
                            } else {
                                setMostrarModal('tipoMovimiento');
                            }
                        }}
                        className="bg-blue-500 text-white px-4 py-2 mt-4"
                    >
                        Aceptar
                    </button>
                </div>
            )}
{/* Modal de Selección de Presupuesto */}
{paso === 1 && mostrarModal === 'seleccionEmpresarial' && (
                <div className="modal">
                    <h2 className="text-xl font-bold">Nuevo </h2>
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
                                setMostrarModal('fechaEmpresarial');
                            } else {
                                setMostrarModal('tipoMovimiento');
                            }
                        }}
                        className="bg-blue-500 text-white px-4 py-2 mt-4"
                    >
                        Aceptar
                    </button>
                </div>
            )}
            {/* Modal de Fecha */}
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
                       {paso === 1 && mostrarModal === 'fechaFamiliar' && (
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
                       {paso === 1 && mostrarModal === 'fechaEmpresarial' && (
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
                        onChange={(e) => setMovimientoData({ ...movimientoData, valor: e.target.value })}
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

            {/* Modal Confirmación */}
            {paso === 2 && mostrarModal === 'confirmarOtroMovimiento' && (
                <div className="modal">
                    <h2 className="text-xl font-bold">Confirmación</h2>
                    <p>¿Desea agregar otro movimiento?</p>
                    <button onClick={handleOtroMovimiento} className="bg-green-500 text-white px-4 py-2 mt-4">Sí</button>
                    <button onClick={handleFinalizar} className="bg-red-500 text-white px-4 py-2 mt-4">No</button>
                </div>
            )}
        </div>
    );
};

export default PresupuestoPage;
