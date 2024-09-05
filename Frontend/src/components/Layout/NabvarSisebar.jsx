import React from "react";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../sidebar/sidebar";


const LayoutN= ({titulo, children})=>{
    return(
        <>

        
     <div className=""><Navbar titulo={titulo} />  </div> 
    <div className="Si"><Sidebar /> </div>    

       <div className="flex flex-col justify-center items-center min-h-screen">
  
  <main className=" mt-10 flex justify-center items-center w-full h-full">{children}</main>
</div>

      
        </>
    )
}
export default LayoutN;