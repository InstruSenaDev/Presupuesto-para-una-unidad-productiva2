import React, { useState, useEffect } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Navbar from '../Navbar/Navbar';
import SidebarAdmin from '../Sidebar/SidebarAdmin';

const TablaFamiliar = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await fetch('http://localhost:3000/user');
        const data = await response.json();
        console.log(data);
        setUsuarios(data);
      } catch (error) {
        console.error('Error al obtener los usuarios:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsuarios();
  }, []);

  const filteredUsuarios = usuarios.filter((usuario) =>
    usuario.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    usuario.correo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    usuario.tipodocumento?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    usuario.estado?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="sm:flex sm:flex-col">
        <Navbar titulo={"Familiar"} />
      </div>

      <div className="fixed top-0 left-0 h-full">
        <SidebarAdmin />
      </div>

      <div className="ml-0 sm:ml-[250px] p-[20px]">
        <div className="bg-[#f5f5f5] p-[20px] rounded-[10px] mb-[20px]">
          <div className="bg-white p-[20px] rounded-[10px] mb-[20px]">
            <h3 className="mb-[20px] text-lg md:text-xl lg:text-2xl">Lista de Movimientos</h3>

            <div className="mb-[20px]">
              <input
                type="text"
                className="w-full sm:w-[300px] p-[8px] rounded-[5px] border border-[#0e0d0d]"
                placeholder="Buscar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {loading ? (
              <p>Cargando...</p>
            ) : (
              <>
                {filteredUsuarios.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse min-w-[500px]">
                      <thead>
                        <tr>
                          <th className="p-[10px] text-left border-b border-[#ccc]">Nombre usuario</th>
                          <th className="p-[10px] text-left border-b border-[#ccc]">Correo electrónico</th>
                          <th className="p-[10px] text-left border-b border-[#ccc]">Tipo documento</th>
                          <th className="p-[10px] text-left border-b border-[#ccc]">Estado</th>
                          <th className="p-[10px] text-left border-b border-[#ccc]">Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredUsuarios.map((usuario) => (
                          <tr key={usuario.id} className="border-t">
                            <td className="p-[10px] border-b border-[#ccc]">{usuario.nombre}</td>
                            <td className="p-[10px] border-b border-[#ccc]">{usuario.correo}</td>
                            <td className="p-[10px] border-b border-[#ccc]">{usuario.tipodocumento}</td>
                            <td className="p-[10px] border-b border-[#ccc]">{usuario.estado}</td>
                            <td className="p-[8px] border-b border-[#ccc]">
                              <button className="text-blue-600 hover:text-blue-800 text-center font-bold">
                                <i className="bi bi-pencil-square" />
                              </button>
                              <button className="text-red-600 hover:text-red-800 text-center font-bold ml-4">
                                <i className="bi bi-trash" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p>No se encontraron resultados.</p>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TablaFamiliar;
