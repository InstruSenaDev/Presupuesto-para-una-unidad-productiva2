import React from 'react';

const ModalSeleccion = ({ mostrarModal, setMostrarModal, setPresupuestoData, presupuestoData }) => {
    if (mostrarModal !== 'seleccion') return null;

    return (
        <div className="modal fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
            <div className="bg-white p-8 rounded shadow-lg w-3/12">
                <h2 className="bg-blueUwu text-xl font-bold rounded">Nuevo</h2>
                <select
                    value={presupuestoData.idtipopresupuesto || 1}
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
                        } else if (presupuestoData.idtipopresupuesto === 2) {
                            setMostrarModal('tipoMovimiento');
                        }
                    }}
                    className="bg-blue-500 text-white px-4 py-2 mt-4"
                >
                    Aceptar
                </button>
            </div>
        </div>
    );
};

export default ModalSeleccion;
