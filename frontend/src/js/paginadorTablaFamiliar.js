const dataBody = document.getElementById('data-body');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
let currentPage = 1;
const limit = 5; // Mostrar solo 5 registros por página
let allData = []; // Aquí guardaremos todos los datos

// Simulación de fetch inicial para obtener todos los datos de una sola vez
function fetchAllData() {
    fetch(`/user`)
        .then(response => response.json())
        .then(data => {
            allData = data;
            fetchData(currentPage);
        })
        .catch(error => console.error('Error:', error));
}

function fetchData(page) {
    // Calcular el inicio y fin de los datos para la página actual
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedData = allData.slice(startIndex, endIndex);

    // Limpiar la tabla
    dataBody.innerHTML = '';

    // Llenar la tabla con los datos paginados
    paginatedData.forEach(item => {
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
}

function updateButtons() {
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage * limit >= allData.length; // Deshabilitar si no hay más datos
}

prevBtn.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        fetchData(currentPage);
    }
});

nextBtn.addEventListener('click', () => {
    if (currentPage * limit < allData.length) {
        currentPage++;
        fetchData(currentPage);
    }
});

// Inicializar
fetchAllData();
