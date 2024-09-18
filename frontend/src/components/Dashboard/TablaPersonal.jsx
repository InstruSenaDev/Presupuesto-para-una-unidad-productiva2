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
        const response = await fetch('http://localhost:3000/user'); // Aquí asumimos que este es el endpoint correcto
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
        <div className='bg-rosadito hidden text-w'>Modal de seguridad</div>

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
                              {/* Botón de editar */}
                              <button className="mr-2 text-blue-500">
                                <i className="bi bi-pencil-square" />
                              </button>

                              {/* Botón de eliminar */}
                              <button 
                                className="text-red-500"
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
      </div>
    </>
  );
};

export default Dashboard;
