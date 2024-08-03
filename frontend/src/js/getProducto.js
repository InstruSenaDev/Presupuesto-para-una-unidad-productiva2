    try {
    const response = await fetch("http://localhost:3000/traerProductos", {
        method: "GET",
        headers: {
        "Content-Type": "aplication/json",
        },
        body: JSON.stringify(data),
    });
    if (response.ok) {
        console.log("Registro exitoso");
    } else {
        console.error("Error en el registro");
    }
    } catch (error) {
    console.error("Error al enviar la solicitud", error);
    }
