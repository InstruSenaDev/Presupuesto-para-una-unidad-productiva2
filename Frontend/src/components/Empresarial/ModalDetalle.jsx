// src/components/SomeComponent.js
import React, { useState } from 'react';
import InvoiceDetailModal from './InvoiceDetailModal';

const SomeComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Detalles de ejemplo de la factura
  const invoice = {
    number: '00123',
    date: '2024-09-05',
    customer: 'Juan Pérez',
    description: 'Compra de productos electrónicos',
    total: '150.00'
  };

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  return (
    <div>
      <button
        onClick={toggleModal}
        className="px-4 py-2 bg-blueUwu text-blanquito rounded"
      >
        Ver Detalle de Factura
      </button>
      <InvoiceDetailModal
        isOpen={isModalOpen}
        onClose={toggleModal}
        invoice={invoice}
      />
    </div>
  );
};

export default SomeComponent;
