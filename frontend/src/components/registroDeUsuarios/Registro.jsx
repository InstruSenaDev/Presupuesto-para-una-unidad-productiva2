import React, { useState } from "react";
import Boton from '../IcoReutilizables/Boton';
import Input from '../IcoReutilizables/Input';
import ImgR from '../Img/Logo.png';
import { useValidaciones } from '../../hooks/useFormRegistro';
import { useRegistroFetch } from '../../hooks/useEnvioRegistro';

const Registro = () => {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [documento, setDocumento] = useState("");
  const [tipoDocumento, setTipoDocumento] = useState("");
  const { errores } = useValidaciones();
  const { registrarUsuario } = useRegistroFetch();

  const [exitoModalVisible, setExitoModalVisible] = useState(false);
  const [errorModal, setErrorModal] = useState({ isVisible: false, message: "" });

  const manejarSubmit = async (evento) => {
    evento.preventDefault();
    
    // Comprobar si hay errores en los inputs
    if (Object.values(errores).some(error => error !== "")) {
      return; // No hacer nada si hay errores
    }

    const datosUsuario = {
      nombre,
      correo,
      contrasena,
      tipodocumento: tipoDocumento,
      documento,
    };

    const resultado = await registrarUsuario(datosUsuario);
    
    if (resultado.success) {
      setExitoModalVisible(true);
    } else {
      setErrorModal({ isVisible: true, message: resultado.error });
    }
  };

  const cerrarErrorModal = () => {
    setErrorModal({ isVisible: false, message: "" });
  };

  const cerrarExitoModal = () => {
    setExitoModalVisible(false);
    window.location.href = '/';
  };

  return (
    <>
      <div className="contM justify-center flex flex-col md:flex-row">
        <div className="contM justify-center pt-3 flex flex-col md:flex-row h-screen w-full items-center">
          <div className="cont1 px-8 grid justify-items-center bg-color4 h-5/6 rounded-s-lg text-color1 flex-col items-center">
            <h1 className="text-2xl font-bold">PUP</h1>
            <img className="h-26 w-28" src={ImgR} alt="Logo" />
            <p className="text-xl font-bold">Presupuesto para unidades productivas</p>
          </div>

          <div className="cont2 px-8 grid justify-items-center w-auto text-color1 flex-col items-center rounded-e-xl h-auto">
            <form id="formu" className="contform" method="post" onSubmit={manejarSubmit}>
              <div className="conthf m-4 grid grid-flow-row sm:grid-flow-row-col gap-3 text-center bg-color3">
                <h1 className="text-2xl text-color2">Registro</h1>

                <div className="w-full">
                  <div>
                    <Input
                      placeholder="Nombre"
                      id="registroNombre"
                      name="nombre"
                      type="text"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                    />
                    <span id="errorNombre" className="text-color7 text-xs">{errores.errorNombre}</span>
                  </div>
                  <div>
                    <Input
                      placeholder="Correo"
                      id="CorreoRegistro"
                      name="correo"
                      type="text"
                      value={correo}
                      onChange={(e) => setCorreo(e.target.value)}
                    />
                    <span id="errorCorreo" className="text-color7 text-xs">{errores.errorCorreo}</span>
                  </div>
                  <div className="relative">
                    <Input
                      placeholder="Contraseña"
                      id="ContraseñaRegistro"
                      name="contrasena"
                      type="password"
                      value={contrasena}
                      onChange={(e) => setContrasena(e.target.value)}
                    />
                    <i
                      className="bx bx-show cursor-pointer absolute right-3 top-2/4 transform -translate-y-2/4"
                      id="togglePassword"
                    ></i>
                    <span id="errorContrasena" className="text-color7 text-xs">{errores.errorContrasena}</span>
                  </div>
                  <div className="relative">
                    <select
                      name="tipodocumento"
                      id="tipodocumento"
                      className="text-color2"
                      value={tipoDocumento}
                      onChange={(e) => setTipoDocumento(e.target.value)}
                      required
                    >
                      <option value="">Tipo de identificación</option>
                      <option value="Cedula de ciudadania">Cédula de ciudadanía</option>
                      <option value="Tarjeta de identidad">Tarjeta de identidad</option>
                      <option value="otro">Otro</option>
                    </select>
                  </div>
                  <div className="relative">
                    <Input
                      placeholder="Número"
                      id="documento"
                      name="documento"
                      type="text"
                      value={documento}
                      onChange={(e) => setDocumento(e.target.value)}
                    />
                    <span id="errorDocumento" className="text-color7 text-xs">{errores.errorDocumento}</span>
                  </div>
                  <div className="flex-col">
                    <Boton type="submit" Text="Registrarse" />
                    <p className="text-color6 text-sm text-center text-negro">
                      Copyright 2024 - 2025 Sena
                    </p>
                    <p className="text-color6 text-sm text-center text-negro">
                      ¿Ya tienes cuenta? - <a className="underline" href="/Inisio">Inicia Sesión</a>
                    </p>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Modal de éxito */}
      {exitoModalVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
            <h2 className="text-2xl font-bold mb-4">¡Registro exitoso!</h2>
            <button 
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={cerrarExitoModal}
            >
              Aceptar
            </button>
          </div>
        </div>
      )}

      {/* Modal de error */}
      {errorModal.isVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
            <h2 className="text-xl font-bold mb-4">Error</h2>
            <p className="text-sm">{errorModal.message}</p>
            <button 
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={cerrarErrorModal}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Registro;
