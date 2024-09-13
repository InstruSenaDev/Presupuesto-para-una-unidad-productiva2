import React, { useState } from 'react';
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/sidebar/sidebar";
import imgP from '../components/Img/imgP.png';
import imgF from '../components/Img/imgF.png';
import imgE from '../components/Img/imgE.png';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'boxicons/css/boxicons.min.css';

const PresupuestosPrueba = () => {
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

  const handleDateSelection = (event) => {
    setSelectedDate(event.target.value);
    setDateError(false);
  };

  const handleDateContinue = () => {
    if (!selectedDate) {
      setDateError(true);
    } else {
      setShowDateModal(false);
      setShowTypeModal(true);
    }
  };

  const handleTypeSelection = (type) => {
    setBudgetType(type);
    setTypeError(false);
  };

  const handleTypeContinue = () => {
    if (!budgetType) {
      setTypeError(true);
    } else {
      setShowTypeModal(false);
      setShowDetailsModal(true);
    }
  };

  const handleDetailsSubmit = (event) => {
    event.preventDefault();
    setShowDetailsModal(false);
    setShowFinalModal(true);
  };

  const handleNewBudget = () => {
    resetForm();
    setShowFinalModal(false);
    setShowTypeSelectionModal(true);
  };

  const handleFinalize = () => {
    setShowFinalModal(false);
    resetForm();
  };

  const resetForm = () => {
    setSelectedDate(null);
    setBudgetType(null);
    setBalance('');
    setDescription('');
    setSelectedOption(null);
  };

  const handleCancel = () => {
    resetForm();
    setShowTypeSelectionModal(false);
    setShowDateModal(false);
    setShowTypeModal(false);
    setShowDetailsModal(false);
    setShowFinalModal(false);
  };

  const startNewBudget = () => {
    setShowTypeSelectionModal(true);
  };

  const handleOptionSelection = (option) => {
    setSelectedOption(option);
    setShowTypeSelectionModal(false);
    if (option === 'movimiento') {
      setShowDetailsModal(true);
    } else {
      setShowDateModal(true);
    }
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
<div className="flex flex-col w-9/12 h-full  justify-between gap-y-4 p-20">
  <div className='bg-griscard h-full text-blanquito rounded'>
    <div className='flex items-center justify-around rounded h-2/6'>
      <img src={imgP} alt="Presupuesto Personal" className='h-20 rounded flex justify-center text-center' />
      <button
        onClick={startNewBudget}
        className="bg-blue-500 text-white px-4 py-2 rounded underline"
      >
        Presupuesto personal
      </button>
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
      <img src={imgF} alt="Presupuesto Personal" className='h-20 rounded flex justify-center text-center' />
      <button
        onClick={startNewBudget}
        className="bg-blue-500 text-white px-4 py-2 rounded underline"
      >
        Presupuesto familiar
      </button>
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
      <img src={imgE} alt="Presupuesto Personal" className='h-20 rounded flex justify-center text-center' />
      <button
        onClick={startNewBudget}
        className="bg-blue-500 text-white px-4 py-2 rounded underline"
      >
        Presupuesto empresarial
      </button>
      <Link to="/Productos">
                            <button className='curson-pointer underline'>
                                <box-icon name='edit' color='#ffffff'></box-icon>
                            </button>
                        </Link>

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

      {/* New Modal for Type Selection */}
      {showTypeSelectionModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-5 rounded-lg shadow-lg w-1/3">
            <h2 className="modal-title">Nuevo</h2>
            <div className="flex justify-around my-4">
              <button 
                className="btn btn-primary" 
                onClick={() => handleOptionSelection('presupuesto')}
              >
                Presupuesto
              </button>
              <button 
                className="btn btn-secondary" 
                onClick={() => handleOptionSelection('movimiento')}
              >
                Movimiento
              </button>
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
            <h2 className="modal-title">Selecciona una fecha</h2>
            <input 
              type="date" 
              className="form-control my-4" 
              onChange={handleDateSelection}
              required
            />
            {dateError && <p className="text-color7">Debes seleccionar una fecha antes de continuar.</p>}
            <div className="flex justify-end">
              <button className="btn btn-secondary mr-2" onClick={handleCancel}>Cerrar</button>
              <button className="btn btn-primary" onClick={handleDateContinue}>Continuar</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de tipo de presupuesto */}
      {showTypeModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-5 rounded-lg shadow-lg w-1/3">
            <h2 className="modal-title">Tipo de presupuesto</h2>
            <div className="form-check my-4">
              <input className="form-check-input " type="radio" name="budgetType" id="egreso" onChange={() => handleTypeSelection('egreso')} />
              <label className="form-check-label" htmlFor="egreso">Egreso</label>
            </div>
            <div className="form-check mb-4">
              <input className="form-check-input" type="radio" name="budgetType" id="ingreso" onChange={() => handleTypeSelection('ingreso')} />
              <label className="form-check-label" htmlFor="ingreso">Ingreso</label>
            </div>
            {typeError && <p className="text-color7">Debes seleccionar un tipo de presupuesto antes de continuar.</p>}
            <div className="flex justify-end">
              <button className="btn btn-secondary mr-2" onClick={handleCancel}>Cerrar</button>
              <button className="btn btn-primary" onClick={handleTypeContinue}>Continuar</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de detalles del presupuesto/movimiento */}
      {showDetailsModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-5 rounded-lg shadow-lg w-1/3">
            <h2 className="modal-title">Detalles del {selectedOption}</h2>
            <form onSubmit={handleDetailsSubmit} className="my-4">
              {selectedOption === 'movimiento' && (
                <div className="form-group mb-4">
                  <label htmlFor="date">Fecha:</label>
                  <input
                    type="date"
                    className="form-control"
                    id="date"
                    value={selectedDate || ''}
                    onChange={handleDateSelection}
                    required
                  />
                </div>
              )}
              <div className="form-group mb-4">
                <label htmlFor="balance">Saldo:</label>
                <input
                  type="number"
                  className="form-control"
                  id="balance"
                  value={balance}
                  onChange={(e) => setBalance(e.target.value)}
                  required
                  min={0}
                  max={999999999999}
                />
              </div>
              <div className="form-group mb-4">
                <label htmlFor="description">Descripción:</label>
                <textarea
                  className="form-control"
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  maxLength={100}
                ></textarea>
              </div>
              <div className="flex justify-end">
                <button type="button" className="btn btn-secondary mr-2" onClick={handleCancel}>Cerrar</button>
                <button type="submit" className="btn btn-primary">Continuar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal final */}
      {showFinalModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-5 rounded-lg shadow-lg w-1/3">
            <h2 className="modal-title">¿Deseas crear un nuevo presupuesto o movimiento?</h2>
            <div className="flex justify-end my-4">
              <button className="btn btn-primary mr-2" onClick={handleNewBudget}>
                <i className='bx bx-plus-circle'></i> Nuevo presupuesto/movimiento
              </button>
              <button className="btn btn-secondary" onClick={handleFinalize}>
                <i className='bx bx-check-circle'></i> Finalizar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default PresupuestosPrueba;