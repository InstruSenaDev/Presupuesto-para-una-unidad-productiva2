import React from "react";
import LayoutN from "../components/Layout/NabvarSisebar";
import imagenpersonal from "../../public/pup-personal.png";
import imagenempresarial from "../../public/pup-empresarial.png";
import imagenfamiliar from "../../public/pup-familiar.png";

const PrincipalAdmin = () => {
  return (
    <>
      <LayoutN>
        <div className="bg-gray-100 flex items-center justify-center min-h-screen">
          <div className="flex-1 space-y-4 p-20 ml-64">
            {/* Bloque Superior */}
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

            {/* Contenedor de Bloques Inferiores */}
            <div className="flex justify-center space-x-4 max-w-3xl mx-auto">
              {/* Bloque Izquierdo Inferior */}
              <div className="bg-white shadow-lg rounded-lg p-6 w-3/4">
                <h2 className="text-2xl font-bold mb-4">PERSONAL</h2>
                <p className="text-gray-700 mb-4">
                  Administra tus ingresos, egresos, movimientos financieros y
                  mucho más con nuestra ventana de presupuesto personal. Lleva
                  un registro detallado de tus finanzas mensuales
                </p>
                <img className="imagenpersonal" src={imagenpersonal} alt="" />
              </div>

              {/* Bloque Derecho Inferior */}
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
            </div>
          </div>
        </div>
      </LayoutN>
    </>
  );
};

export default PrincipalAdmin;
