import { useState } from 'react';

const useFormValidation = () => {
    const [errors, setErrors] = useState({});
    const [isValid, setIsValid] = useState(true);

    const validateForm = (correo, contrasena) => {
        let valid = true;
        const newErrors = {};

        // Validación del correo
        if (!correo || !/\S+@\S+\.\S+/.test(correo)) {
            valid = false;
            newErrors.correo = "Ingrese un correo electrónico válido.";
        }

        // Validación de la contraseña
        if (!contrasena || contrasena.length < 8) {
            valid = false;
            newErrors.contrasena = "La contraseña debe tener al menos 8 caracteres.";
        }
        // if (!nombre) {
        //     newErrors.nombre = 'El nombre es obligatorio';
        // }

        // if (!correo.includes('@')) {
        //     newErrors.correo = 'Correo no válido';
        // }

        // if (contrasena.length < 6) {
        //     newErrors.contrasena = 'La contraseña debe tener al menos 6 caracteres';
        // }

        // if (!tipoDocumento) {
        //     newErrors.tipoDocumento = 'Debe seleccionar un tipo de documento';
        // }

        // if (!documento) {
        //     newErrors.documento = 'El número de documento es obligatorio';
        // }


        setErrors(newErrors);
        setIsValid(valid);
        return valid;
    };

    return { validateForm, errors, isValid };
};

export default useFormValidation;
