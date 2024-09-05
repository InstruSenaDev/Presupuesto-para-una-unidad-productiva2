// import React, { useState } from 'react';
// import useFormValidation from '../../../hooks/useFormValidacion';
// import Boton from '../icoReutilizables/boton';
// import Input from '../icoReutilizables/input';




// const Registro = () => {
//     // Estados para los inputs y los errores
//     const [nombre, setNombre] = useState('');
//     const [correo, setCorreo] = useState('');
//     const [contrasena, setContrasena] = useState('');
//     const [documento, setDocumento] = useState('');
//     const [tipoDocumento, setTipoDocumento] = useState('');
//     const [errores, setErrores] = useState({});

//     const [showPassword, setShowPassword] = useState(false);

//     // Función para mostrar/ocultar la contraseña
//     const togglePasswordVisibility = () => {
//         setShowPassword(!showPassword);
//     };

//     // Función de validación del formulario
//     const validarFormulario = () => {
//         const nuevosErrores = {};

//         if (!nombre) {
//             nuevosErrores.nombre = 'El nombre es obligatorio';
//         }

//         if (!correo.includes('@')) {
//             nuevosErrores.correo = 'Correo no válido';
//         }

//         if (contrasena.length < 6) {
//             nuevosErrores.contrasena = 'La contraseña debe tener al menos 6 caracteres';
//         }

//         if (!tipoDocumento) {
//             nuevosErrores.tipoDocumento = 'Debe seleccionar un tipo de documento';
//         }

//         if (!documento) {
//             nuevosErrores.documento = 'El número de documento es obligatorio';
//         }

//         setErrores(nuevosErrores);

//         // Devuelve true si no hay errores
//         return Object.keys(nuevosErrores).length === 0;
//     };

//     // Función para manejar el envío del formulario
//     const handleFormSubmit = (event) => {
//         event.preventDefault();

//         if (validarFormulario()) {
//             // Si la validación pasa, enviar el formulario
//             console.log('Formulario enviado:', {
//                 nombre,
//                 correo,
//                 contrasena,
//                 tipoDocumento,
//                 documento,
//             });
//         }
//     };

//     return (
//         <div className="contM justify-center flex flex-col md:flex-row h-screen">
//             <div className="contM justify-center pt-3 flex flex-col md:flex-row h-screen w-full items-center">
//                 <div className="cont1 px-8 grid justify-items-center bg-color4 h-5/6 rounded-s-lg text-color1 flex-col items-center">
//                     <h1 className="text-2xl font-bold">PUP</h1>
//                     <img className="h-26 w-28" src="/Img/Logo/logo.png" alt="Logo" />
//                     <p className="text-xl font-bold">Presupuesto para unidades productivas</p>
//                 </div>

//                 <div className="cont2 px-8 grid justify-items-center w-auto text-color1 flex-col items-center rounded-e-xl h-auto">
//                     <form id="formu" className="contform" onSubmit={handleFormSubmit}>
//                         <div className="conthf m-4 grid grid-flow-row sm:grid-flow-row-col gap-3 text-center bg-color3">
//                             <h1 className="text-2xl text-color2">Registro</h1>

//                             <div className="w-full">
//                                 <div>
//                                     <Input
//                                         placeholder="Nombre"
//                                         id="registroNombre"
//                                         name="nombre"
//                                         type="text"
//                                         value={nombre}
//                                         onChange={(e) => setNombre(e.target.value)} // Actualiza el estado
//                                     />
//                                     <span id="nombreError" className="text-color7 text-xs">
//                                         {errores.nombre}
//                                     </span>
//                                 </div>

//                                 <div>
//                                     <Input
//                                         placeholder="Correo"
//                                         id="CorreoRegistro"
//                                         name="correo"
//                                         type="text"
//                                         value={correo}
//                                         onChange={(e) => setCorreo(e.target.value)} // Actualiza el estado
//                                     />
//                                     <span id="correoError" className="text-color7 text-xs">
//                                         {errores.correo}
//                                     </span>
//                                 </div>

//                                 <div className="relative">
//                                     <Input
//                                         placeholder="Contraseña"
//                                         id="ContraseñaRegistro"
//                                         name="contrasena"
//                                         type={showPassword ? 'text' : 'password'}
//                                         value={contrasena}
//                                         onChange={(e) => setContrasena(e.target.value)} // Actualiza el estado
//                                     />
//                                     <i
//                                         className="bx bx-show cursor-pointer absolute right-3 top-2/4 transform -translate-y-2/4"
//                                         onClick={togglePasswordVisibility}
//                                     />
//                                     <span id="contrasenaError" className="text-color7 text-xs">
//                                         {errores.contrasena}
//                                     </span>
//                                 </div>

//                                 <div className="relative">
//                                     <select
//                                         name="tipodocumento"
//                                         id="tipodocumento"
//                                         className="text-color2"
//                                         value={tipoDocumento}
//                                         onChange={(e) => setTipoDocumento(e.target.value)} // Actualiza el estado
//                                         required
//                                     >
//                                         <option value="">Tipo de identificación</option>
//                                         <option value="Cedula de ciudadania">Cédula de ciudadanía</option>
//                                         <option value="Tarjeta de identidad">Tarjeta de identidad</option>
//                                         <option value="otro">Otro</option>
//                                     </select>
//                                 </div>

//                                 <div className="relative">
//                                     <Input
//                                         placeholder="Número"
//                                         id="documento"
//                                         name="documento"
//                                         type="text"
//                                         value={documento}
//                                         onChange={(e) => setDocumento(e.target.value)} // Actualiza el estado
//                                     />
//                                     <span id="numeroDcError" className="text-color7 text-xs">
//                                         {errores.documento}
//                                     </span>
//                                 </div>

//                                 <div className="flex-col">
//                                     <Boton type="submit" Text={'Registrarse'}></Boton>
//                                     <p className="text-color6 text-sm text-center">Copyright 2024 - 2025 Sena</p>
//                                     <p className="text-color6 text-sm text-center">
//                                         ¿Ya tienes cuenta? - <a href="/inicioSesion">Inicia Sesión</a>
//                                     </p>
//                                     <span id="submit" className="text-color7 text-xs"></span>
//                                 </div>
//                             </div>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Registro;