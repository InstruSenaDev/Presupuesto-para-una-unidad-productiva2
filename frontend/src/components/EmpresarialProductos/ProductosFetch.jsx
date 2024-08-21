import React from 'react'
export const Productos = ({productos = []}) => {
    return (
        <>
            {productos.map((producto, id) =>
            (<tr className="border-t" key={id}>
                <td className="py-2">
                    {producto.fecha}</td>
                <td>{producto.nombre}</td>
                <td>{producto.recibo}</td>
                <td className="text-green-600">{producto.precio}</td>
                <td>{producto.estado}</td>
                <td>
                    <button><box-icon type='solid' name='plus-circle'></box-icon></button>
                    <button className="text-gray-600 mr-2"><box-icon name='edit' ></box-icon></button>
                    <button className="text-gray-600"><box-icon name='trash'></box-icon></button>
                </td>
            </tr>))}
        </>)
}