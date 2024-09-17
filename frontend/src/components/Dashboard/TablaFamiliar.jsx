import React, { useState, useEffect } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import LayoutN from '../../components/Layout/NabvarSisebar';

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

  // Filtrar usuarios basado en el término de búsqueda con el encadenamiento opcional
  const filteredUsuarios = usuarios.filter((usuario) =>
    usuario.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    usuario.correo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    usuario.tipodocumento?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    usuario.estado?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <LayoutN>
        <div className="ml-[250px] p-[20px]">
          <div className="bg-[#f5f5f5] p-[20px] rounded-[10px] mb-[20px]">
            <div className="bg-white p-[20px] rounded-[10px] mb-[20px]">
              <h3 className="mb-[20px]">Lista de Movimientos</h3>

              <div>
                <input
                  type="text"
                  className="w-[300px] p-[8px] rounded-[5px] border border-[#0e0d0d]"
                  placeholder="Buscar..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />

                {loading ? (
                  <p>Cargando...</p>
                ) : (
                  <>
                    {filteredUsuarios.length > 0 ? (
                      <table className="w-full border-collapse">
                        <thead>
                          <tr>
                            <th className="p-[10px] text-left border-b border-[#ccc]">Nombre usuario</th>
                            <th className="p-[10px] text-left border-b border-[#ccc]">Correo electronico</th>
                            <th className="p-[10px] text-left border-b border-[#ccc]">Tipo documento</th>
                            <th className="p-[10px] text-left border-b border-[#ccc]">Estado</th>
                            <th className="p-[10px] text-left border-b border-[#ccc]">Acciones</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredUsuarios.map((usuario) => ( // Mapeo Filtros Buscador
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
                    ) : (
                      <p>No se encontraron resultados.</p>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </LayoutN>
    </>
  );
};

export default TablaFamiliar;
