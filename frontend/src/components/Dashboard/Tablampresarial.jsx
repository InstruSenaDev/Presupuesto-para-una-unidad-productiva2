import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';

const UserTable = () => {
  return (
    <div className="ml-[250px] p-[20px]">
      <div className="bg-[#f5f5f5] p-[20px] rounded-[10px] mb-[20px]">


        
        <div className="bg-white p-[20px] rounded-[10px] mb-[20px]">
          <h3 className="mb-[20px]"></h3>
          <div>
            <input
              type="text"
              className="w-[300px] p-[8px] rounded-[5px] border border-[#0e0d0d]"
              placeholder="Search"
            />
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="p-[10px] text-left border-b border-[#ccc]">Nombre usuario</th>
                  <th className="p-[10px] text-left border-b border-[#ccc]">Correo electronico</th>
                  <th className="p-[10px] text-left border-b border-[#ccc]">Tipo documento</th>
                  <th className="p-[10px] text-left border-b border-[#ccc]">Estado</th>
                  <th className="p-[10px] text-left border-b border-[#ccc]"></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-[10px] border-b border-[#ccc]">Damian felipe</td>
                  <td className="p-[10px] border-b border-[#ccc]">Damian@gmaeil.com</td>
                  <td className="p-[10px] border-b border-[#ccc]">C.C</td>
                  <td className="p-[10px] border-b border-[#ccc]">Activo</td>
                  <td className="p-[10px] border-b border-[#ccc]">
                    <i className="bi bi-pencil-square"></i>
                  </td>
                  <td className="p-[10px] border-b border-[#ccc]">
                    <i className="bi bi-trash"></i>
                  </td>
                </tr>
                <tr>
                  <td className="p-[10px] border-b border-[#ccc]">Jairo varela</td>
                  <td className="p-[10px] border-b border-[#ccc]">Jairo@gmaeil.com</td>
                  <td className="p-[10px] border-b border-[#ccc]">C.C</td>
                  <td className="p-[10px] border-b border-[#ccc]">Inactivo</td>
                  <td className="p-[10px] border-b border-[#ccc]">
                    <i className="bi bi-pencil-square"></i>
                  </td>
                  <td className="p-[10px] border-b border-[#ccc]">
                    <i className="bi bi-trash"></i>
                  </td>
                </tr>
                {/* Añadir el resto de las filas de la tabla aquí */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserTable;
