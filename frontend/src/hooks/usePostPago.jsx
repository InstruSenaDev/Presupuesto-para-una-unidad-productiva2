import { useState } from 'react';

const usePago = (idusuario, seleccionados, total, setSeleccionados, setTotal) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    const handlePago = async () => {
        if (seleccionados.length === 0) {
            alert("No hay productos seleccionados");
            return;
        }

        try {
            setLoading(true);
            const response = await fetch("http://localhost:3000/postPago", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    idusuario, // El ID del usuario guardado en localStorage
                    seleccionados, // El array de productos seleccionados
                    total, // El total calculado de la compra de los productos
                }),
            });

            if (response.ok) {
                const data = await response.json();
                alert(`Pago realizado con éxito. Número de factura: ${data.numerofactura}`);

                // Mostrar modal para realizar otra venta
                setModalVisible(true);
            } else {
                alert("Error al procesar el pago");
            }
        } catch (error) {
            console.error("Error al realizar el pago:", error);
            alert("Error en la solicitud. Intenta de nuevo.");
        } finally {
            setLoading(false);
        }
    };

    const resetSeleccionados = () => {
        setSeleccionados([]);
        setTotal(0);
        setModalVisible(false);
    };

    return { handlePago, modalVisible, resetSeleccionados, loading };
};

export default usePago;
