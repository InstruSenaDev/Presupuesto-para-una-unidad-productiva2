// modal perfil cliente
document.addEventListener("DOMContentLoaded", function () {
    const Nombre = localStorage.getItem("nombre");
    const nombre = localStorage.getItem("nombre");
    const correo = localStorage.getItem("correo");
    const tipoDc = localStorage.getItem("tipoDc");
    const numeroDc = localStorage.getItem("numeroDc");

    if (Nombre ||correo  ||  nombre || tipoDc || numeroDc) {
      document.getElementById("nombre").textContent = nombre;
      document.getElementById("Nombre").textContent = Nombre;
      document.getElementById("correo").textContent = correo;
      document.getElementById("tipoDc").textContent = tipoDc;
      document.getElementById("numeroDc").textContent = numeroDc;
    } else {
      document.getElementById("Nombre").textContent = "Usuario desconocido";
      document.getElementById("nombre").textContent = "Usuario desconocido";
      document.getElementById("correo").textContent = "Usuario desconocido";
      document.getElementById("tipoDc").textContent = "Usuario desconocido";
      document.getElementById("numeroDc").textContent = "Usuario desconocido";
    }
  });

//codigo de modal perfil cliente
  document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('MODAL-');
    const openModalBtn = document.getElementById('OPEN-');
    const closeModalBtn = document.getElementById('CLOSE-');
    
  
    function openModal() {
      modal.classList.remove('hidden');
    }
  
    function closeModal() {
      modal.classList.add('hidden');
    }
  
    openModalBtn.addEventListener('click', openModal);
  
    closeModalBtn.addEventListener('click', closeModal);
  
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        closeModal();
      }
    });
  
    
  });