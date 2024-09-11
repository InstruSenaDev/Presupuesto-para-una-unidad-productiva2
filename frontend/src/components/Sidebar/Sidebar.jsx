import { useState } from 'react';
<<<<<<< HEAD
=======
import { FaHome, FaMoneyBill, FaUser, FaUsers, FaBuilding, FaSignOutAlt } from 'react-icons/fa';
import imgL from '../img/LogoS.png';
import './Sidebar.css';
>>>>>>> Juan

const Sidebar = () => {
    const [isMinimized, setIsMinimized] = useState(false);

    const toggleSidebar = () => {
        setIsMinimized(!isMinimized);
    };

    const handleLogout = () => {
        localStorage.removeItem('nombre');
        localStorage.removeItem('id');
        localStorage.removeItem('correo');
        localStorage.removeItem('tipoDc');
        localStorage.removeItem('numeroDc');
<<<<<<< HEAD
        window.location.href = '/inicioSesion';
=======
        window.location.href = '/';
>>>>>>> Juan
    };

    return (
        <div className={`h-screen bg-blueUwu text-white transition-all duration-300 fixed ${isMinimized ? 'w-16' : 'w-64'}`}>
            <div className="flex justify-end">
                <button onClick={toggleSidebar} className="text-blanquito text-2xl cursor-pointer">☰</button>
            </div>
<<<<<<< HEAD
            <img src="/img/LOGO PUP(1).png" alt="Logo" className="mt-4" />

            <ul className="sidebar-menu list-none p-0">
                <li className="p-3.5" data-tooltip={isMinimized ? 'Inicio' : ''}>
                    <div className="hover:bg-rosadito font-bold w-full flex items-center">
                        <a href="/home" className="hover:bg-rosadito w-full text-blanquito no-underline">Inicio</a>
                    </div>
                </li>
                <li className="p-3.5" data-tooltip={isMinimized ? 'Presupuesto' : ''}>
                    <div className="hover:bg-rosadito font-bold w-full flex items-center">
                        <a href="/PagPresupuestosPrincipal" className="hover:bg-rosadito w-full text-blanquito no-underline">Presupuesto</a>
                    </div>
                </li>
                <li className="p-3.5" data-tooltip={isMinimized ? 'Personal' : ''}>
                    <div className="hover:bg-rosadito font-bold w-full flex items-center">
                        <a href="/pagPresupuestoPersonal" className="hover:bg-rosadito w-full text-blanquito no-underline">Personal</a>
                    </div>
                </li>
                <li className="p-3.5" data-tooltip={isMinimized ? 'Familiar' : ''}>
                    <div className="hover:bg-rosadito font-bold w-full flex items-center">
                        <a href="/pagPresupuestoFamiliar" className="hover:bg-rosadito w-full text-blanquito no-underline">Familiar</a>
                    </div>
                </li>
                <li className="p-3.5" data-tooltip={isMinimized ? 'Empresarial' : ''}>
                    <div className="hover:bg-rosadito font-bold w-full flex items-center">
                        <a href="/pagPresupuestoEmpresarial" className="hover:bg-rosadito w-full text-blanquito no-underline">Empresarial</a>
                    </div>
                </li>
                <li className="p-3.5" data-tooltip={isMinimized ? 'Salir' : ''}>
                    <div className="hover:bg-rosadito font-bold w-full flex items-center">
                        <a onClick={handleLogout} className="hover:bg-rosadito w-full text-blanquito no-underline cursor-pointer">Salir</a>
                    </div>
=======
            <img src={imgL} alt="Logo" className={`mt-4 transition-all duration-300`} />

            <ul className="sidebar-menu list-none p-0">
                <li className="p-3.5 flex items-center sidebar-item">
                    <FaHome className="text-2xl icon-white" />
                    {!isMinimized && <a href="/home" className="ml-4">Inicio</a>}
                </li>
                <li className="p-3.5 flex items-center sidebar-item">
                    <FaMoneyBill className="text-2xl icon-white" />
                    {!isMinimized && <a href="/Presupuestos" className="ml-4">Presupuesto</a>}
                </li>
                <li className="p-3.5 flex items-center sidebar-item">
                    <FaUser className="text-2xl icon-white" />
                    {!isMinimized && <a href="/pagPresupuestoPersonal" className="ml-4">Personal</a>}
                </li>
                <li className="p-3.5 flex items-center sidebar-item">
                    <FaUsers className="text-2xl icon-white" />
                    {!isMinimized && <a href="/pagPresupuestoFamiliar" className="ml-4">Familiar</a>}
                </li>
                <li className="p-3.5 flex items-center sidebar-item">
                    <FaBuilding className="text-2xl icon-white" />
                    {!isMinimized && <a href="/pagPresupuestoEmpresarial" className="ml-4">Empresarial</a>}
                </li>
                <li className="p-3.5 flex items-center sidebar-item">
                    <FaSignOutAlt className="text-2xl icon-white" />
                    {!isMinimized && <a onClick={handleLogout} className="ml-4 cursor-pointer">Salir</a>}
>>>>>>> Juan
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
