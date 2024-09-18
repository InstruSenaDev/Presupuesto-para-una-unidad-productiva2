import React, { useState, useEffect } from 'react';
import { ArrowDownSquareFill, XCircle } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';

const Navbar = ({ titulo }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userData, setUserData] = useState({
    nombre: '',
    correo: '',
    tipoDc: '',
    numeroDc: ''
  });

  useEffect(() => {
    const nombre = localStorage.getItem('nombre') || '';
    const correo = localStorage.getItem('correo') || '';
    const tipoDc = localStorage.getItem('tipoDc') || '';
    const numeroDc = localStorage.getItem('numeroDc') || '';

    setUserData({ nombre, correo, tipoDc, numeroDc });
  }, []);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  return (
    <>
      <header className="bg-blueUwu text-blanquito py-4 px-6">
        <div className='container mx-auto flex flex-col sm:flex-row justify-between items-center'>
          <div className='text-center mb-4 sm:mb-0'>
            <h1 className="text-2xl sm:text-3xl font-bold">{titulo}</h1>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-lg">{userData.nombre}</span>
            <button
              onClick={toggleModal}
              className="focus:outline-none focus:ring-2 focus:ring-blanquito rounded-full"
              aria-label="Open user profile"
            >
              <ArrowDownSquareFill className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4">
          <div 
            className="relative bg-white w-full max-w-md mx-auto rounded-lg shadow-2xl transform transition-all duration-300 ease-in-out"
            style={{
              maxHeight: 'calc(100vh - 2rem)',
              overflowY: 'auto'
            }}
          >
            <div className="sticky top-0 flex justify-between items-center bg-blueUwu text-blanquito p-4 rounded-t-lg">
              <h2 className="text-xl font-semibold">Datos usuario</h2>
              <button
                onClick={toggleModal}
                className="focus:outline-none focus:ring-2 focus:ring-blanquito rounded-full p-1 hover:bg-opacity-80 transition-colors duration-200"
                aria-label="Close modal"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 bg-blanquito">
              <ul className="space-y-3 text-gray-700">
                <li><strong>Nombre:</strong> {userData.nombre}</li>
                <li><strong>Correo:</strong> {userData.correo}</li>
                <li><strong>Tipo de documento:</strong> {userData.tipoDc}</li>
                <li><strong>Número de documento:</strong> {userData.numeroDc}</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;