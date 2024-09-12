import React from 'react';

const ModalFecha = ({ mostrarModal, setMostrarModal, presupuestoData, setPresupuestoData, crearPresupuesto }) => {
    if (mostrarModal !== 'fecha') return null;

    const handleAceptar = async () => {
        if (presupuestoData.fecha) {
            await crearPresupuesto(presupuestoData);
            setMostrarModal('');
        } else {
            alert('Por favor, selecciona una fecha.');
        }
    };

    return (
        <div className="modal fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
            <div className="bg-white p-8 rounded shadow-lg w-3/12">
                <h2 className="bg-blueUwu text-xl font-bold rounded">Fecha</h2>
                <input
                    type="date"
                    value={presupuestoData.fecha || ''}
                    onChange={(e) => setPresupuestoData({ ...presupuestoData, fecha: e.target.value })}
                    className="block w-full p-2 border border-gray-300 rounded mt-4"
                />
                <button
                    onClick={handleAceptar}
                    className="bg-blue-500 text-white px-4 py-2 mt-4"
                >
                    Aceptar
                </button>
            </div>
        </div>
    );
};

export default ModalFecha;
