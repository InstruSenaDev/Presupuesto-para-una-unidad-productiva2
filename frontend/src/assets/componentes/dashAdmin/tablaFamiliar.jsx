import React, { useState, useEffect } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import LayoutN from "../navbar/layout";

const Dashboard = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/user");
        const data = await response.json();
        setUsuarios(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <LayoutN>
    <div className="ml-[250px] p-[20px]">
      <div className="bg-[#f5f5f5] p-[20px] rounded-[10px] mb-[20px]">
        <div className="bg-white p-[20px] rounded-[10px] mb-[20px]">
          <h3 className="mb-[20px]">Usuarios</h3>

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
                {usuarios.map((usuario) => (
                  <tr key={usuario.id} className="border-t">
                    <td className="p-[10px] border-b border-[#ccc]">{usuario.nombre}</td>
                    <td className="p-[10px] border-b border-[#ccc]">{usuario.correo}</td>
                    <td className="p-[10px] border-b border-[#ccc]">{usuario.tipodocumento}</td>
                    <td className="p-[10px] border-b border-[#ccc]">{usuario.estado}</td>
                    <td className="p-[8px] border-b border-[#ccc]">
                      <button className="text-center font-bold">
                        <i className="bi bi-pencil-square" />
                      </button>
                      <button className="text-center font-bold">
                        <i className="bi bi-trash" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div id="paginator" className="mt-4 flex justify-between">
              <button id="prev-btn" className="px-4 py-2 bg-gray-200 rounded-md">
                Anterior
              </button>
              <button id="next-btn" className="px-4 py-2 bg-gray-200 rounded-md">
                Siguiente
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </LayoutN>
  );
};

export default Dashboard;
