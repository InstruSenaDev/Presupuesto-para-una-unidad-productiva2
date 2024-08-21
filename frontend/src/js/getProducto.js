
// const nombre = document.getElementById("nombre");
// const descripcion = document.getElementById("descripcion");


// const data = {

//     nombre,
//     descripcion,


// }
const idusuario = localStorage.getItem('idusuario');
const productos= [];

async function fetchData() {
    try {
        const productos = await fetch(`http://localhost:3000/traerProductos/${idusuario}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (productos.ok) {
            const data = await productos.json(data);
            console.log("Su solicitud GET ha sido exitosa", data);
            // Aquí puedes hacer algo con los datos, como actualizar el estado en React
        } else {
            console.error("Error en el registro", productos.statusText);
        }
    } catch (error) {
        console.error("Error al enviar la solicitud", error);
    }
}

// Llamar a la función fetchData para obtener los productos
fetchData();
