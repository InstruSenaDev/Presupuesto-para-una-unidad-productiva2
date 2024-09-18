import React, { useEffect, useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import SidebarAdmin from '../Sidebar/SidebarAdmin';
import Navbar from '../Navbar/Navbar';

const TablaEmpresarial = () => {
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


  // Función para eliminar usuario
  const handleDeleteUser = async (id) => {
    const confirmacion = window.confirm("¿Estás seguro de que deseas eliminar este usuario?");
    if (confirmacion) {
      try {
        // Llamada al backend para eliminar al usuario
        const response = await fetch(`http://localhost:3000/user/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          // Actualizamos el estado eliminando al usuario del arreglo
          setUsuarios((prevUsuarios) => prevUsuarios.filter(usuario => usuario.id !== id));
        } else {
          console.error('Error al eliminar el usuario');
        }
      } catch (error) {
        console.error('Error al eliminar el usuario:', error);
      }
    }
  };

  const filteredUsuarios = usuarios.filter((usuario) =>
    usuario.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    usuario.correo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    usuario.tipodocumento?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    usuario.estado?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div>
        <Navbar titulo={"Empresarial"} />
      </div>

      <div className="fixed top-0 left-0 h-full">
        <SidebarAdmin />
      </div>

      <div className="lg:ml-[250px] p-4">
        <div className="bg-gray-100 p-4 rounded-lg mb-4 shadow-md">
          <h3 className="mb-4 text-xl font-semibold">Lista de Movimientos</h3>

          <div className="mb-4">
            <input
              type="text"
              className="w-full sm:w-64 p-2 rounded-md border border-gray-300 focus:ring focus:ring-indigo-200 focus:border-indigo-500"
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
                  <table className="min-w-full table-auto border-collapse">
                    <thead>
                      <tr className="bg-gray-200">
                        <th className="p-2 text-left border-b border-gray-300">Nombre usuario</th>
                        <th className="p-2 text-left border-b border-gray-300">Correo electrónico</th>
                        <th className="p-2 text-left border-b border-gray-300">Tipo documento</th>
                        <th className="p-2 text-left border-b border-gray-300">Estado</th>
                        <th className="p-2 text-left border-b border-gray-300">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsuarios.map((usuario) => (
                        <tr key={usuario.id} className="border-t">
                          <td className="p-3 border-b">{usuario.nombre}</td>
                          <td className="p-3 border-b">{usuario.correo}</td>
                          <td className="p-3 border-b">{usuario.tipodocumento}</td>
                          <td className="p-3 border-b">{usuario.estado}</td>
                          <td className="p-3 border-b flex space-x-2">
                            {/* Botón de editar */}
                            <button className="text-blue-500 text-sm md:text-base">
                              <i className="bi bi-pencil-square" />
                            </button>

                            {/* Botón de eliminar */}
                            <button 
                              className="text-red-500 text-sm md:text-base"
                              onClick={() => handleDeleteUser(usuario.id)} // Aquí llamamos a la función de eliminar
                            >
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
    </>
  );
};

export default TablaEmpresarial;
