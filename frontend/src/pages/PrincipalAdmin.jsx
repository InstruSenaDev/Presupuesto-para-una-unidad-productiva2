import React from "react";
import Navbar from "../components/Navbar/Navbar";
import SidebarAdmin from "../components/Sidebar/SidebarAdmin";
import imagenpersonal from "../../public/pup-personal.png";
import imagenempresarial from "../../public/pup-empresarial.png";
import imagenfamiliar from "../../public/pup-familiar.png";
import { Link } from "react-router-dom";

const PrincipalAdmin = () => {
  return (
    <>
     <div className="">
  <Navbar titulo={"Home Administrador"} />
</div>             

<div className="Si fixed top-0 left-0 h-full">
  <SidebarAdmin />
</div> 
        <div className="bg-gray-100 flex items-center justify-center min-h-screen mr-40">
          <div className="flex-1 space-y-4 p-20 ml-64">
            {/* Bloque Superior */}
          <Link to="/TablaFamiliar">
            <div className="flex flex-row items-center bg-white p-8 shadow-lg rounded-lg max-w-3xl mx-auto">
              <div className="flex flex-col flex-grow">
                <h2 className="text-2xl font-bold mb-2">FAMILIAR</h2>
                <p className="text-gray-700 mb-4">
                  Administra y controla los gastos familiares mensuales en
                  diversas categorías. Mantén todo organizado y actualizado para
                  una mejor gestión financiera.
                </p>
              </div>
              <div className="flex-shrink-0 ml-4">
                <img
                  className="w-40 h-40 object-cover rounded-lg"
                  src={imagenfamiliar}
                  alt="Imagen Familiar"
                />
              </div>
            </div>
            </Link>

            {/* Contenedor de Bloques Inferiores */}
            <div className="flex justify-center space-x-4 max-w-3xl mx-auto">
              {/* Bloque Izquierdo Inferior */}
              <Link to="/TablaPersonal">
              <div className="bg-white shadow-lg rounded-lg p-6 w-3/4">
              
                <h2 className="text-2xl font-bold mb-4">PERSONAL</h2>
                <p className="text-gray-700 mb-4">
                  Administra tus ingresos, egresos, movimientos financieros y
                  mucho más con nuestra ventana de presupuesto personal. Lleva
                  un registro detallado de tus finanzas mensuales
                </p>
                <img className="imagenpersonal" src={imagenpersonal} alt="" />
              </div>
              </Link>

              {/* Bloque Derecho Inferior */}
              <Link to="/TablaEmpresarial">
              <div className="bg-white shadow-lg rounded-lg p-6 w-3/4">
                <h2 className="text-2xl font-bold mb-4">EMPRESARIAL</h2>
                <p className="text-gray-700 mb-4">
                  Administra y controla las finanzas empresariales mensuales en
                  todas sus categorías. Mantén todo actualizado para una gestión
                  eficiente y organizada de la empresa.
                </p>
                <img
                  className="imagenempresarial"
                  src={imagenempresarial}
                  alt=""
                />
              </div>
              </Link>
            </div>
          </div>
        </div>
      
    </>
  );
};

export default PrincipalAdmin;
