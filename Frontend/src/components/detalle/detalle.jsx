// src/components/InvoiceDetailModal.js
import React from 'react';
import { XCircle } from 'react-bootstrap-icons';

const InvoiceDetailModal = ({ isOpen, onClose, invoice }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center">
      <div className="relative bg-white w-full max-w-lg mx-4 rounded-lg shadow-xl">
        <div className="flex justify-between items-center bg-blueUwu text-blanquito p-4 rounded-t-lg">
          <h2 className="text-xl font-semibold">Detalle de la Factura</h2>
          <button
            onClick={onClose}
            className="focus:outline-none focus:ring-2 focus:ring-blanquito rounded-full p-1"
            aria-label="Close modal"
          >
            <XCircle className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6 bg-blanquito">
          <div className="space-y-2 text-gray-700">
            <div><strong>Factura No:</strong> {invoice.number}</div>
            <div><strong>Fecha:</strong> {invoice.date}</div>
            <div><strong>Cliente:</strong> {invoice.customer}</div>
            <div><strong>Descripción:</strong> {invoice.description}</div>
            <div><strong>Total:</strong> ${invoice.total}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetailModal;
