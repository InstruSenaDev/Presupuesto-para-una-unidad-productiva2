import React, { useState } from 'react';
import Input from '../IcoReutilizables/Input'; // Asegúrate de que el componente Input esté bien importado
import Boton from '../IcoReutilizables/Boton'; // Asegúrate de que el componente Boton esté bien importado
import ImgI from '../Img/Logo.png';


const FormularioInicio = () => {
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí se manejaría la lógica de envío del formulario
    setShowModal(true); // Mostrar modal de éxito
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
          <form id="formuInicio" className="contform" action="/home" onSubmit={handleSubmit}>
            <div className="conthf m-4 grid grid-flow-row sm:grid-flow-row-col gap-3 text-center bg-color3">
              <h1 className="text-2xl text-color2">Inicio sesión</h1>

              <div className="w-full">
                <Input placeholder="Correo" id="inicioCorreo" type="text" />
                <span id="correoError" className="text-color7 text-xs"></span>
              </div>
              <div className="relative">
                <Input placeholder="Contraseña" id="contraseñaInicio" type="password" />
                <i
                  className="bx bx-show cursor-pointer absolute right-3 top-2/4 transform -translate-y-2/4"
                  id="togglePassword"
                ></i>
                <span id="contrasenaError" className="text-color7 text-xs"></span>
              </div>

              <div className="flex-col">
                
                  <Boton Text="Iniciar sesión" />
                 
               
                <a href="/registro" className="underline text-negro">
                  Registrarse
                </a>
              </div>
              <p className="text-color6 text-sm text-center">Copyright 2024 - 2025 Sena</p>
            </div>
          </form>
        </div>
      </div>

      {/* Modal de éxito */}
      {showModal && (
        <div id="modalExito" className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-5 rounded-md shadow-md">
            <h2 className="text-xl font-bold mb-4">¡Inicio Exitoso!</h2>
            <button
              id="aceptarModalInicio"
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
              onClick={() => setShowModal(false)}
            >
              Aceptar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormularioInicio;
