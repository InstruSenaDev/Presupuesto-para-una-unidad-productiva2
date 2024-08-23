import React, { useState, useEffect } from 'react';

function Productos() {
  const [productos, setProductos] = useState([]);
  const [seleccionados, setSeleccionados] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchProductos = async () => {
      const idusuario = localStorage.getItem('id'); // Recuperar el ID del localStorage
      console.log('ID de usuario desde localStorage:', idusuario); // Verificar que el ID se ha recuperado correctamente

      if (!idusuario) {
        console.log('ID de usuario no encontrado en localStorage', idusuario);
        alert('ID de usuario no encontrado. Por favor, inicia sesión de nuevo.');
        return;
      }

      try {
        // Asegúrate de que la URL incluya el ID del usuario
        const response = await fetch(`http://localhost:3000/traerProductos/${idusuario}`);
        console.log('Estado de la respuesta:', response.status);
        

        if (response.status === 404) {
          console.log('No se encontraron productos');
          alert('No se encontraron productos para este usuario.');
          setProductos([]);
          return;
        }

        if (!response.ok) {
          throw new Error(`Error HTTP! status: ${response.status}`);
        }

        const data = await response.json(); // Convertir la respuesta en JSON
        console.log('Productos recibidos:', data); // Verificar los productos recibidos
        setProductos(data); // Actualizar el estado de productos
      } catch (error) {
        console.error('Error al obtener productos:', error);
        alert('Error al obtener productos. Inténtalo de nuevo más tarde.');
      }
    };

    fetchProductos();
  }, []); // Ejecutar solo una vez al cargar el componente

  const actualizarTotal = (seleccionados) => {
    const nuevoTotal = seleccionados.reduce(
      (sum, item) => sum + item.valorunitario * item.cantidad,
      0
    );
    setTotal(nuevoTotal);
  };

  const agregarProducto = (index) => {
    const producto = productos[index];
    const existe = seleccionados.find(item => item.codigo === producto.codigo);

    if (existe) {
      existe.cantidad += 1;
    } else {
      setSeleccionados(prevSeleccionados => [...prevSeleccionados, { ...producto, cantidad: 1 }]);
    }

    actualizarTotal(seleccionados);
  };

  return (
    <div>
      {/* Tabla para mostrar los productos */}
      <div className="bg-white rounded-lg shadow-md p-2 w-full">
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
            {productos.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center p-2">No hay productos disponibles</td>
              </tr>
            ) : (
              productos.map((producto, index) => (
                <tr id={id} className="border-t" key={producto.codigo}>
                  <td className="text-center p-2">{producto.nombre}</td>
                  <td className="text-center p-2">{producto.codigo}</td>
                  <td className="text-center p-2">${producto.valorunitario}</td>
                  <td className="text-center p-2">{producto.estado}</td>
                  <td className="text-center pl-2">
                    <button
                      className="text-center font-bold plus-circle"
                      onClick={() => agregarProducto(index)}
                    >
                      <i className="bi bi-plus-circle" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Tabla de productos seleccionados */}
      <div className="bg-white rounded-lg shadow-md w-96">
        <h2 className="bg-blueUwu text-xl text-center text-white font-bold mb-4 bg-indigo-700 text-white py-2 px-4 rounded-t-lg">
          Seleccionados
        </h2>
        <ul id="seleccionados-lista" className="p-6">
          {seleccionados.map((item, index) => (
            <li className="flex justify-between items-center mb-2" key={index}>
              <span>
                {item.nombre}<br />
                <small className="text-gray-500">{item.cantidad} Unidades x ${item.valorunitario}</small>
              </span>
              <span className="text-indigo-700 font-bold">
                ${item.valorunitario * item.cantidad}
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex justify-between items-center bg-gris">
          <button className="bg-negro text-white px-4 py-2 rounded-md">
            <i className="bi bi-currency-dollar"></i>Pagar
          </button>
          <span id="total-valor" className="pl-3 text-indigo-700 font-bold">
            Total: ${total.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Productos;
