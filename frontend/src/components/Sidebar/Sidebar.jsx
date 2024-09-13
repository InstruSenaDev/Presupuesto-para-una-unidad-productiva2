import { useState } from 'react';
import imagenlogo from "../../../public/Logopup.png";
import { NavLink, useNavigate } from 'react-router-dom';

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
        window.location.href = '/inicioSesion';
    };

    return (
        <div className={`h-screen bg-blueUwu text-white transition-all duration-300 fixed ${isMinimized ? 'w-16' : 'w-64'}`}>
            <div className="flex justify-end">
                <button onClick={toggleSidebar} className="text-blanquito text-2xl cursor-pointer">☰</button>
            </div>
            <img 
            src={imagenlogo} 
            alt="" 
            className="imagenlogo" />

            <ul className="sidebar-menu list-none p-0">

                <NavLink to={'/PrincipalAdmin'}>
                <li className="p-3.5" data-tooltip={isMinimized ? 'Inicio' : ''}>
                    <div className="hover:bg-rosadito font-bold w-full flex items-center">
                    <i class="bi bi-house"></i>
                        <a href="/PrincipalAdmin" className="hover:bg-rosadito w-full text-blanquito no-underline">Inicio</a>
                    </div>
                </li>
                </NavLink>

                <NavLink to={'/TablaPersonal'}>
                <li className="p-3.5" data-tooltip={isMinimized ? 'Personal' : ''}>
                    <div className="hover:bg-rosadito font-bold w-full flex items-center">
                        <a href="/TablaPersonal" className="hover:bg-rosadito w-full text-blanquito no-underline">Personal</a>
                    </div>
                </li>
                </NavLink>

                <li className="p-3.5" data-tooltip={isMinimized ? 'Familiar' : ''}>
                    <div className="hover:bg-rosadito font-bold w-full flex items-center">
                        <a href="/TablaFamiliar" className="hover:bg-rosadito w-full text-blanquito no-underline">Familiar</a>
                    </div>
                </li>

                <NavLink to={'/TablaEmpresarial'}>
                <li className="p-3.5" data-tooltip={isMinimized ? 'Empresarial' : ''}>
                    <div className="hover:bg-rosadito font-bold w-full flex items-center">
                        <a href="/TablaEmpresarial" className="hover:bg-rosadito w-full text-blanquito no-underline">Empresarial</a>
                    </div>
                </li>
                </NavLink>


                <li className="p-3.5" data-tooltip={isMinimized ? 'Salir' : ''}>
                    <div className="hover:bg-rosadito font-bold w-full flex items-center">
                        <a onClick={handleLogout} className="hover:bg-rosadito w-full text-blanquito no-underline cursor-pointer">Salir</a>
                    </div>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
