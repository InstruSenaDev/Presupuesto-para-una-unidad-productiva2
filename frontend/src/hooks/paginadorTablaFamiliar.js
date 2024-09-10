const dataBody = document.getElementById('data-body');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
let currentPage = 1;

function fetchData(page) {
    fetch(`/data?page=${page}`)
        .then(response => response.json())
        .then(data => {
            // Limpiar la tabla
            dataBody.innerHTML = '';

            // Llenar la tabla con los datos
            data.forEach(item => {
                const row = document.createElement('tr');

                row.innerHTML = `
                    <td>${item.nombre}</td>
                    <td>${item.correo}</td>
                    <td>${item.tipo}</td>
                    <td>${item.estado}</td>
                    <td>
                        <i class="bi bi-pencil-square" title="Editar"></i>
                        <i class="bi bi-trash" title="Eliminar" style="margin-left: 10px;"></i>
                    </td>
                `;

                dataBody.appendChild(row);
            });

            // Actualizar botones
            updateButtons();
        })
        .catch(error => console.error('Error:', error));
}

function updateButtons() {
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = false; // Implementar lógica para habilitar/deshabilitar
}

prevBtn.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        fetchData(currentPage);
    }
});

nextBtn.addEventListener('click', () => {
    currentPage++;
    fetchData(currentPage);
});

// Inicializar
fetchData(currentPage);