// src/pages/PresupuestoPersonal.jsx
import React from 'react';
import LayoutN from '../Layout/NabvarSisebar';
import 'boxicons/css/boxicons.min.css'; // Importa el CSS de Boxicons


const pagPersonal = () => {
    return (
        <LayoutN title="">
            <div className="flex justify-center items-center h-screen w-8/12">
                <div className="cont1 px-8 grid justify-center flex flex-col md:flex-row bg-color4 h-5/6 w-full rounded text-color1 items-center">
                    <h1 className="text-blanquito text-2xl">Tus Presupuestos</h1>
                    <ul className="w-full">
                        <li className="flex justify-between items-center">
                            <span>Fecha</span>
                            <i className='bx bx-download' style={{ color: '#000000' }}></i>
                        </li>
                        <li className="flex justify-between items-center mt-4">
                            <span>Fecha</span>
                            <i className='bx bx-download' style={{ color: '#000000' }}></i>
                        </li>
                        <li className="flex justify-between items-center mt-4">
                            <span>Fecha</span>
                            <i className='bx bx-download' style={{ color: '#000000' }}></i>
                        </li>
                    </ul>
                </div>
            </div>
        </LayoutN>
    );
};

export default pagPersonal;
