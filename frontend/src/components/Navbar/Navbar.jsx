import React from 'react';

const Navbar = () => {
    const nombre = localStorage.getItem("nombre")
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
                        <h1 id='nombre' className='text-blanquito text-center p-7'>{nombre}</h1>
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
