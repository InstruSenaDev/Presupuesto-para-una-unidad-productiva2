import React from 'react';

import Navbar from '../components/Navbar/Navbar';
import Sidebar from '../components/Sidebar/Sidebar';
import ProductosTabla from '../components/Empresarial/TablaProductos'
const Productos =  () =>{
    return(
        <>
    <Navbar/>
    <div className='pr-4'>

    <Sidebar/>
    </div>
    
    <div className='flex justify-center items-center place-content-center'>
    <ProductosTabla/>

    </div>
    </>
)}
export default Productos;