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
      <header className="bg-blueUwu text-blanquito justify-between py-4 px-6">
       <div className='display text-center'><h1 className="text-3xl font-bold mr-10">{titulo}</h1> </div>
        <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-bold mr-10"></h1>
         
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
        <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center">
          <div className="relative bg-white w-full max-w-md mx-4 rounded-lg shadow-xl">
            <div className="flex justify-between items-center bg-blueUwu text-blanquito p-4 rounded-t-lg">
              <h2 className="text-xl font-semibold">Datos usuario</h2>
              <button
                onClick={toggleModal}
                className="focus:outline-none focus:ring-2 focus:ring-blanquito rounded-full p-1"
                aria-label="Close modal"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 bg-blanquito text-center">
              <ul className="space-y-2 text-gray-700">
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