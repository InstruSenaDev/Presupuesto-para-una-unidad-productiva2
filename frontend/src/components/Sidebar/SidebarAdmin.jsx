import { useState } from 'react';
import { FaHome, FaMoneyBill, FaUser, FaUsers, FaBuilding, FaSignOutAlt } from 'react-icons/fa';
import imgL from '../img/LogoS.png';
import './Sidebar.css';
import { Link } from 'react-bootstrap-icons';

const SidebarAdmin = () => {
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
        localStorage.removeItem('ultimoPresupuesto');
        window.location.href = '/';
    };

    return (
        <div className={`h-full bg-blueUwu text-white transition-all duration-300 fixed ${isMinimized ? 'w-16' : 'w-64'}`}>
            <div className="flex justify-end">
                <button onClick={toggleSidebar} className="text-blanquito text-2xl cursor-pointer">☰</button>
            </div>
            <img src={imgL} alt="Logo" className={`mt-4 transition-all duration-300`} />

            <ul className="sidebar-menu list-none p-0">
                <li className="p-3.5 flex items-center sidebar-item">
                    <FaHome className="text-2xl icon-white" />
                    {!isMinimized && <a href="/home" className="ml-4">Home</a>}
                </li>
                
                <li className="p-3.5 flex items-center sidebar-item">
                    <FaUser className="text-2xl icon-white" />
                    {!isMinimized && <a href="/PersonalPag" className="ml-4">Personal</a>}
                </li>
                <li className="p-3.5 flex items-center sidebar-item">
                    <FaUsers className="text-2xl icon-white" />
                    {!isMinimized && <a href="/FamiliarPag" className="ml-4">Familiar</a>}
                </li>
                <li className="p-3.5 flex items-center sidebar-item">
                    <FaBuilding className="text-2xl icon-white" />
                    {!isMinimized && <a href="/EmpresarialPag" className="ml-4">Empresarial</a>}
                </li>
                <li className="p-3.5 flex items-center sidebar-item">
                    <FaSignOutAlt className="text-2xl icon-white" />
                    {!isMinimized && <a onClick={handleLogout} className="ml-4 cursor-pointer">Salir</a>}
                </li>
            </ul>
        </div>
    );
};

export default SidebarAdmin;
