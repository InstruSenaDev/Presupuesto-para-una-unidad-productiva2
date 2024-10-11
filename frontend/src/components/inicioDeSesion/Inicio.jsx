import React, { useState } from 'react';
import ImgI from '../Img/Logo.png';
import Input from '../IcoReutilizables/Input';
import Boton from '../IcoReutilizables/Boton';
import useLoginForm from '../../hooks/useInicioForm';
import useFormValidation from '../../hooks/useFormInicio';

const LoginForm = () => {
    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [codigoRecuperacion, setCodigoRecuperacion] = useState('');
    const [nuevaContrasena, setNuevaContrasena] = useState('');
    const [confirmarContrasena, setConfirmarContrasena] = useState('');
    const [step, setStep] = useState(0); // Paso del modal
    const [showModal, setShowModal] = useState(false);
    const { handleSubmit, enviarCodigoRecuperacion, validarCodigoYRestablecer, errors, loading, success, codigoEnviado } = useLoginForm();
    const { validateForm, errors: validationErrors } = useFormValidation();

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        // Validar el formulario antes de enviar
        if (validateForm(correo, contrasena)) {
            await handleSubmit(correo, contrasena);
            // Si el inicio de sesión es exitoso, mostramos el modal
            if (success) {
                setShowModal(true); 
            }
        }
    };

    const handleEnviarCodigo = async () => {
        await enviarCodigoRecuperacion(correo);
        setStep(1); // Pasar al siguiente paso
    };

    const handleValidarCodigo = async () => {
        if (nuevaContrasena !== confirmarContrasena) {
            alert('Las contraseñas no coinciden');
            return;
        }
        await validarCodigoYRestablecer(correo, codigoRecuperacion, nuevaContrasena);
        if (success) {
            setStep(0); // Volver al inicio si fue exitoso
        }
    };

    const closeModal = () => {
        setStep(0); // Cerrar el modal
        setCorreo('');
        setCodigoRecuperacion('');
        setNuevaContrasena('');
        setConfirmarContrasena('');
        setShowModal(false); // Ocultar el modal
    };

    return (
        <div className="contM justify-center flex flex-col md:flex-row">
            <div className="contM justify-center pt-3 flex flex-col md:flex-row h-screen w-full items-center">
                {/* Contenedor izquierdo */}
                <div className="cont1 px-8 grid justify-items-center bg-blueUwu h-5/6 rounded-s-lg text-color1 flex-col items-center">
                    <h1 className="font-bold text-blanquito text-2xl">PUP</h1>
                    <img className="h-26 w-28" src={ImgI} alt="Logo" />
                    <p className="font-bold text-blanquito text-xl">Presupuesto para unidades productivas</p>
                </div>

                {/* Contenedor derecho */}
                <div className="cont2 px-8 grid justify-items-center w-auto text-color1 flex-col items-center rounded-e-xl h-auto">
                    <form id="formuInicio" className="contform" onSubmit={handleLoginSubmit}>
                        <div className="conthf m-4 grid grid-flow-row sm:grid-flow-row-col gap-3 text-center bg-color3">
                            <h1 className="text-2xl text-color2">Inicio sesión</h1>

                            <div className="w-full">
                                <Input
                                    placeholder="Correo"
                                    id="inicioCorreo"
                                    type="email"
                                    value={correo}
                                    onChange={(e) => setCorreo(e.target.value)}
                                />
                                {validationErrors.correo && <span className="text-color7 text-xs">{validationErrors.correo}</span>}
                            </div>

                            <div className="relative">
                                <Input
                                    placeholder="Contraseña"
                                    id="contraseñaInicio"
                                    type="password"
                                    value={contrasena}
                                    onChange={(e) => setContrasena(e.target.value)}
                                />
                                <i className="bx bx-show cursor-pointer absolute right-3 top-2/4 transform -translate-y-2/4"></i>
                                {validationErrors.contrasena && <span className="text-color7 text-xs">{validationErrors.contrasena}</span>}
                            </div>

                            {errors.general && <p className="text-color7">{errors.general}</p>}
                            {loading && <p>Cargando...</p>}

                            <div className="flex-col">
                                <Boton type="submit" Text="Iniciar sesión" />
                                <a href="/registro" className="underline text-negro">Registrarse</a>
                            </div>
                            <p className="text-color6 text-sm text-center cursor-pointer" onClick={() => setStep(1)}>
                                ¿Olvidaste tu contraseña?
                            </p>
                        </div>
                    </form>

                    {/* Modal de éxito */}
                    {showModal && success && (
                        <div id="modalExito" className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                            <div className="bg-white p-5 rounded-md shadow-md">
                                <h2 className="text-xl font-bold mb-4">¡Inicio Exitoso!</h2>
                                <button
                                    id="aceptarModalInicio"
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                                    onClick={() => {
                                        closeModal(); 
                                        window.location.href = '/Inicio';
                                    }}
                                >
                                    Aceptar
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Modal de Recuperación */}
                    {(step > 0) && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" onClick={closeModal}>
                            <div className="bg-white p-5 rounded-md shadow-md" onClick={(e) => e.stopPropagation()}>
                                {step === 1 && (
                                    <>
                                        <h2 className="text-xl font-bold mb-4">Recuperar Contraseña</h2>
                                        <Input
                                            placeholder="Correo"
                                            id="recuperarCorreo"
                                            type="email"
                                            value={correo}
                                            onChange={(e) => setCorreo(e.target.value)}
                                        />
                                        <Boton Text="Enviar Código" onClick={handleEnviarCodigo} />
                                    </>
                                )}

                                {step === 2 && codigoEnviado && (
                                    <>
                                        <h2 className="text-xl font-bold mb-4">Ingresa el Código</h2>
                                        <Input
                                            placeholder="Código de Recuperación"
                                            id="codigoRecuperacion"
                                            type="text"
                                            value={codigoRecuperacion}
                                            onChange={(e) => setCodigoRecuperacion(e.target.value)}
                                        />
                                        <Boton Text="Validar Código" onClick={handleValidarCodigo} />
                                    </>
                                )}

                                {step === 3 && (
                                    <>
                                        <h2 className="text-xl font-bold mb-4">Nueva Contraseña</h2>
                                        <Input
                                            placeholder="Nueva Contraseña"
                                            id="nuevaContrasena"
                                            type="password"
                                            value={nuevaContrasena}
                                            onChange={(e) => setNuevaContrasena(e.target.value)}
                                        />
                                        <Input
                                            placeholder="Confirmar Contraseña"
                                            id="confirmarContrasena"
                                            type="password"
                                            value={confirmarContrasena}
                                            onChange={(e) => setConfirmarContrasena(e.target.value)}
                                        />
                                        <Boton Text="Restablecer Contraseña" onClick={handleValidarCodigo} />
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
