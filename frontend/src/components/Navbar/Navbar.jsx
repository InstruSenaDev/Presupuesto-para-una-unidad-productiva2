import React from 'react';

const Navbar = () => {
    document.addEventListener("DOMContentLoaded", function () {
        const nombre = localStorage.getItem("nombre");
        const correo = localStorage.getItem("correo");
        const tipoDc = localStorage.getItem("tipoDc");
        const numeroDc = localStorage.getItem("documento");
        // const mazamorra = localStorage.getItem("mazamorra");
    
        if (nombre) {
          document.getElementById("nombre").textContent = nombre;
          // document.getElementById("mazamorra").textContent = mazamorra;
        } else {
          document.getElementById("nombre").textContent = "Usuario desconocido";
        }
      });
    return (
        <>
            <link
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
            />

            <header className='text-3xl font-bold pl-4 bg-blueUwu items-center'>
                <div className='flex justify-between'>
                    <div></div>
                    <div></div>
                    <div>
                        <h1 id='nombre' className='text-blanquito text-center p-7'></h1>
                    </div>
                    <div>
                        <h1></h1>
                        <i id='OPEN-' className='bi bi-arrow-down-square-fill text-blanquito'></i>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Navbar