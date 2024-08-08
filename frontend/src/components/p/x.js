function EnviarCorreo (){
    let parms ={

name: document.getElementById("name").value,
email: document.getElementById("email").value,
subject: document.getElementById("subjec").value,
message: document.getElementById("message").value,     
        
   
    }
emailjs.send("service_vxffcka","template_r71f8nl")
} 