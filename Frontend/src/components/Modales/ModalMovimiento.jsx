import React from 'react';

const ModalMovimiento = ({ mostrarModal, setMostrarModal, setTipoMovimiento }) => {
    if (!mostrarModal) return null;

    return (
        <div className="modal fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
            <div className="bg-white p-8 rounded shadow-lg w-3/12">
                <h2 className="bg-blueUwu text-xl font-bold rounded">Movimiento</h2>
                <div>
                    <label>
                        <input
                            type="radio"
                            name="tipoMovimiento"
                            value="1"
                            onChange={(e) => {
                                setTipoMovimiento(1);
                                setMostrarModal(''); // Cerrar el modal
                            }}
                        />
                        Ingreso
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="tipoMovimiento"
                            value="2"
                            onChange={(e) => {
                                setTipoMovimiento(2);
                                setMostrarModal(''); // Cerrar el modal
                            }}
                        />
                        Egreso
                    </label>
                </div>
                <button
                    onClick={() => {
                        if (tipoMovimiento) {
                            crearMovimiento();
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

export default ModalMovimiento;
