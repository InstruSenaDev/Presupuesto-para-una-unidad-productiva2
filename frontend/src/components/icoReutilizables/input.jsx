import React from 'react';
import PropTypes from 'prop-types';

function Input({ placeholder, type, id, name }) {
  return (
    <div>
      <label htmlFor={id} className="sr-only">
        {placeholder}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        id={id}
        className="mb-2 appearance-none rounded py-2 px-3 text-color2 leading-tight focus:outline-none focus:shadow-outline w-full justify-center shadow-xl"
      />
    </div>
  );
}

// Validación de tipos de las props
Input.propTypes = {
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default Input;
