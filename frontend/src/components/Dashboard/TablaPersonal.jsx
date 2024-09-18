import React, { useEffect, useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import SidebarAdmin from '../Sidebar/SidebarAdmin';
import Navbar from '../Navbar/Navbar';

const Dashboard = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await fetch('http://localhost:3000/user');
        const data = await response.json();
        setUsuarios(data);
      } catch (error) {
        console.error('Error al obtener los usuarios:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsuarios();
  }, []);

  // Filtrar usuarios basado en el término de búsqueda con el encadenamiento opcional
  const filteredUsuarios = usuarios.filter((usuario) =>
    usuario.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    usuario.correo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    usuario.tipodocumento?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    usuario.estado?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {/* Navbar responsive */}
      <div className="w-full">
        <Navbar titulo={"Personal"} />
      </div>             

      {/* Sidebar responsive */}
      <div className="fixed top-0 left-0 h-full w-64 md:w-72 lg:w-80">
        <SidebarAdmin />
      </div>

      {/* Contenido principal */}
      <div className="ml-64 md:ml-72 lg:ml-80 p-4 md:p-6 lg:p-8">
        <div className="bg-[#f5f5f5] p-4 md:p-6 lg:p-8 rounded-lg mb-6">
          <div className="bg-white p-4 md:p-6 lg:p-8 rounded-lg mb-6">
            <h3 className="mb-4 text-lg md:text-xl lg:text-2xl font-semibold">Lista de Movimientos</h3>

            {/* Barra de búsqueda */}
            <div className="mb-4">
              <input
                type="text"
                className="w-full md:w-96 p-2 md:p-3 rounded-lg border border-gray-400"
                placeholder="Buscar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Tabla responsive */}
            {loading ? (
              <p>Cargando...</p>
            ) : (
              <>
                {filteredUsuarios.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full table-auto border-collapse">
                      <thead>
                        <tr className="bg-gray-200">
                          <th className="p-3 text-left border-b">Nombre usuario</th>
                          <th className="p-3 text-left border-b">Correo electrónico</th>
                          <th className="p-3 text-left border-b">Tipo documento</th>
                          <th className="p-3 text-left border-b">Estado</th>
                          <th className="p-3 text-left border-b">Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredUsuarios.map((usuario) => (
                          <tr key={usuario.id} className="border-t">
                            <td className="p-3 border-b">{usuario.nombre}</td>
                            <td className="p-3 border-b">{usuario.correo}</td>
                            <td className="p-3 border-b">{usuario.tipodocumento}</td>
                            <td className="p-3 border-b">{usuario.estado}</td>
                            <td className="p-3 border-b">
                              <button className="mr-2 text-blue-500">
                                <i className="bi bi-pencil-square" />
                              </button>
                              <button className="text-red-500">
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

export default Dashboard;
