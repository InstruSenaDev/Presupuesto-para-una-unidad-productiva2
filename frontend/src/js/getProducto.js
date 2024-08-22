// getProducto.js

// Función para obtener los productos del usuario
async function fetchProductos() {
  // Obtén el idusuario desde localStorage
    

  try {
    // Realiza la solicitud GET a la API con el idusuario
    const idusuario = localStorage.getItem("id");
    
    const response = await fetch(
      `http://localhost:3000/traerProductos/${idusuario}`
    );
    console.log('RESPONSEEEEEEEEEEEEEE');
    
    console.log(response);
    
    // if (!idusuario) {
    //   console.error("No se encontró el ID del usuario en localStorage");
    //   return [];
    // }
    const productos = await response.json();
    // const idusuario = localStorage.getItem("idusuario");

    if (!response.ok) {
      throw new Error("Error al obtener productos");
    }

    return productos;
  } catch (error) {
    console.error("Error al realizar la solicitud:", error);
    return [];
  }
}

// Exportamos la función para que sea accesible en el archivo Astro
export { fetchProductos };
