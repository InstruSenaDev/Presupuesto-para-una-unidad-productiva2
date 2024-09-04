import React, { useState, useEffect } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';

const TablaProductos = ({ idusuario }) => {
  const [productos, setProductos] = useState([]);
  const [seleccionados, setSeleccionados] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch(`http://localhost:3000/traerProductos/${idusuario}`);
        const data = await response.json();
        setProductos(data);
      } catch (error) {
        console.error('Error al traer los productos:', error);
      }
    };

    fetchProductos();
  }, [idusuario]);

  const handleAgregarProducto = (index) => {
    const producto = productos[index];
    const existente = seleccionados.find(item => item.codigo === producto.codigo);

    if (existente) {
      setSeleccionados(seleccionados.map(item => 
        item.codigo === producto.codigo 
          ? { ...item, cantidad: item.cantidad + 1 } 
          : item
      ));
    } else {
      setSeleccionados([...seleccionados, { ...producto, cantidad: 1 }]);
    }

    actualizarTotal();
  };

  const actualizarTotal = () => {
    const nuevoTotal = seleccionados.reduce(
      (sum, item) => sum + item.valorunitario * item.cantidad,
      0
    );
    setTotal(nuevoTotal);
  };

  useEffect(() => {
    actualizarTotal();
  }, [seleccionados]);

  const renderizarSeleccionados = () => {
    return seleccionados.map((item, index) => (
      <li key={index} className="flex justify-between items-center mb-2">
        <span>
          {item.nombre}
          <br />
          <small className="text-gray-500">
            {item.cantidad} Unidades x ${item.valorunitario}
          </small>
        </span>
        <span className="text-indigo-700 font-bold">
          ${item.valorunitario * item.cantidad}
        </span>
      </li>
    ));
  };

  return (
    <div className="flex flex-col lg:flex-row justify-between">
      {/* Tabla de productos registrados */}
      <div className="bg-white rounded-lg shadow-md p-2 w-full lg:w-2/3">
        <table className="w-full">
          <thead>
            <tr className="text-left text-indigo-700">
              <th className="text-center p-2 text-2xl font-bold">Nombre</th>
              <th className="text-center p-2 text-2xl font-bold">Numero de recibo</th>
              <th className="text-center p-2 text-2xl font-bold">Precio</th>
              <th className="text-center p-2 text-2xl font-bold">Estado</th>
              <th className="text-center p-2 text-2xl font-bold">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((producto, index) => (
              <tr key={index} className="border-t">
                <td className="text-center p-2">{producto.nombre}</td>
                <td className="text-center p-2">{producto.codigo}</td>
                <td className="text-center p-2">{producto.valorunitario}</td>
                <td className="text-center p-2">{producto.estado}</td>
                <td className="text-center pl-2">
                  <button
                    className="text-center font-bold plus-circle"
                    onClick={() => handleAgregarProducto(index)}
                  >
                    <i className="bi bi-plus-circle" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Tabla de productos seleccionados */}
      <div className="bg-white rounded-lg shadow-md w-full lg:w-1/3 mt-4 lg:mt-0 lg:ml-4">
        <h2 className="bg-blueUwu text-xl text-center text-white font-bold mb-4 bg-indigo-700 text-white py-2 px-4 rounded-t-lg">
          Seleccionados
        </h2>
        <ul id="seleccionados-lista" className="p-6">
          {renderizarSeleccionados()}
        </ul>
        <div className="mt-4 flex justify-between items-center bg-gris p-4">
          <button className="bg-negro text-blanquito text-white px-4 py-2 rounded-md">
            <i className="bi bi-currency-dollar"></i>Pagar
          </button>
          <span id="total-valor" className="pl-3 text-indigo-700 font-bold">
            Total: ${total.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TablaProductos;
