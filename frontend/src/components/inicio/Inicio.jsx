import React from 'react';
import Boton from '../../icoReutilizables/Boton';
import Input from '../../icoReutilizables/Input';

function FormularioInicio() {
  return (
    <form id="formuInicio" className="contform" action="/registro">
      <div className="conthf m-4 grid grid-flow-row sm:grid-flow-row-col bg-blueUwu gap-3 text-center bg-color3">
        <h1 className="text-2xl text-color2">Inicio sesión</h1>

        <div className="w-full">
          <Input placeholder="Correo" id="inicioCorreo" type="text" name="" />
          <span id="correoError" className="text-color7 text-xs"></span>
        </div>
        <div className="relative">
          <Input
            placeholder="Contraseña"
            id="contraseñaInicio"
            type="password"
            name=""
          />
          <i
            className="bx bx-show cursor-pointer absolute right-3 top-2/4 transform -translate-y-2/4"
            id="togglePassword"
          ></i>
          <span id="contrasenaError" className="text-color7 text-xs"></span>
        </div>

        <div className="flex-col">
          <button id="abrirModal" type="submit">
            <Boton Text="Iniciar sesión" />
          </button>
          <a href="/registro" className="underline text-negro">
            Registrarse
          </a>
        </div>
        <p className="text-color6 text-sm text-center">
          Copyright 2024 - 2025 Sena
        </p>
      </div>
    </form>
  );
}

export default FormularioInicio;
