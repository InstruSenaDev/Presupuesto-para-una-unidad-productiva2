import React from 'react';
import FormularioInicio from '../components/FormularioInicio';

function Inicio() {
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
          <h1 className="text-2xl">PUP</h1>
          <img className="h-26 w-28" src="../../public/Logo.png" alt="" />
          <p>Presupuesto para unidades productivas</p>
        </div>

        <div className="cont2 px-8 grid justify-items-center w-auto text-color1 flex-col items-center rounded-e-xl h-auto">
          <FormularioInicio />
        </div>
      </div>

      <script src="../../js/validacionesInicio.js"></script>
      <script src="../../js/envioForInicio.js"></script>
    </div>
  );
}

export default Inicio;
