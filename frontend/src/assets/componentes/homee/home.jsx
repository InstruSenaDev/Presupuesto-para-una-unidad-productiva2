import React from 'react';
import imgH1 from '../../img/imgH.png';
import imgH2 from '../../img/imgP.png';
import LayoutN from '../navbar/layout.jsx';

const Inicio = () => {
  return (
    <LayoutN>
    <div className="flex rounded bg-blanquito justify-center ml-14">
      <div className="flex flex-wrap shadow-md shadow-blueUwu rounded-lg bg-blanquito">
        
        <div className="p-6 w-full rounded-t-2xl bg-blueUwu">
          {/* Título */}
          <h1 className="flex justify-center text-blanquito font-bold text-2xl">
            INICIO
          </h1>
          {/* Fin del título */}
        </div>

        <div>
          {/* Componente de inicio */}
          <div className="border-spacing-4 shadow-gris w p-6 flex flex-row items-center">
            <p>
              La conciencia financiera es una habilidad importante que puede
              beneficiar a las familias de todas las maneras. Al tomar el control
              de sus finanzas{' '}
              <span className="text-blueUwu font-bold">
                ¡Pueden mejorar su calidad de vida y alcanzar sus metas!
              </span>
            </p>
            <img className='imgh1' src={imgH1} alt="Imagen de inicio" />
          </div>
          {/* Fin del componente de inicio */}

          {/* Componentes Personal, Familiar y Empresarial */}
          <div className="border-spacing-4 shadow-gris w p-6 flex flex-row items-center">
            <div>
              <p>
                La conciencia financiera es una habilidad importante que puede
                beneficiar a las familias de todas las maneras. Al tomar el
                control de sus finanzas{' '}
                <span className="text-blueUwu font-bold">
                  ¡Pueden mejorar su calidad de vida y alcanzar sus metas!
                </span>
              </p>
              <img className='imgh2' src={imgH2} alt="Imagen de inicio" />
            </div>
          </div>
        </div>
      </div>
    </div>
    </LayoutN>
  );
};

export default Inicio;
