import React, { useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../js/paginadorTablaFamiliar'; // Si este script lo necesitas, tendrías que adaptarlo para React.

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="ml-[250px] p-[20px]">
      <div className="bg-[#f5f5f5] p-[20px] rounded-[10px] mb-[20px]">
        <div className="bg-white p-[20px] rounded-[10px] mb-[20px]">
          <h3 className="mb-[20px]">Lista de Movimientos</h3>

          <div>
            <input
              type="text"
              className="w-[300px] p-[8px] rounded-[5px] border border-[#0e0d0d]"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div>
              <table>
                <thead>
                  <tr>
                    <th>Nombre usuario</th>
                    <th>Correo electrónico</th>
                    <th>Tipo documento</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody id="data-body">
                  {/* Los datos se llenarán aquí */}
                </tbody>
              </table>

              <table>
                <thead>
                  <tr>
                    <th>Nombre usuario</th>
                    <th>Correo electrónico</th>
                    <th>Tipo documento</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody id="data-body">
                  {/* Los datos se llenarán aquí */}
                </tbody>
              </table>

              <div id="data-container"></div>
              <div id="paginator">
                <button id="prev-btn">Anterior</button>
                <button id="next-btn">Siguiente</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
