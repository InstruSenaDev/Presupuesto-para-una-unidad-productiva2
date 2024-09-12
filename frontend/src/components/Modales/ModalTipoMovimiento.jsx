import React from 'react';

const ModalTipoMovimiento = ({ mostrarModal, setMostrarModal, movimientoData, setMovimientoData, handleMovimientoSubmit }) => {
    if (mostrarModal !== 'tipoMovimiento') return null;

    return (
        <div className="modal fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
            <div className="bg-white p-8 rounded shadow-lg w-3/12">
                <h2 className="bg-blueUwu text-xl font-bold rounded">Tipo de Movimiento</h2>
                <input
                    type="text"
                    placeholder="Descripción"
                    value={movimientoData.descripcion}
                    onChange={(e) => setMovimientoData({ ...movimientoData, descripcion: e.target.value })}
                    className="block w-full p-2 border border-gray-300 rounded mt-4"
                />
                <input
                    type="number"
                    placeholder="Valor"
                    value={movimientoData.valor}
                    onChange={(e) => setMovimientoData({ ...movimientoData, valor: parseFloat(e.target.value) })}
                    className="block w-full p-2 border border-gray-300 rounded mt-4"
                />
                <button
                    onClick={handleMovimientoSubmit}
                    className="bg-blue-500 text-white px-4 py-2 mt-4"
                >
                    Aceptar
                </button>
                <button
                    onClick={() => setMostrarModal('confirmacion')}
                    className="bg-red-500 text-white px-4 py-2 mt-4 ml-2"
                >
                    Cancelar
                </button>
            </div>
        </div>
    );
};

export default ModalTipoMovimiento;

