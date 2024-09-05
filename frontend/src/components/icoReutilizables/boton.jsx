import React from 'react';

function Boton({ Text, id }) {
  return (
    <>
      <button id={id} className="bg-color2 text-color1 mb-2 py-2 rounded w-52">
        {Text}
      </button>
    </>
  );
}

export default Boton;