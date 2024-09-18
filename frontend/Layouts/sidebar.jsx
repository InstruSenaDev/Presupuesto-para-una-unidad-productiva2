import React, { useState, useEffect } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";

const Sidebar = () => {
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    const toggleBtn = document.getElementById("toggleBtn");
    const mainContent = document.getElementById("main-content");

    toggleBtn.addEventListener("click", () => {
      setIsMinimized(!isMinimized);
    });

    const cerrarSesionBtn = document.getElementById("cerrarSesion");
    cerrarSesionBtn.addEventListener("click", () => {
      localStorage.removeItem("nombre");
      localStorage.removeItem("id");
      window.location.href = "/inicioSesion";
    });

    return () => {
      toggleBtn.removeEventListener("click", null);
      cerrarSesionBtn.removeEventListener("click", null);
    };
  }, [isMinimized]);

  return (
    <div className="w-64 flex flex-shrink-0 flex-wrap">
      <div
        id="sidebar"
        className={`h-screen bg-blueUwu text-white transition-all duration-300 flex flex-col flex-shrink ${isMinimized ? "sidebar-minimized" : "w-64"}`}
        style={{
          position: "fixed",
          zIndex: 1000,
        }}
      >
        <div className="flex justify-end p-2.5 bg-gray-700">
          <button
            id="toggleBtn"
            className="bg-none border-none text-white text-2xl cursor-pointer"
          >
            ☰
          </button>
        </div>
        <ul className="sidebar-menu list-none p-0">
          <li className="p-3.5" data-tooltip="">
            <div className="hover:bg-rosadito w-full flex items-center">
              <a
                href="/home"
                className="hover:bg-rosadito w-full font-bold text-2xl text-blanquito no-underline"
              >
                Inicio
              </a>
            </div>
          </li>
          <li className="p-3.5" data-tooltip="">
            <div className="hover:bg-rosadito w-full flex items-center">
              <a
                href="#"
                className="hover:bg-rosadito w-full font-bold text-2xl text-blanquito no-underline"
              >
                Personal
              </a>
            </div>
          </li>
          <li className="p-3.5" data-tooltip="">
            <div className="hover:bg-rosadito w-full flex items-center">
              <a
                href="#"
                className="hover:bg-rosadito w-full font-bold text-2xl text-blanquito no-underline"
              >
                Familiar
              </a>
            </div>
          </li>
          <li className="p-3.5" data-tooltip="">
            <div className="hover:bg-rosadito w-full flex items-center">
              <a
                href="#"
                className="hover:bg-rosadito w-full font-bold text-2xl text-blanquito no-underline"
              >
                Empresarial
              </a>
            </div>
          </li>
          <li className="p-3.5 flex" data-tooltip="">
            <div className="hover:bg-rosadito w-full flex items-center">
              <a
                id="cerrarSesion"
                href="#"
                className="hover:bg-rosadito w-full font-bold text-2xl text-blanquito no-underline"
              >
                Salir
              </a>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
