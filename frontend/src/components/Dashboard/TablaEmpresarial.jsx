import React, { useEffect, useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import SidebarAdmin from '../Sidebar/SidebarAdmin';
import Navbar from '../Navbar/Navbar';

const TablaEmpresarial = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [usuarioADesactivar, setUsuarioADesactivar] = useState(null);

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

  const filteredUsuarios = usuarios.filter((usuario) =>
    usuario.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    usuario.correo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    usuario.tipodocumento?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    usuario.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    usuario.estado?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openModal = (usuario) => {
    setUsuarioADesactivar(usuario);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setUsuarioADesactivar(null);
  };

  const desactivarUsuario = async () => {
    try {
      // Realiza la solicitud PUT al endpoint correspondiente
      const response = await fetch(`http://localhost:3000/user/deactivate/${usuarioADesactivar.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ estado: 2 }),
      });

      if (!response.ok) {
        throw new Error('Error al desactivar el usuario');
      }

      // Actualiza la lista de usuarios en el estado
      setUsuarios(usuarios.map(user => 
        user.id === usuarioADesactivar.id ? { ...user, estado: 2 } : user
      ));
      
      closeModal(); // Cierra el modal después de la desactivación
    } catch (error) {
      console.error('Error al desactivar el usuario:', error);
    }
  };

  return (
    <>
      <div className="w-full">
        <Navbar titulo={"Empresarial"} />
      </div>             

      <div className="fixed top-0 left-0 h-full w-64 md:w-72 lg:w-80">
        <SidebarAdmin />
      </div>

      <div className="ml-64 md:ml-72 lg:ml-80 p-4 md:p-6 lg:p-8">
        <div className="bg-[#f5f5f5] p-4 md:p-6 lg:p-8 rounded-lg mb-6">
          <div className="bg-white p-4 md:p-6 lg:p-8 rounded-lg mb-6">
            <h3 className="mb-4 text-lg md:text-xl lg:text-2xl font-semibold">Lista de Usuarios</h3>

            <div className="mb-4">
              <input
                type="text"
                className="w-full md:w-96 p-2 md:p-3 rounded-lg border border-gray-400"
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
                    <table className="w-full table-auto border-collapse">
                      <thead>
                        <tr className="bg-gray-200">
                        <th className="p-2 text-left border-b border-gray-300">id</th>
                        <th className="p-2 text-left border-b border-gray-300">Nombre usuario</th>
                        <th className="p-2 text-left border-b border-gray-300">Correo electrónico</th>
                        <th className="p-2 text-left border-b border-gray-300">tipodocumento</th>
                        <th className="p-2 text-left border-b border-gray-300">Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredUsuarios.map((usuario) => (
                          <tr key={usuario.id} className="border-t">
                         <td className="p-2 border-b border-gray-300">{usuario.id}</td>
                          <td className="p-2 border-b border-gray-300">{usuario.nombre}</td>
                          <td className="p-2 border-b border-gray-300">{usuario.correo}</td>
                          <td className="p-2 border-b border-gray-300">{usuario.tipodocumento}</td>
                            <td className="p-3 border-b">
                              <button className="mr-2 text-blue-500">
                                <i className="bi bi-pencil-square" />
                              </button>
                              <button className="text-red-500" onClick={() => openModal(usuario)}>
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

      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-blanquito p-6 rounded shadow-lg">
            <h2 className="text-xl mb-4">Confirmar Desactivación</h2>
            <p>¿Estás seguro de que deseas desactivar al usuario <strong>{usuarioADesactivar?.nombre}</strong>?</p>
            <div className="mt-4 flex justify-end">
              <button
                className=" text-white px-4 py-2 rounded mr-2"
                onClick={closeModal}
              >
                Cancelar
              </button>
              <button
                className="bg-blueUwu text-blanquito px-4 py-2 rounded"
                onClick={desactivarUsuario}
              >
                Desactivar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TablaEmpresarial;