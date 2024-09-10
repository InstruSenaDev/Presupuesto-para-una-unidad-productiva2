import React, { useEffect, useState } from 'react'




const detalleVentas = () => {
    const [detalle,] = useState([]);
    return (
        <>
            <div className=" bg-griscard flex justify-center flex-col items-center w-full">
                <div className="row">
                    <div className="w-full text-blanquito col-md-12">
                        <input className='w-full rounded-md' placeholder='Buscar venta'></input>
                        <h1 className='flex justify-center'>Detalle de Ventas</h1>

                    </div>
                </div>
                <div className='flex'>
                    <table className="table-auto w-full">
                        <thead className="bg-griscard text-blanquito">
                            <tr>hola</tr>
                            <tbody>
                                {detalle.map(() => (
                                    <tr key={detalle.id}>
                                    <tr >{detalle.saldo}</tr>
                                    </tr>
                                    
                                ))
                                }
                            </tbody>
                        </thead>
                    </table>
                </div>
            </div>
            


        </>
    )
}
export default detalleVentas