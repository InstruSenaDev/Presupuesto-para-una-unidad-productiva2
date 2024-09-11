import { useState } from 'react';

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
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
