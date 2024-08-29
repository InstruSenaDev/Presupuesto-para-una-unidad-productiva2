const dataBody = document.getElementById('data-body');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
let currentPage = 1;
const limit = 6; // Mostrar solo 6 registros por página
let allData = []; // Aquí guardaremos todos los datos

// Simulación de fetch inicial para obtener todos los datos de una sola vez
function fetchAllData() {
    fetch(`http://localhost:3000/user`)
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
            <td class="p-[10px] border-b border-[#ccc]">${item.nombre}</td>
            <td class="p-[10px] border-b border-[#ccc]">${item.correo}</td>
            <td class="p-[10px] border-b border-[#ccc]">${item.tipodocumento}</td>
            <td class="p-[10px] border-b border-[#ccc]">${item.estado}</td>
            <td>
                <i class="bi bi-pencil-square" title="Editar"></i>
                <i class="bi bi-trash" title="Eliminar" style="margin-left: 6px;"></i>
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

// Lógica para manejar la paginación manual con botones "Anterior" y "Siguiente"
function handlePagination(paginateFunction) {
    paginateFunction(currentPage);
}

function paginate(page) {
    currentPage = page;
    fetchData(currentPage);
}

function createPagination(totalCitas) {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalCitas / limit); i++) {
        pageNumbers.push(i);
    }

    const paginationContainer = document.createElement('nav');
    const paginationList = document.createElement('ul');
    paginationList.className = "pagination";

    const prevListItem = document.createElement('li');
    prevListItem.className = "page-item";
    const prevButton = document.createElement('button');
    prevButton.className = "page-anterior";
    prevButton.textContent = "« Anterior";
    prevButton.disabled = currentPage === 1;
    prevButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            paginate(currentPage);
        }
    });
    prevListItem.appendChild(prevButton);
    paginationList.appendChild(prevListItem);

    pageNumbers.forEach(number => {
        const listItem = document.createElement('li');
        listItem.className = "page-item";
        const pageLink = document.createElement('a');
        pageLink.className = "page-link";
        pageLink.href = "#";
        pageLink.textContent = number;
        pageLink.addEventListener('click', () => {
            paginate(number);
        });
        listItem.appendChild(pageLink);
        paginationList.appendChild(listItem);
    });

    const nextListItem = document.createElement('li');
    nextListItem.className = "page-item";
    const nextButton = document.createElement('button');
    nextButton.className = "page-siguiente";
    nextButton.textContent = "Siguiente »";
    nextButton.disabled = currentPage * limit >= allData.length;
    nextButton.addEventListener('click', () => {
        if (currentPage * limit < allData.length) {
            currentPage++;
            paginate(currentPage);
        }
    });
    nextListItem.appendChild(nextButton);
    paginationList.appendChild(nextListItem);

    paginationContainer.appendChild(paginationList);
    document.body.appendChild(paginationContainer); // Puedes cambiar esto según dónde quieras que aparezca la paginación
}

fetchAllData().then(() => {
    createPagination(allData.length);
});
