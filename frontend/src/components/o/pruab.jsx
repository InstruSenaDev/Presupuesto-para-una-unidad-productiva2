
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