
const openModal = document.getElementById('OPEN');
const closeModal = document.getElementById('CLOSE');
const modal = document.getElementById('MODAL');

openModal.addEventListener('click', () => {
  modal.classList.remove('hidden');
});

closeModal.addEventListener('click', () => {
  modal.classList.add('hidden');
});

// Also, you can add an event to close the modal when clicking outside of it
document.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.add('hidden');
  }
});
