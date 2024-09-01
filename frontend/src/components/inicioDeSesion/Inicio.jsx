import React, { useState } from 'react';
import Boton from '../../icoReutilizables/Boton';
import Input from '../../icoReutilizables/Input';
import './styles.css'; // Asegúrate de tener tus estilos CSS

const InicioSesion = () => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        // Lógica de validación y envío del formulario
    };

    const handleModalClick = () => {
        // Lógica para redirigir al home o manejar el modal
    };

    return (
        <div className="contM justify-center flex flex-col md:flex-row h-screen">
            <div className="contM justify-center pt-3 flex flex-col md:flex-row h-screen w-full items-center">
                <div className="cont1 px-8 grid justify-items-center bg-blueUwu h-5/6 rounded-s-lg text-color1 flex-col items-center">
                    <h1 className="font-bold text-blanquito text-2xl">PUP</h1>
                    <img className="h-26 w-28" src="/Logo.png" alt="Logo" />
                    <p className="font-bold text-blanquito text-xl">Presupuesto para unidades productivas</p>
                </div>

                <div className="cont2 px-8 grid justify-items-center w-auto text-color1 flex-col items-center rounded-e-xl h-auto">
                    <form id="formuInicio" className="contform" onSubmit={handleFormSubmit}>
                        <div className="conthf m-4 grid grid-flow-row sm:grid-flow-row-col gap-3 text-center bg-color3">
                            <h1 className="text-2xl text-color2">Inicio sesión</h1>

                            <div className="w-full">
                                <Input name="" placeholder="Correo" id="inicioCorreo" type="text" />
                                <span id="correoError" className="text-color7 text-xs"></span>
                            </div>

                            <div className="relative">
                                <Input
                                    name=""
                                    placeholder="Contraseña"
                                    id="contraseñaInicio"
                                    type={showPassword ? 'text' : 'password'}
                                />
                                <i
                                    className="bx bx-show cursor-pointer absolute right-3 top-2/4 transform -translate-y-2/4"
                                    onClick={togglePasswordVisibility}
                                />
                                <span id="contrasenaError" className="text-color7 text-xs"></span>
                            </div>

                            <div className="flex-col">
                                <button id="abrirModal" type="submit">
                                    <Boton Text="Iniciar sesión" />
                                </button>
                                <a href="/registro">Registrarse</a>
                            </div>

                            <p className="text-color6 text-sm text-center">Copyright 2024 - 2025 Sena</p>
                        </div>
                    </form>
                </div>
            </div>

            {/* Modal */}
            <div
                id="modalExito"
                className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 hidden"
            >
                <div className="bg-white p-5 rounded-md shadow-md">
                    <h2 className="text-xl font-bold mb-4">¡inicio Exitoso!</h2>
                    <button id="aceptarModalInicio" className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={handleModalClick}>
                        Aceptar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InicioSesion;
