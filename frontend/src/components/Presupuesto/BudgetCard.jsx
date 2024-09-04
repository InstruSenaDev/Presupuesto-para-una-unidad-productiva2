import React, { useState } from 'react';
import 'boxicons'; // Asegúrate de tener boxicons instalado
import PersonalIcons from '../../../public/Personal-icons.png';
const BudgetCard = ({ title, date, balance }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);
  const [isThirdModalOpen, setIsThirdModalOpen] = useState(false);
  const [isFourthModalOpen, setIsFourthModalOpen] = useState(false);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);

  return (
    <>
      <div className="bg-gray-800 rounded-lg p-4 flex justify-between items-center w-full max-w-3xl mx-auto mb-4">
        <div className="flex items-center space-x-3">
          <h2 className="text-lg font-semibold text-blanquito">{title}</h2>
          <img src={PersonalIcons} alt="" />
        </div>
        <div className="flex items-center space-x-2">
          <button onClick={() => setIsModalOpen(true)} className="w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors text-xs">
            <box-icon name="plus" color="#ffffff"></box-icon>
          </button>
          <button className="w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors text-xs">
            <box-icon name="show" type="solid" color="#ffffff"></box-icon>
          </button>
          <button className="w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors text-xs">
            <box-icon name="download" color="#ffffff"></box-icon>
          </button>
        </div>
        <div className="text-right">
          <p className="text-xs text-blanquito">{date}</p>
          <p className="font-bold text-sm text-blanquito">{balance}</p>
        </div>
      </div>

      {/* Modals */}
      {isModalOpen && (
        <div className="fixed flex inset-0 bg-opacity-50 overflow-y-auto h-full w-full z-50 items-center justify-center">
          <div className="relative border bg-blanquito w-96 shadow-lg rounded-md bg-white">
            <div className="flex justify-between bg-blueUwu h-1/4">
              <h2 className="text-blanquito text-2xl">Nuevo</h2>
              <box-icon name="x-circle" color="#ffffff" onClick={() => setIsModalOpen(false)}></box-icon>
            </div>
            <div className="mt-3 text-center">
              <div className="p-8">
                <div className="mb-4">
                  <select id="presupuestoSelect" className="w-full px-3 py-2 border rounded-md">
                    <option value="">Presupuesto</option>
                    <option value="">Movimiento</option>
                  </select>
                </div>
                <button className="px-4 text-blanquito py-2 bg-negro text-base font-medium rounded-md shadow-sm hover:bg-blueUwu focus:outline-none focus:ring-2 focus:ring-rosadito">
                  Siguiente →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Puedes repetir el código de arriba para los otros modales, cambiando el estado y contenido según sea necesario */}
    </>
  );
};

export default BudgetCard;
