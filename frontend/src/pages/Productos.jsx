import React from 'react';

import Navbar from '../components/Navbar/Navbar';
import Sidebar from '../components/Sidebar/Sidebar';
import ProductosTabla from '../components/Empresarial/TablaProductos'
const Productos =  () =>{
    return(
        <>
    <div className="">
  <Navbar titulo={"Productos"} />
</div>             

<div className="Si fixed top-0 left-0 h-full">
  <Sidebar />
</div> 
    
    <div className='flex justify-center items-center place-content-center'>
    <ProductosTabla/>

    </div>
    </>
)}
export default Productos;