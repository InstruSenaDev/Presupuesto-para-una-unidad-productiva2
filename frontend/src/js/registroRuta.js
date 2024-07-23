
 
 try {
    const response = await fetch('http://localhost:3000/registro', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if (response.ok) {
        console.log('Registro exitoso');
    } else {
        console.error('Error en el registro');
    }
} catch (error) {
    console.error('Error al enviar la solicitud:', error);
}
