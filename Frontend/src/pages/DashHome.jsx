
import Navbar from "../components/Navbar/Navbar";
import SidebarAdmin from "../components/Sidebar/SidebarAdmin";
import ImgA from '../components/Img/imgAp.png';
import ImgB from '../components/Img/imga.png';
import ImgC from '../components/Img/imgb.png';

const PrincipalAdmin = () => {
  return (
    <>
     <div className="">
  <Navbar titulo={"Clientes"} />
</div>             

<div className="Si fixed top-0 left-0 h-full">
  <SidebarAdmin />
</div> 
    
    
      <div className="bg-gray-100 flex items-center justify-center min-h-screen">
        <div className="flex-1 space-y-4 p-20 ml-64 ml-5">
          {/* Bloque Superior */}
          <div className="flex flex-row items-center bg-white p-10 shadow-lg rounded-lg max-w-3xl mx-auto">
            <div className="flex flex-col">
              <h2 className="text-2xl font-bold mb-2">FAMILIAR</h2>
              <p className="text-gray-700 mb-4">
                Administra y controla los gastos familiares mensuales en diversas categorías. Mantén todo organizado y actualizado para una mejor gestión financiera.
              </p>
            </div>
            <img src={ImgA} alt="" className="w-30 h-40" />
          </div>

          {/* Contenedor de Bloques Inferiores */}
          <div className="flex justify-center space-x-4 max-w-3xl mx-auto">
            {/* Bloque Izquierdo Inferior */}
            <div className="bg-white shadow-lg rounded-lg p-6 w-3/4">
              <h2 className="text-2xl font-bold mb-4">PERSONAL</h2>
              <p className="text-gray-700 mb-4">
                Administra tus ingresos, egresos, movimientos financieros y mucho más con nuestra ventana de presupuesto personal. Lleva un registro detallado de tus finanzas mensuales
              </p>
              <img src={ImgB} alt="" />
            </div>

            {/* Bloque Derecho Inferior */}
            <div className="bg-white shadow-lg rounded-lg p-6 w-3/4">
              <h2 className="text-2xl font-bold mb-4">EMPRESARIAL</h2>
              <p className="text-gray-700 mb-4">
                Administra y controla las finanzas empresariales mensuales en todas sus categorías. Mantén todo actualizado para una gestión eficiente y organizada de la empresa.
              </p>
              <img src={ImgC}alt="" />
            </div>
          </div>
        </div>
      </div>
      </>
  );
};

export default PrincipalAdmin;
