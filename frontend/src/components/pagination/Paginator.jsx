//import React, { useEffect, useState } from 'react';
//import Pagination from '../../components/pagination/Paginator'; // Ajusta la ruta según la ubicación de tu archivo

const limit = 4; // Mostrar solo 4 registros por página

const PaginatedTable = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchAllData();
  }, []);

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const fetchAllData = async () => {
    try {
      const response = await fetch('http://localhost:3000/user');
      const result = await response.json();
      setData(result);
      setTotalPages(Math.ceil(result.length / limit));
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchData = (page) => {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    return data.slice(startIndex, endIndex);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const paginatedData = fetchData(currentPage);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th className="p-[10px] border-b border-[#ccc]">Nombre</th>
            <th className="p-[10px] border-b border-[#ccc]">Correo</th>
            <th className="p-[10px] border-b border-[#ccc]">Tipo Documento</th>
            <th className="p-[10px] border-b border-[#ccc]">Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody id="data-body">
          {paginatedData.map((item, index) => (
            <tr key={index}>
              <td className="p-[10px] border-b border-[#ccc]">{item.nombre}</td>
              <td className="p-[10px] border-b border-[#ccc]">{item.correo}</td>
              <td className="p-[10px] border-b border-[#ccc]">{item.tipodocumento}</td>
              <td className="p-[10px] border-b border-[#ccc]">{item.estado}</td>
              <td>
                <i className="bi bi-pencil-square" title="Editar"></i>
                <i className="bi bi-trash" title="Eliminar" style={{ marginLeft: '6px' }}></i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        nextPage={nextPage}
        prevPage={prevPage}
      />
    </div>
  );
};

export default PaginatedTable;
