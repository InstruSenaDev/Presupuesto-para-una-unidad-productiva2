const seleccionados = [];
let total = 0;

document.querySelectorAll('.plus-circle').forEach((button) => {
  button.addEventListener('click', () => {
    const index = button.getAttribute('data-index');
    const producto = productos[index];
    const existente = seleccionados.find(item => item.codigo === producto.codigo);
    
    if (existente) {
      existente.cantidad += 1;
    } else {
      seleccionados.push({ ...producto, cantidad: 1 });
    }

    actualizarTotal();
    renderizarSeleccionados();
  });
});

function actualizarTotal() {
  total = seleccionados.reduce((sum, item) => sum + (item.valorunitario * item.cantidad), 0);
  document.getElementById('total-valor').textContent = `Total: $${total.toLocaleString()}`;
}

function renderizarSeleccionados() {
  const lista = document.getElementById('seleccionados-lista');
  lista.innerHTML = '';
  
  seleccionados.forEach(item => {
    const li = document.createElement('li');
    li.classList.add('flex', 'justify-between', 'items-center', 'mb-2');
    
    li.innerHTML = `
      <span>${item.nombre}<br><small class="text-gray-500">${item.cantidad} Unidades x $${item.valorunitario}</small></span>
      <span class="text-indigo-700 font-bold">$${(item.valorunitario * item.cantidad).toLocaleString()}</span>
    `;
    
    lista.appendChild(li);
  });
}