import React, { useState } from "react";

const ModalProducto = ({ isOpen, onClose }) => {
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [codigo, setCodigo] = useState("");
    const [valorunitario, setValorUnitario] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validaciones de los inputs
        if (nombre.trim().length < 3) {
            alert("El nombre del producto debe tener al menos 3 caracteres.");
            return;
        }
        if (descripcion.trim().length < 5 ) {
            alert("La descripción debe tener al menos 5 caracteres.");
            return;
        }
        if (codigo.trim().length < 1) {
            alert("El código del producto no puede estar vacío.");
            return;
        }
        if (!valorunitario || valorunitario <= 0) {
            alert("El valor unitario debe ser un número mayor a 0.");
            return;
        }

        // Obtener el idusuario desde localStorage
        const storedUser = localStorage.getItem("id");
        let idusuario = null;

        try {
            idusuario = storedUser ? JSON.parse(storedUser) : null;
        } catch (error) {
            console.error("Error al parsear el ID de usuario desde el modal:", error);
        }

        if (!idusuario) {
            console.error("No se encontró un ID de usuario válido.");
            alert("Por favor, inicia sesión de nuevo.");
            return;
        }

        const nuevoProducto = {
            nombre,
            descripcion,
            codigo,
            valorunitario,
            idusuario,
        };

        try {
            const response = await fetch(`http://localhost:3000/productos/${idusuario}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(nuevoProducto),
            });

            if (!response.ok) {
                throw new Error(`Error HTTP! status: ${response.status}`);
            }

            alert("Producto agregado exitosamente.");
            onClose(); // Cerrar el modal después de agregar el producto
        } catch (error) {
            console.error("Error al agregar producto:", error);
            alert("Error al agregar producto. Inténtalo de nuevo.");
        }
    };

    return isOpen ? (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-6 rounded-md shadow-md">
                <h3 className="text-lg font-bold mb-4">Agregar nuevo producto</h3>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Nombre del producto"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        className="border rounded-md px-4 py-2 w-full mb-2"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Descripción"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        className="border rounded-md px-4 py-2 w-full mb-2"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Código"
                        value={codigo}
                        onChange={(e) => setCodigo(e.target.value)}
                        className="border rounded-md px-4 py-2 w-full mb-2"
                        required
                    />
                    <input
                        type="number"
                        placeholder="Valor Unitario"
                        value={valorunitario}
                        onChange={(e) => setValorUnitario(e.target.value)}
                        className="border rounded-md px-4 py-2 w-full mb-2"
                        required
                    />
                    <div className="flex justify-between mt-4">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded-md"
                        >
                            Agregar
                        </button>
                        <button
                            type="button"
                            className="bg-red-500 text-white px-4 py-2 rounded-md"
                            onClick={onClose}
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    ) : null;
};

export default ModalProducto;
