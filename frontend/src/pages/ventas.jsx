import React from 'react'
import DetalleVentas from '../components/Empresarial/detalleVentas'
import Navbar from '../components/Navbar/Navbar'
import Sidebar from '../components/Sidebar/Sidebar'

const ventas = () => {
    return (
        <>
            <Navbar />
            <Sidebar />
            <div className='pl-36 p-16 w-full'>
                <DetalleVentas />
            </div>
        </>
    )
}
export default ventas