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
        className={`w-64 h-screen bg-blueUwu text-white transition-all duration-300 fixed ${isMinimized ? 'sidebar-minimized' : ''}`}
      >
        <div className="flex justify-end">
          <button onClick={toggleSidebar} className="bg-none border-none text-blanquito text-2xl cursor-pointer">
            ☰
          </button>
        </div>
        <img src="/img/LOGO PUP(1).png" alt="" />
        <ul className="sidebar-menu list-none p-0">
          <li className="p-3.5" data-tooltip="">
            <div className="hover:bg-rosadito font-bold w-full flex items-center">
              <Link to="/home" className="hover:bg-rosadito w-full text-blanquito no-underline">
                Inicio
              </Link>
            </div>
          </li>
          <li className="p-3.5" data-tooltip="">
            <div className="hover:bg-rosadito font-bold w-full flex items-center">
              <Link to="/PagPresupuestosPrincipal" className="hover:bg-rosadito w-full text-blanquito no-underline">
                Presupuesto
              </Link>
            </div>
          </li>
          <li className="p-3.5" data-tooltip="">
            <div className="hover:bg-rosadito font-bold w-full flex items-center">
              <Link to="/pagPresupuestoPersonal" className="hover:bg-rosadito w-full text-blanquito no-underline">
                Personal
              </Link>
            </div>
          </li>
          <li className="p-3.5" data-tooltip="">
            <div className="hover:bg-rosadito font-bold w-full flex items-center">
              <Link to="/pagPresupuestoFamiliar" className="hover:bg-rosadito w-full text-blanquito no-underline">
                Familiar
              </Link>
            </div>
          </li>
          <li className="p-3.5" data-tooltip="">
            <div className="hover:bg-rosadito font-bold w-full flex items-center">
              <Link to="/pagPresupuestoEmpresarial" className="hover:bg-rosadito w-full text-blanquito no-underline">
                Empresarial
              </Link>
            </div>
          </li>
          <li className="p-3.5" data-tooltip="">
            <div className="hover:bg-rosadito font-bold w-full flex items-center">
              <a
                href="#"
                onClick={handleLogout}
                className="hover:bg-rosadito w-full text-blanquito no-underline"
              >
                Salir
              </a>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;