import React from 'react';
import Boton from '../components/Boton';
import Input from '../components/Input';

function FormularioRegistro() {
  return (
    <form id="formu" className="contform" method="post" action="/registro">
      <div className="conthf m-4 grid grid-flow-row sm:grid-flow-row-col gap-3 text-center bg-color3">
        <h1 className="text-2xl text-color2">Registro</h1>

        <div className="w-full">
          <div>
            <Input placeholder="Nombre" id="registroNombre" name="nombre" type="text" />
            <span id="nombreError" className="text-color7 text-xs"></span>
          </div>
          <div>
            <Input placeholder="Correo" id="CorreoRegistro" name="correo" type="text" />
            <span id="correoError" className="text-color7 text-xs"></span>
          </div>
          <div className="relative">
            <Input placeholder="Contraseña" id="ContraseñaRegistro" name="contrasena" type="password" />
            <i className='bx bx-show cursor-pointer absolute right-3 top-2/4 transform -translate-y-2/4' id="togglePassword"></i>
            <span id="contrasenaError" className="text-color7 text-xs"></span>
          </div>
          <div className="relative">
            <select name="tipodocumento" id="tipodocumento" className="text-color2" required>
              <option value="">Tipo de identificación</option>
              <option value="Cedula de ciudadania">Cédula de ciudadanía</option>
              <option value="Tarjeta de identidad">Tarjeta de identidad</option>
              <option value="otro">Otro</option>
            </select>
          </div>
          <div className="relative">
            <Input placeholder="Número" id="documento" name="documento" type="text" />
            <span id="numeroDcError" className="text-color7 text-xs"></span>
          </div>
          <div className="flex-col">
            <Boton Text="Registrarse" />
            <p className="text-color6 text-sm text-center">Copyright 2024 - 2025 Sena</p>
            <p className="text-color6 text-sm text-center">¿Ya tienes cuenta? - <a href="/inicioSesion">Inicia Sesion</a></p>
            <span id="submit" className="text-color7 text-xs"></span>
          </div>
        </div>
      </div>
    </form>
  );
}

export default FormularioRegistro;
