import React from "react";
import Navbar from "./navbar";
import Sidebar from "../sidebar/sidebar";


const LayoutN= ({titulo, children})=>{
    return(
        <>
<style>




</style>
        
     <div className="Na"><Navbar titulo={titulo} />  </div> 
    <div className="Si"><Sidebar /> </div>    

       <div className="flex flex-col justify-center items-center min-h-screen">
  
  <main className=" mt-10 flex justify-center items-center w-full h-full">{children}</main>
</div>

      
        </>
    )
}
export default LayoutN;