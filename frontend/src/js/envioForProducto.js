const form = document.getElementById("formularioProducto");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombreProducto").value;
    const descripcion = document.getElementById("descripcion").value;
    const valorunitario = document.getElementById("valorunitario").value;
    const codigo = document.getElementById("codigo").value;

    const productosData = {
        nombre,
        descripcion,
        valorunitario,
        codigo
    };

    console.log(productosData);

    try {
        const response = await fetch("http://localhost:3000/productos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(productosData)
        });

        if (response.ok) {
            console.log("Registro exitoso");
        } else {
            console.error("Error en el registro");
        }
    } catch (error) {
        console.error("Error al enviar la solicitud:", error);
    }
});
