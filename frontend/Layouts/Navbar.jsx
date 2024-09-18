import React, { useEffect, useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";

const Header = ({ titulo }) => {
  const [nombre, setNombre] = useState("Usuario desconocido");

  useEffect(() => {
    const storedNombre = localStorage.getItem("nombre");
    // const storedMazamorra = localStorage.getItem("mazamorra");

    if (storedNombre) {
      setNombre(storedNombre);
      // Aquí podrías hacer algo con storedMazamorra si es necesario
    }
  }, []);

  return (
    <header className="text-3xl font-bold pl-16 bg-blueUwu flex justify-between items-center">
      <h1 className="text-blanquito p-7 text-4xl">{titulo}</h1>
      <div id="nombre" className="p-9 flex justify-end text-blanquito font-bold">
        <span className="pl-5">{nombre}</span>
        <div
          id="mazamorra"
          className="bi bi-caret-down-square-fill cursor-pointer"
        ></div>
      </div>
    </header>
  );
};

export default Header;
