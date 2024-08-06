async function fetchData() {
    try {
        const response = await fetch("http://localhost:3000/traerProductos", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });

        if (response.ok) {
            const data = await response.json();
            console.log("Su solicitud GET ha sido exitosa", data);
            // Aquí puedes hacer algo con los datos, como actualizar el estado en React
        } else {
            console.error("Error en el registro", response.statusText);
        }
    } catch (error) {
        console.error("Error al enviar la solicitud", error);
    }
}

// Llamar a la función fetchData para obtener los productos
fetchData();
