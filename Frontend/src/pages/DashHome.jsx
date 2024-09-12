import React from 'react';
import 'boxicons'; // Para poder utilizar los íconos de Boxicons
import Navbar from '../components/Navbar/Navbar';
import SidebarAdmin from '../components/Sidebar/SidebarAdmin';

const UserTable = () => {
  const users = [
    { name: 'Damian felipe', email: 'Damian@gmaeil.com', phone: '312-547-854', status: 'Activo' },
    { name: 'Jairo varela', email: 'Jairo@gmaeil.com', phone: '314-214-789', status: 'Inactivo' },
    { name: 'Camilo sanchez', email: 'Camilo@gmaeil .com', phone: '318-547-625', status: 'Activo' },
    { name: 'julieta castro', email: 'julieta@gmaeil.com', phone: '313-547-854', status: 'Inactivo' },
    { name: 'david guzman', email: 'david@gmaeil.com', phone: '316-547-854', status: 'Activo' },
    { name: 'Daniel benabidez', email: 'Daniel@gmaeil.com', phone: '318-547-854', status: 'Inactivo' }
  ];

  return (
<>

<div className="">
  <Navbar titulo={"Home administrador"} />
</div>             

<div className="Si fixed top-0 left-0 h-full">
  <SidebarAdmin />
</div> 

    <div className="p-24 ml-44">
      <input
        type="text"
        placeholder="Search"
        className="mb-4 px-4 py-2 border rounded w-full max-w-md"
      />
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Nombre</th>
            <th className="py-2 px-4 border-b">Correo electronico</th>
            
            <th className="py-2 px-4 border-b">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b">{user.name}</td>
              <td className="py-2 px-4 border-b">{user.email}</td>
              
              <td className="py-2 px-4 border-b flex justify-center items-center">
                <button className="text-blue-500 hover:text-blue-700 mr-2">
                  <box-icon name="edit-alt" />
                </button>
                <button className="text-red-500 hover:text-red-700">
                  <box-icon name="trash-alt" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    </>
  );
};

export default UserTable;
