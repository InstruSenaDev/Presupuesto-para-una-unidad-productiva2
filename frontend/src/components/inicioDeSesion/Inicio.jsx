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

            <div>
                <label htmlFor="contraseñaInicio">Contraseña:</label>
                <input
                    id="contraseñaInicio"
                    type="password"
                    value={contrasena}
                    onChange={(e) => setContrasena(e.target.value)}
                />
                {validationErrors.contrasena && <p>{validationErrors.contrasena}</p>}
            </div>

            {loginErrors.general && <p>{loginErrors.general}</p>}
            {loading && <p>Cargando...</p>}

            <button type="submit">Iniciar sesión</button>

            {/* Mostrar modal si el inicio de sesión fue exitoso */}
            {success && (
                <div id="modalExito">
                    <p>¡Inicio exitoso!</p>
                    <button onClick={() => window.location.href = '/home'}>Aceptar</button>
                </div>
            )}
        </form>
    );
};

export default LoginForm;
