function EnviarCorreo(event) {
    event.preventDefault();  // Evita el recargo de la página
    
    let parms = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        subject: document.getElementById("subjec").value,
        message: document.getElementById("message").value,
    };

    emailjs.send("service_fd28oz9", "template_dx4ecid", parms)
    .then(function(response) {
        alert("Email enviado con éxito!");
    }, function(error) {
        alert("Ocurrió un error al enviar el email: " + JSON.stringify(error));
    });
}
