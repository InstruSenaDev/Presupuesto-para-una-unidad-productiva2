import React from 'react';
import { Link } from 'react-router-dom';
import Boton from '../icoReutilizables/boton.jsx';
import Input from '../icoReutilizables/input.jsx';
import LogoR from '../../img/Logo.png';

const FormularioInicio = () => {
  return (
   <div>
 
      <div className="contM justify-center flex flex-col md:flex-row text-negro ">
        <div className="contM justify-center pt-3 flex flex-col md:flex-row h-screen w-full items-center">
          <div className="cont1 px-8 grid justify-items-center bg-color4 h-5/6 rounded-s-lg text-color1 flex-col items-center">
            <h1 className="text-2xl">PUP</h1>
            <img className="h-26 w-28" src={LogoR} alt="" />
            <p className=''>Presupuesto para unidades productivas</p>
          </div>

          <div className="cont2 px-8 grid justify-items-center w-auto text-color1 flex-col items-center rounded-e-xl h-auto">
            <form id="formuInicio" className="contform" action="/registro">
              <div className="conthf m-4 grid grid-flow-row sm:grid-flow-row-col bg-blueUwu gap-3 text-center bg-color3">
                <h1 className="text-2xl text-color2">Inicio sesión</h1>

                <div className="w-full">
                  <Input placeholder="Correo" id="inicioCorreo" type="text" name="" />
                  <span id="correoError" className="text-color7 text-xs"></span>
                </div>
                <div className="relative">
                  <Input placeholder="Contraseña" id="contraseñaInicio" type="password" name="" />
                  <i className='bx bx-show cursor-pointer absolute right-3 top-2/4 transform -translate-y-2/4' id="togglePassword"></i>
                  <span id="contrasenaError" className="text-color7 text-xs"></span>
                </div>

                <div className="flex-col">
                  <button id="abrirModal" type="submit">
                    <Boton Text="Iniciar sesión" />
                  </button>
                  
                </div>
                <div className="flex-col">
                   <button type="submit">
                    <Link to="/registro" className="undernile cursor-pointer text-negro">
              Registrarse
            </Link>
                   </button>
                
                  
                </div>
                <h2 className='undernile text-negro   '>¿Olividaste la contraseña?</h2>
                <p className="text-color6 text-sm text-center">Copyright 2024 - 2025 Sena</p>
              </div>
            </form>
          </div>
        </div>
      </div>

   </div>
    
  );
};

export default FormularioInicio;
