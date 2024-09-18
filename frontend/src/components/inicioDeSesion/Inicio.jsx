import React, { useState } from 'react';
import useLoginForm from '../../hooks/useInicioForm';
import useFormValidation from '../../hooks/useFormValidacion';


const LoginForm = () => {
    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');
    const { handleSubmit, errors: loginErrors, loading, success } = useLoginForm();
    const { validateForm, errors: validationErrors, isValid } = useFormValidation();

    const onSubmit = async (e) => {
        e.preventDefault();

        if (validateForm(correo, contrasena)) {
            await handleSubmit(correo, contrasena);
        }
    };

    return (
        <form id="formuInicio" onSubmit={onSubmit}>
            <div>
                <label htmlFor="inicioCorreo">Correo:</label>
                <input
                    id="inicioCorreo"
                    type="email"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                />
                {validationErrors.correo && <p>{validationErrors.correo}</p>}
            </div>

            {/* Modal de éxito */}
            {showModal && (
                <div id="modalExito" className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-5 rounded-md shadow-md">
                        <h2 className="text-xl font-bold mb-4">¡Inicio Exitoso!</h2>
                        <button
                            id="aceptarModalInicio"
                            className= "flex items-center bg-negro bg-blue-500 text-white px-4 py-2 rounded-md"
                            onClick={() => window.location.href = '/Inicio'}
                        >
                            Aceptar
                        </button>
                    </div>
                </div>
            )}
        </form>
    );
};

export default LoginForm;
