////validacion de modales nuevo presupuesto
document.addEventListener("DOMContentLoaded", function () {
    const saldoInput = document.getElementById("saldo");
    const descripcionInput = document.getElementById("descripcion");
    const saldoError = document.getElementById("saldoError");
    const descripcionError = document.getElementById("descripcionError");
    const cuartoSiguienteBtn = document.getElementById("cuartoSiguienteBtn");

    // Validar que solo se ingresen números en el campo de saldo
    saldoInput.addEventListener("input", function () {
        const saldoValue = saldoInput.value.trim();
        if (!/^\d*$/.test(saldoValue)) {
            saldoError.textContent = "Solo se permiten números en este campo.";
            saldoInput.value = saldoValue.replace(/\D/g, ""); // Elimina cualquier caracter no numérico
        } else {
            saldoError.textContent = ""; // Limpiar el error si la validación es exitosa
        }
    });

    // Validar que solo se ingresen letras en el campo de descripción
    descripcionInput.addEventListener("input", function () {
        const descripcionValue = descripcionInput.value.trim();
        if (!/^[A-Za-z\s]*$/.test(descripcionValue)) {
            descripcionError.textContent = "Solo se permiten letras en este.";
            descripcionInput.value = descripcionValue.replace(/[^A-Za-z\s]/g, ""); // Elimina cualquier caracter que no sea letra o espacio
        } else {
            descripcionError.textContent = ""; // Limpiar el error si la validación es exitosa
        }
    });

    // Manejar el clic en el botón "Siguiente"
    cuartoSiguienteBtn.addEventListener("click", function (event) {
        let valid = true;

        // Validar saldo nuevamente antes de enviar
        if (!saldoInput.value.trim() || saldoError.textContent !== "") {
            valid = false;
            saldoError.textContent = "Ingrese un saldo válido.";
        }

        // Validar descripción nuevamente antes de enviar
        if (!descripcionInput.value.trim() || descripcionError.textContent !== "") {
            valid = false;
            descripcionError.textContent = "Ingrese una descripción válida.";
        }

        if (valid) {
            // Aquí puedes manejar la lógica para el siguiente paso
            console.log("Formulario válido. Procediendo al siguiente paso...");
        } else {
            event.preventDefault();
            console.log("Hay errores en el formulario.");
        }
    });
});

////////secuencia de los modales 

document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('modal');
    const secondModal = document.getElementById('secondModal');
    const thirdModal = document.getElementById('thirdModal');
    const fourthModal = document.getElementById('fourthModal');
    const alertModal = document.getElementById('alertModal'); // Modal para alertas
    const openModalBtn = document.getElementById('openModalBtn');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const closeSecondModalBtn = document.getElementById('closeSecondModalBtn');
    const closeThirdModalBtn = document.getElementById('closeThirdModalBtn');
    const closeFourthModalBtn = document.getElementById('closeFourthModalBtn');
    const siguienteBtn = document.getElementById('siguienteBtn');
    const segundoSiguienteBtn = document.getElementById('segundoSiguienteBtn');
    const terceroSiguienteBtn = document.getElementById('terceroSiguienteBtn');
    const cuartoSiguienteBtn = document.getElementById('cuartoSiguienteBtn');
    const alertSiBtn = document.getElementById('alertSiBtn');
    const alertNoBtn = document.getElementById('alertNoBtn');

    function openModal(modalElement) {
      modalElement.classList.remove('hidden');
    }

    function closeModal(modalElement) {
      modalElement.classList.add('hidden');
    }

    openModalBtn.addEventListener('click', () => openModal(modal));
    closeModalBtn.addEventListener('click', () => closeModal(modal));
    closeSecondModalBtn.addEventListener('click', () => closeModal(secondModal));
    closeThirdModalBtn.addEventListener('click', () => closeModal(thirdModal));
    closeFourthModalBtn.addEventListener('click', () => closeModal(fourthModal));

    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        closeModal(modal);
      }
    });

    secondModal.addEventListener('click', function(e) {
      if (e.target === secondModal) {
        closeModal(secondModal);
      }
    });

    thirdModal.addEventListener('click', function(e) {
      if (e.target === thirdModal) {
        closeModal(thirdModal);
      }
    });

    fourthModal.addEventListener('click', function(e) {
      if (e.target === fourthModal) {
        closeModal(fourthModal);
      }
    });

    siguienteBtn.addEventListener('click', function() {
      closeModal(modal);
      openModal(secondModal);
    });

    segundoSiguienteBtn.addEventListener('click', function() {
      closeModal(secondModal);
      openModal(thirdModal);
    });

    terceroSiguienteBtn.addEventListener('click', function() {
      closeModal(thirdModal);
      openModal(fourthModal);
    });

    cuartoSiguienteBtn.addEventListener('click', function() {
      const saldo = document.getElementById('saldo').value;
      const descripcion = document.getElementById('descripcion').value;
      console.log('Saldo:', saldo);
      console.log('Descripción:', descripcion);
      closeModal(fourthModal);
      openModal(alertModal);
    });

    alertSiBtn.addEventListener('click', function() {
      closeModal(alertModal);
      openModal(modal);
    });

    alertNoBtn.addEventListener('click', function() {
      // Aquí puedes agregar la lógica adicional que necesites
      closeModal(alertModal);
    });

  });