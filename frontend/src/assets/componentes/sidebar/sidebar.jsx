import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const [isMinimized, setIsMinimized] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsMinimized(!isMinimized);
  };

  const handleLogout = () => {
    localStorage.removeItem("nombre");
    localStorage.removeItem("id");
    localStorage.removeItem("correo");
    localStorage.removeItem("tipoDc");
    localStorage.removeItem("numeroDc");
    navigate('/inicioSesion');
  };

  useEffect(() => {
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.style.marginLeft = isMinimized ? '4rem' : '16rem';
    }
  }, [isMinimized]);

  return (
    <>
      <style>
        {`
          .sidebar-minimized {
            width: 4rem;
          }
          .sidebar-minimized .sidebar-menu li a {
            display: none;
          }
          .sidebar-minimized .sidebar-menu li::before {
            content: attr(data-tooltip);
            color: white;
            display: block;
            text-align: center;
          }
        `}
      </style>
      <div
        id="sidebar"
        className={`h-screen bg-blueUwu text-white transition-all duration-300 fixed ${isMinimized ? 'sidebar-minimized' : 'w-64'}`}
      >
        <div className="flex justify-between items-center p-4">
          <img src="/img/LOGO PUP(1).png" alt="Logo" className={`transition-all duration-300 ${isMinimized ? 'hidden' : 'block'}`} />
          <button onClick={toggleSidebar} className="text-blanquito text-2xl cursor-pointer focus:outline-none">
            ☰
          </button>
        </div>
        <ul className="sidebar-menu list-none p-0 mt-8">
          <li className="p-3.5" data-tooltip="Inicio">
            <Link to="/home" className="hover:bg-rosadito font-bold w-full flex items-center text-blanquito no-underline">
              Inicio
            </Link>
          </li>
          <li className="p-3.5" data-tooltip="Presupuesto">
            <Link to="/PagPresupuestosPrincipal" className="hover:bg-rosadito font-bold w-full flex items-center text-blanquito no-underline">
              Presupuesto
            </Link>
          </li>
          <li className="p-3.5" data-tooltip="Personal">
            <Link to="/pagPresupuestoPersonal" className="hover:bg-rosadito font-bold w-full flex items-center text-blanquito no-underline">
              Personal
            </Link>
          </li>
          <li className="p-3.5" data-tooltip="Familiar">
            <Link to="/pagPresupuestoFamiliar" className="hover:bg-rosadito font-bold w-full flex items-center text-blanquito no-underline">
              Familiar
            </Link>
          </li>
          <li className="p-3.5" data-tooltip="Empresarial">
            <Link to="/pagPresupuestoEmpresarial" className="hover:bg-rosadito font-bold w-full flex items-center text-blanquito no-underline">
              Empresarial
            </Link>
          </li>
          <li className="p-3.5" data-tooltip="Salir">
            <a
              href="#"
              onClick={handleLogout}
              className="hover:bg-rosadito font-bold w-full flex items-center text-blanquito no-underline"
            >
              Salir
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
