import React from 'react';

function Boton({ Text, id }) {
  return (
    <div>
      <span id={id} className="bg-color2 text-color1 mb-2 py-2 rounded w-52">
        {Text}
      </span>
    </div>
  );
}

export default Boton;
