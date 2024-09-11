import LayoutN from '../Layout/NabvarSisebar';
import ImgH1 from '../Img/imgH.png';
import ImgH2 from '../Img/imgP.png';
import ImgH3 from '../Img/imgf.png';
import ImgH4 from '../Img/imgE.png';
import  './home.css';


const Home = () => {
    return (
        <LayoutN titulo="Home">
                

            <div className="flex rounded bg-blanquito justify-center mr-36 ">
                
                <div className="flex flex-wrap shadow-md shadow-blueUwu rounded-lg bg-blanquito ">
                    <div className="p-6 w-full rounded-t-2xl bg-blueUwu">
                        {/* Título */}
                        <h1 className="flex justify-center text-blanquito font-bold text-2xl">
                            INICIO
                        </h1>
                        {/* Fin del título */}
                    </div>

                    <div id='x' className="contP">
                        {/* Componente de inicio */}
                        <div id='c1' className="border-spacing-4 shadow-gris w p-6 flex flex-row items-center">
                            <p>
                                La conciencia financiera es una habilidad importante que puede
                                beneficiar a las familias de todas las maneras. Al tomar el control
                                de sus finanzas{' '}
                                <span className="text-blueUwu font-bold">
                                    ¡Pueden mejorar su calidad de vida y alcanzar sus metas!
                                </span>
                            </p>
                            <img className='imgh1' src={ImgH1} alt="Imagen de inicio" />
                        </div>
                        {/* Fin del componente de inicio */}

                        {/* Componentes Personal, Familiar y Empresarial */}
                        <div id='c1' className="border-spacing-4 shadow-gris w p-6 flex flex-row items-center">
                            <div >
                                <p>
                                    La conciencia financiera es una habilidad importante que puede
                                    beneficiar a las familias de todas las maneras. Al tomar el
                                    control de sus finanzas{' '}
                                    <span className="text-blueUwu font-bold">
                                        ¡Pueden mejorar su calidad de vida y alcanzar sus metas!
                                    </span>
                                </p>
                                <img className='imgh2' src={ImgH2} alt="Imagen de inicio" />
                            </div>
                            <div className="border-spacing-4 shadow-gris w p-6 flex flex-row items-center">
                                <p>
                                    La conciencia financiera es una habilidad importante que puede
                                    beneficiar a las familias de todas las maneras. Al tomar el
                                    control de sus finanzas{' '}
                                    <span className="text-blueUwu font-bold">
                                        ¡Pueden mejorar su calidad de vida y alcanzar sus metas!
                                    </span>
                                </p>
                                <img className='imgh3' src={ImgH3} alt="Imagen de inicio" />
                            </div>
                        </div>
                        <div id='c1' className="border-spacing-4 shadow-gris w p-6 flex flex-row items-center">
                            <p>
                                La conciencia financiera es una habilidad importante que puede
                                beneficiar a las familias de todas las maneras. Al tomar el control
                                de sus finanzas{' '}
                                <span className="text-blueUwu font-bold">
                                    ¡Pueden mejorar su calidad de vida y alcanzar sus metas!
                                </span>
                            </p>
                            <img className='imgh4' src={ImgH4} alt="Imagen de inicio" />
                        </div>
                    </div>
                </div>
            </div>
        </LayoutN>
    );
};

export default Home;
