import React from 'react';

const ModalConfirmacion = ({ mostrarModal, setMostrarModal }) => {
    return (
        mostrarModal === 'confirmacion' && (
            <div className="modal fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
                <div className="bg-white p-8 rounded shadow-lg w-3/12">
                    <div>
                        <h2 className="bg-blueUwu text-xl font-bold rounded">Confirmación</h2>
                    </div>
                    <p>¿Desea hacer otro movimiento?</p>
                    <button
                        onClick={() => {
                            setMostrarModal('tipoMovimiento');
                        }}
                        className="bg-blue-500 text-white px-4 py-2 mt-4"
                    >
                        Sí
                    </button>
                    <button
                        onClick={() => {
                            setMostrarModal('');
                        }}
                        className="bg-red-500 text-white px-4 py-2 mt-4 ml-2"
                    >
                        No
                    </button>
                </div>
            </div>
        )
    );
};

export default ModalConfirmacion;
