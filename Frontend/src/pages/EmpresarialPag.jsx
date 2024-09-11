import LayoutN from "../components/Layout/NabvarSisebar";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/sidebar/sidebar";
const Empresarial =  () =>{

  

    return(
        <>

<Navbar titulo={"Empresarial"}/>
<Sidebar/>

<div className="flex items-center justify-center min-h-screen">
    <div className="bg-blueUwu w-7/12 h-64 flex flex-col items-center justify-center p-4 rounded">
        <div className="flex flex-col items-center ">
            <h1 className="text-blanquito text-2xl mt-2">Tus presupuestos</h1>

            <button className="flex">
                <h2 className='text-blanquito'>Fecha:</h2>
                <box-icon name='download' color='#ffffff'></box-icon>
            </button>
            <button className="flex">
                <h2 className='text-blanquito'>Fecha:</h2>
                <box-icon name='download' color='#ffffff'></box-icon>
            </button>
            <button className="flex">
                <h2 className='text-blanquito'>Fecha:</h2>
                <box-icon name='download' color='#ffffff'></box-icon>
            </button>
        </div>
    </div>
</div>
   

        
        
        </>
    )
}
export default Empresarial;