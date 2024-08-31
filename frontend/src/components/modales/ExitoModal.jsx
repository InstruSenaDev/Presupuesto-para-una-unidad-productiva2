import React from 'react';

function ExitoModal() {
  return (
    <div id="exitoModal" className="fixed inset-0 flex items-center justify-center bg-negro bg-opacity-70 hidden">
      <div className="bg-blueUwu p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
        <h2 className="text-2xl text-blanquito font-bold mb-4">¡Inicio exitoso!</h2>
        <button id="aceptarBtn" className="bg-rosadito text-blanquito px-4 py-2 rounded-md">Aceptar</button>
      </div>
    </div>
  );
}

export default ExitoModal;
