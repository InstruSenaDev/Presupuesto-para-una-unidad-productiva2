import React from 'react';
import FormularioRegistro from '../components/FormularioRegistro';
import ExitoModal from '../components/modales/ExitoModal';

function Registro() {
  return (
    <div className="contM justify-center flex flex-col md:flex-row">
      <head>
        <link
          href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
          rel="stylesheet"
        />
      </head>
      <div className="contM justify-center pt-3 flex flex-col md:flex-row h-screen w-full items-center">
        <div className="cont1 px-8 grid justify-items-center bg-color4 h-5/6 rounded-s-lg text-color1 flex-col items-center">
          <h1 className="text-2xl font-bold">PUP</h1>
          <img className="h-26 w-28" src="../../../public/Img/Logo/logo.png" alt="" />
          <p className="text-xl font-bold">Presupuesto para unidades productivas</p>
        </div>

        <div className="cont2 px-8 grid justify-items-center w-auto text-color1 flex-col items-center rounded-e-xl h-auto">
          <FormularioRegistro />
        </div>
      </div>

      <ExitoModal />

      <script src="../../js/validacionesRegistro.js"></script>
      <script src="../../js/envioForRegistro.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    </div>
  );
}

export default Registro;
