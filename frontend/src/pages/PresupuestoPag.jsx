import React, { useState } from 'react';
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/sidebar/sidebar";
import imgP from '../components/Img/imgP.png';
import imgF from '../components/Img/imgF.png';
import imgE from '../components/Img/imgE.png';
import { Link, useNavigate } from 'react-router-dom'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import 'boxicons/css/boxicons.min.css';
import usePresupuesto from '../hooks/usePresupuesto'; // Importamos el hook

const PresupuestosPrueba = () => {
  const { crearPresupuesto, crearMovimiento } = usePresupuesto();
  const [showTypeSelectionModal, setShowTypeSelectionModal] = useState(false);
  const [showDateModal, setShowDateModal] = useState(false);
  const [showTypeModal, setShowTypeModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showFinalModal, setShowFinalModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [budgetType, setBudgetType] = useState(null);
  const [balance, setBalance] = useState('');
  const [description, setDescription] = useState('');
  const [dateError, setDateError] = useState(false);
  const [typeError, setTypeError] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const navigate = useNavigate();

  // Función para seleccionar la fecha
  const handleDateSelection = (event) => {
    setSelectedDate(event.target.value);
    setDateError(false);
  };

  // Función para continuar después de seleccionar la fecha
  const handleDateContinue = () => {
    if (!selectedDate) {
      setDateError(true);
    } else {
      setShowDateModal(false);
      setShowTypeModal(true);
    }
  };

  // Función para seleccionar el tipo de presupuesto
  const handleTypeSelection = (type) => {
    setBudgetType(type);
    setTypeError(false);
  };

  // Función para continuar después de seleccionar el tipo de presupuesto
  const handleTypeContinue = () => {
    if (!budgetType) {
      setTypeError(true);
    } else {
      setShowTypeModal(false);
      setShowDetailsModal(true);
    }
  };

  // Función para enviar los detalles del presupuesto o movimiento
  const handleDetailsSubmit = async (event) => {
    event.preventDefault();
    setShowDetailsModal(false);
    setShowFinalModal(true);

    const presupuestoData = {
      fecha: selectedDate,
      tipo: budgetType,
      saldo: balance,
      descripcion: description,
    };

    if (selectedOption === 'presupuesto') {
      await crearPresupuesto(presupuestoData);
    } else if (selectedOption === 'movimiento') {
      const idPresupuesto = JSON.parse(localStorage.getItem('idpresupuesto')); // Obtén el idpresupuesto activo
      await crearMovimiento(presupuestoData, idPresupuesto);
    }
  };

  // Función para crear un nuevo presupuesto o movimiento
  const handleNewBudget = () => {
    resetForm();
    setShowFinalModal(false);
    setShowTypeSelectionModal(true);
  };

  // Función para finalizar el flujo
  const handleFinalize = () => {
    setShowFinalModal(false);
    resetForm();
  };

  // Función para resetear el formulario
  const resetForm = () => {
    setSelectedDate(null);
    setBudgetType(null);
    setBalance('');
    setDescription('');
    setSelectedOption(null);
  };

  // Función para cancelar el proceso
  const handleCancel = () => {
    resetForm();
    setShowTypeSelectionModal(false);
    setShowDateModal(false);
    setShowTypeModal(false);
    setShowDetailsModal(false);
    setShowFinalModal(false);
  };

  // Iniciar el proceso de nuevo presupuesto
  const startNewBudget = () => {
    setShowTypeSelectionModal(true);
  };

  // Selección del tipo de opción (Presupuesto o Movimiento)
  const handleOptionSelection = (option) => {
    setSelectedOption(option);
    setShowTypeSelectionModal(false);
    if (option === 'movimiento') {
      setShowDetailsModal(true);
    } else {
      setShowDateModal(true);
    }
  };

  // Si es presupuesto empresarial, redirigir a ventas después de seleccionar la fecha
  const handleEnterpriseBudget = () => {
    navigate("/ventas");
  };

  return (
    <>
      <div className="">
        <Navbar titulo={"PresupuestoPrueba"} />
      </div>

      <div className="fixed top-0 left-0 h-full">
        <Sidebar />
      </div>

      <div className="flex justify-center items-center h-full">
        <div className="flex flex-col w-9/12 h-full justify-between gap-y-4 p-20">
          <div className='bg-griscard h-full text-blanquito rounded'>
            <div className='flex items-center justify-around rounded h-2/6'>
              <img src={imgP} alt="Presupuesto Personal" className='h-20 rounded flex justify-center text-center' />
              <button onClick={startNewBudget} className="bg-blue-500 text-white px-4 py-2 rounded underline">Presupuesto personal</button>
              <h2 className=''>Fecha: {selectedDate || 'No seleccionada'}</h2>
              <Link to="/">
                <button className='cursor-pointer underline'>
                  <i className='bx bx-download' style={{ color: '#ffffff' }}></i>
                </button>
              </Link>
            </div>
          </div>

          <div className='bg-griscard h-full text-blanquito rounded'>
            <div className='flex items-center justify-around rounded h-2/6'>
              <img src={imgF} alt="Presupuesto Familiar" className='h-20 rounded flex justify-center text-center' />
              <button onClick={startNewBudget} className="bg-blue-500 text-white px-4 py-2 rounded underline">Presupuesto familiar</button>
              <h2 className=''>Fecha: {selectedDate || 'No seleccionada'}</h2>
              <Link to="/">
                <button className='cursor-pointer underline'>
                  <i className='bx bx-download' style={{ color: '#ffffff' }}></i>
                </button>
              </Link>
            </div>
          </div>

          <div className='bg-griscard h-full text-blanquito rounded'>
            <div className='flex items-center justify-around rounded h-2/6'>
              <img src={imgE} alt="Presupuesto Empresarial" className='h-20 rounded flex justify-center text-center' />
              <button onClick={handleEnterpriseBudget} className="bg-blue-500 text-white px-4 py-2 rounded underline">Presupuesto empresarial</button>
              <h2 className=''>Fecha: {selectedDate || 'No seleccionada'}</h2>
              <Link to="/">
                <button className='cursor-pointer underline'>
                  <i className='bx bx-download' style={{ color: '#ffffff' }}></i>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Modal para selección de tipo */}
      {showTypeSelectionModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-5 rounded-lg shadow-lg w-1/3">
            <h2 className="modal-title">Nuevo</h2>
            <div className="flex justify-around my-4">
              <button className="btn btn-primary" onClick={() => handleOptionSelection('presupuesto')}>Presupuesto</button>
              <button className="btn btn-secondary" onClick={() => handleOptionSelection('movimiento')}>Movimiento</button>
            </div>
            <div className="flex justify-end">
              <button className="btn btn-secondary" onClick={handleCancel}>Cerrar</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de selección de fecha */}
      {showDateModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-5 rounded-lg shadow-lg w-1/3">
            <h2 className="modal-title">Seleccionar fecha</h2>
            <input
              type="date"
              className="form-control my-3"
              value={selectedDate || ''}
              onChange={handleDateSelection}
            />
            {dateError && <p className="text-danger">Por favor, selecciona una fecha.</p>}
            <div className="flex justify-end">
              <button className="btn btn-primary" onClick={handleDateContinue}>Continuar</button>
              <button className="btn btn-secondary" onClick={handleCancel}>Cancelar</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de selección de tipo de presupuesto */}
      {showTypeModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-5 rounded-lg shadow-lg w-1/3">
            <h2 className="modal-title">Seleccionar tipo de presupuesto</h2>
            <div className="flex justify-around my-4">
              <button className="btn btn-primary" onClick={() => handleTypeSelection('personal')}>Personal</button>
              <button className="btn btn-primary" onClick={() => handleTypeSelection('familiar')}>Familiar</button>
              <button className="btn btn-primary" onClick={() => handleTypeSelection('empresarial')}>Empresarial</button>
            </div>
            {typeError && <p className="text-danger">Por favor, selecciona un tipo de presupuesto.</p>}
            <div className="flex justify-end">
              <button className="btn btn-primary" onClick={handleTypeContinue}>Continuar</button>
              <button className="btn btn-secondary" onClick={handleCancel}>Cancelar</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de detalles */}
      {showDetailsModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-5 rounded-lg shadow-lg w-1/3">
            <h2 className="modal-title">Detalles</h2>
            <form onSubmit={handleDetailsSubmit}>
              <input
                type="number"
                placeholder="Saldo"
                className="form-control my-3"
                value={balance}
                onChange={(e) => setBalance(e.target.value)}
              />
              <textarea
                placeholder="Descripción"
                className="form-control my-3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <div className="flex justify-end">
                <button type='submit' className="btn btn-primary">Guardar</button>
                <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal final */}
      {showFinalModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-5 rounded-lg shadow-lg w-1/3">
            <h2 className="modal-title">¡Completado!</h2>
            <p>El presupuesto o movimiento ha sido guardado exitosamente.</p>
            <div className="flex justify-end">
              <button type='submit' className="btn btn-primary" onClick={handleNewBudget}>Crear Nuevo</button>
              <button type='submit' className="btn btn-secondary" onClick={handleFinalize}>Finalizar</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PresupuestosPrueba;
