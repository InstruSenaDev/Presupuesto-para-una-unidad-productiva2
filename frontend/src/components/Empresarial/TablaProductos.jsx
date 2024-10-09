import React, { useState, useEffect } from "react";
import usePago from '../../hooks/usePostPago'; // Hook personalizado
import ModalProducto from '../../hooks/useNuevoProducto'; // Modal de nuevo producto
import 'bootstrap-icons/font/bootstrap-icons.css';

function Productos() {
  const [productos, setProductos] = useState([]);
  const [seleccionados, setSeleccionados] = useState([]);
  const [total, setTotal] = useState(0);
  const [idusuario, setIdusuario] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar el modal

  useEffect(() => {
    // Obtener el ID almacenado en localStorage
    const storedId = localStorage.getItem("id");

    // Manejar caso donde el valor no está o no es JSON válido
    let id = null;
    try {
      id = storedId ? JSON.parse(storedId) : null;
    } catch (error) {
      console.error("Error al parsear el ID de usuario:", error);
    }

    setIdusuario(id);

    // Si el ID es nulo o inválido
    if (!id) {
      console.error("El usuario no tiene un ID válido.");
      alert("Por favor, inicia sesión para continuar.");
      window.location = '/'; // Redirigir al login
      return;
    }

    // Función para obtener productos si el ID es válido
    const fetchProductos = async () => {
      try {

        const response = await fetch(`http://localhost:3000/traerProductos/${id}`, {
          method:
            "GET"
          ,
          headers:{
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        } );
        if (!response.ok) {
          throw new Error(`Error HTTP! status: ${response.status}`);
        }
        const data = await response.json();
        setProductos(data);
      } catch (error) {
        alert("Error al obtener productos. Inténtalo de nuevo más tarde.");
        console.error("Error al obtener productos:", error);
      }
    };

    fetchProductos();
  }, []);

  useEffect(() => {
    const nuevoTotal = seleccionados.reduce(
      (sum, item) => sum + item.valorunitario * item.cantidad,
      0
    );
    setTotal(nuevoTotal);
  }, [seleccionados]);

  const agregarProducto = (index) => {
    const producto = productos[index];
    const existe = seleccionados.find(item => item.codigo === producto.codigo);

    if (existe) {
      setSeleccionados((prevSeleccionados) =>
        prevSeleccionados.map((item) =>
          item.codigo === producto.codigo
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        )
      );
    } else {
      setSeleccionados((prevSeleccionados) => [
        ...prevSeleccionados,
        { ...producto, cantidad: 1 },
      ]);
    }
  };

  const quitarProducto = (index) => {
    const producto = seleccionados[index];
    if (producto.cantidad > 1) {
      setSeleccionados((prevSeleccionados) =>
        prevSeleccionados.map((item, i) =>
          i === index ? { ...item, cantidad: item.cantidad - 1 } : item
        )
      );
    } else {
      setSeleccionados((prevSeleccionados) =>
        prevSeleccionados.filter((_, i) => i !== index)
      );
    }
  };

  const { handlePago, modalVisible, resetSeleccionados, loading } = usePago(idusuario, seleccionados, total, setSeleccionados, setTotal);

  return (
    <div className=" flex justify-between lg:flex-row flex-col  ">
      <div className="bg-white rounded-t-lg shadow-md p-2 w-full  lg:w-2/3">
        <div>
          <button className="text-blanquito px-4 py-2 rounded-md bg-negro mb-2 lg:mb-0"
            onClick={() => window.location = '/Presupuestos'}>
            <i name="arrow-back" color="#ffffff"></i> Volver
          </button>
          <button className="items-center text-blanquito px-4 py-2 rounded-md bg-negro"
            onClick={() => setIsModalOpen(true)} // Abrir el modal al hacer clic
          >
            Nuevo <i className="items-center" name="plus-circle" color="#ffffff"></i>
          </button>
          <input
            type="text"
            placeholder="Buscar productos"
            className="border rounded-md px-4 py-2 w-1/3"
          />
        </div>
        <table className="w-full">
          <thead>
            <tr className="text-left text-indigo-700">
              <th className="text-center p-2 text-2xl font-bold">Nombre</th>
              <th className="text-center p-2 text-2xl font-bold">Precio</th>
              <th className="text-center p-2 text-2xl font-bold">Número de recibo</th>
              <th className="text-center p-2 text-2xl font-bold">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center p-2">
                  No hay productos disponibles
                </td>
              </tr>
            ) : (
              productos.map((producto, index) => (
                <tr className="border-t" key={producto.codigo}>
                  <td className="text-center p-2">{producto.nombre}</td>
                  <td className="text-center p-2">${producto.valorunitario}</td>
                  <td className="text-center p-2">{producto.codigo}</td>
                  <td className="text-center pl-2">
                    <button
                      className="text-center font-bold bi bi-plus-circle"
                      onClick={() => agregarProducto(index)}
                    ></button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="bg-white rounded-lg shadow-md w-full lg:w-1/3">
        <h2 className="bg-blueUwu text-xl text-center text-blanquito font-bold mb-4 py-2 px-4 rounded-t-lg">
          Seleccionados
        </h2>
        <ul className="p-6">
          {seleccionados.map((item, index) => (
            <li className="flex justify-between items-center mb-2" key={index}>
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
              <button
                className="text-center font-bold bi bi-dash"
                onClick={() => quitarProducto(index)}
              ></button>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex justify-between items-center bg-gris">
          <button
            className="bg-negro text-blanquito px-4 py-2 rounded-md"
            onClick={handlePago}
            disabled={loading}
          >
            <i className="bi bi-currency-dollar"></i> Pagar
          </button>
          <span className="pl-3 text-indigo-700 font-bold">
            Total: ${total.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Modal de agregar producto */}
      <ModalProducto
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)} // Función para cerrar el modal
      />

      {modalVisible && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-md text-center">
            <h3 className="text-lg font-bold mb-4">¿Deseas realizar otra venta?</h3>
            <div className="flex justify-center space-x-4">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-md"
                onClick={resetSeleccionados}
              >
                Sí
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md"
                onClick={() => window.location = '/ventas'}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Productos;


// import React, { useState, useEffect } from "react";
// import { jsPDF } from "jspdf"; // Importa jsPDF
// import usePago from '../../hooks/usePostPago'; // Hook personalizado
// import ModalProducto from '../../hooks/useNuevoProducto'; // Modal de nuevo producto
// import 'bootstrap-icons/font/bootstrap-icons.css';

// function Productos() {
//   const [productos, setProductos] = useState([]);
//   const [seleccionados, setSeleccionados] = useState([]);
//   const [total, setTotal] = useState(0);
//   const [idusuario, setIdusuario] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar el modal

//   // Recuperar productos seleccionados desde el localStorage al cargar la página
//   useEffect(() => {
//     const storedSeleccionados = localStorage.getItem("seleccionados");
//     if (storedSeleccionados) {
//       setSeleccionados(JSON.parse(storedSeleccionados));
//     }
//   }, []);

//   // Guardar productos seleccionados en el localStorage cuando cambien
//   useEffect(() => {
//     localStorage.setItem("seleccionados", JSON.stringify(seleccionados));
//   }, [seleccionados]);

//   useEffect(() => {
//     const storedId = localStorage.getItem("id");
//     let id = null;
//     try {
//       id = storedId ? JSON.parse(storedId) : null;
//     } catch (error) {
//       console.error("Error al parsear el ID de usuario:", error);
//     }
//     setIdusuario(id);

//     if (!id) {
//       console.error("El usuario no tiene un ID válido.");
//       alert("Por favor, inicia sesión para continuar.");
//       window.location = '/';
//       return;
//     }

//     const fetchProductos = async () => {
//       try {
//         const response = await fetch(`http://localhost:3000/traerProductos/${id}`, {
//           method: "GET",
//           headers: { 'Content-Type': 'application/json' },
//           credentials: 'include',
//         });
//         if (!response.ok) {
//           throw new Error(`Error HTTP! status: ${response.status}`);
//         }
//         const data = await response.json();
//         setProductos(data);
//       } catch (error) {
//         alert("Error al obtener productos. Inténtalo de nuevo más tarde.");
//         console.error("Error al obtener productos:", error);
//       }
//     };

//     fetchProductos();
//   }, []);

//   useEffect(() => {
//     const nuevoTotal = seleccionados.reduce(
//       (sum, item) => sum + item.valorunitario * item.cantidad,
//       0
//     );
//     setTotal(nuevoTotal);
//   }, [seleccionados]);

//   const agregarProducto = (index) => {
//     const producto = productos[index];
//     const existe = seleccionados.find(item => item.codigo === producto.codigo);

//     if (existe) {
//       setSeleccionados((prevSeleccionados) =>
//         prevSeleccionados.map((item) =>
//           item.codigo === producto.codigo
//             ? { ...item, cantidad: item.cantidad + 1 }
//             : item
//         )
//       );
//     } else {
//       setSeleccionados((prevSeleccionados) => [
//         ...prevSeleccionados,
//         { ...producto, cantidad: 1 },
//       ]);
//     }
//   };

//   const quitarProducto = (index) => {
//     const producto = seleccionados[index];
//     if (producto.cantidad > 1) {
//       setSeleccionados((prevSeleccionados) =>
//         prevSeleccionados.map((item, i) =>
//           i === index ? { ...item, cantidad: item.cantidad - 1 } : item
//         )
//       );
//     } else {
//       setSeleccionados((prevSeleccionados) =>
//         prevSeleccionados.filter((_, i) => i !== index)
//       );
//     }
//   };

//   const descargarLista = () => {
//     const doc = new jsPDF();
//     doc.setFontSize(12);
//     doc.text("Lista de Productos Seleccionados", 10, 10);

//     // Agregar encabezados para las columnas
//     const headers = ["Nombre", "Descripción", "Código", "Valor Unitario", "Cantidad"];
//     const startY = 20;
//     const margin = 10;
//     let y = startY;

//     headers.forEach((header, index) => {
//       doc.text(header, 10 + index * 40, y); // Distribuir los encabezados en el PDF
//     });

//     y += margin;

//     seleccionados.forEach((item) => {
//       const text = [
//         item.nombre,
//         item.descripcion, // Asegúrate de que este campo exista en el objeto
//         item.codigo,
//         `$${item.valorunitario.toFixed(2)}`,
//         item.cantidad
//       ];
//       text.forEach((line, index) => {
//         doc.text(line, 10 + index * 40, y); // Distribuir los valores en el PDF
//       });
//       y += margin;
//     });

//     doc.save("lista_productos.pdf");
//   };

//   const recargarPagina = () => {
//     window.location.reload();
//   };

//   const { handlePago, modalVisible, resetSeleccionados, loading } = usePago(idusuario, seleccionados, total, setSeleccionados, setTotal);

//   return (
//     <div className="flex justify-between lg:flex-row flex-col">
//       <div className="bg-white rounded-t-lg shadow-md p-2 w-full lg:w-2/3">
//         <div className="flex items-center space-x-2">
//           <button className="text-blanquito px-1 py-1 rounded-md bg-negro mb lg:mb-0" onClick={() => window.location = '/Presupuestos'}>
//             <i className="bi bi-arrow-left" color="#ffffff"></i> Volver
//           </button>

//           <button className="items-center text-blanquito px-1 py-1  rounded-md bg-negro" onClick={() => setIsModalOpen(true)}>
//             <i className="bi bi-plus-circle" color="#ffffff"></i>Nuevo
//           </button>

//           <button className="text-blanquito px-1 py-1 rounded-md bg-negro" onClick={recargarPagina}>
//             <i className="bi bi-arrow-clockwise"></i> Recargar
//           </button>

//           <button className="text-blanquito px-1 py-1 rounded-md bg-negro" onClick={descargarLista}>
//             <i className="bi bi-download"></i> Descargar Lista, debes seleccionar los productos
//           </button>

//           <input type="text" placeholder="Buscar productos" className="border rounded-md px-1 py-1 w-1/3" />
//         </div>

//         <table className="w-full mt-4">
//           <thead>
//             <tr className="text-left text-indigo-700">
//               <th className="text-center p-2 text-2xl font-bold">Nombre</th>
//               <th className="text-center p-2 text-2xl font-bold">Precio</th>
//               <th className="text-center p-2 text-2xl font-bold">Código</th>
//               <th className="text-center p-2 text-2xl font-bold">Acciones</th>
//             </tr>
//           </thead>
//           <tbody>
//             {productos.length === 0 ? (
//               <tr>
//                 <td colSpan="4" className="text-center p-2">
//                   No hay productos disponibles
//                 </td>
//               </tr>
//             ) : (
//               productos.map((producto, index) => (
//                 <tr className="border-t" key={producto.codigo}>
//                   <td className="text-center p-2">{producto.nombre}</td>
//                   <td className="text-center p-2">${producto.valorunitario}</td>
//                   <td className="text-center p-2">{producto.codigo}</td>
//                   <td className="text-center">
//                     <button className="text-center font-bold bi bi-plus-circle" onClick={() => agregarProducto(index)}></button>
//                     <button className="text-center font-bold bi bi-dash" onClick={() => quitarProducto(index)}></button>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>

//       <div className="bg-white rounded-lg shadow-md w-full lg:w-1/3">
//         <h2 className="bg-blueUwu text-xl text-center text-blanquito font-bold mb-4 py-2 px-4 rounded-t-lg">
//           Seleccionados
//         </h2>
//         <ul className="p-6">
//           {seleccionados.map((item, index) => (
//             <li className="flex justify-between items-center mb-2" key={index}>
//               <span>
//                 {item.nombre}
//                 <br />
//                 <small className="text-gray-500">
//                   {item.cantidad} Unidades x ${item.valorunitario}
//                 </small>
//               </span>
//               <span className="text-indigo-700 font-bold">
//                 ${item.valorunitario * item.cantidad}
//               </span>
//               <button className="text-center font-bold bi bi-dash" onClick={() => quitarProducto(index)}></button>
//             </li>
//           ))}
//         </ul>
//         <div className="mt-4 flex justify-between items-center bg-gris">
//           <button className="bg-negro text-blanquito py-2 px-4 rounded-md" onClick={handlePago} disabled={loading}>
//             {loading ? "Cargando..." : "Pagar"}
//           </button>
//           <h3 className="text-xl font-bold">
//             Total: ${total.toFixed(2)}
//           </h3>
//         </div>
//       </div>

//       {/* Modal para agregar un nuevo producto */}
//       <ModalProducto isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
//     </div>
//   );
// }

// export default Productos;
