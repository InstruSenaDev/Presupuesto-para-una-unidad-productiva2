import  React  from 'react'

// import reactLogo from './assets/react.svg'
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
// import viteLogo from '/vite.svg'
// import { BoxIconElement } from 'boxicons';
import './App.css'

import InicioSesion from './components/inicioDeSesion/Inicio';

import Inicio from './pages/Home';

import Productos from './pages/Productos';
import ProductosL from './pages/Productos';

import Ventas from './pages/ventas';
import Inisio from './pages/Inisio';
import RegistroDeUsuarios from './components/RegistroDeUsuarios/Registro';
// import Sidebar from './components/Sidebar/Sidebar';
import Navbar from './components/Navbar/Navbar';

// import PagPersonal from './components/pag/pagPresupuestoPersonal';
import PresupuestoPag from './pages/PresupuestoPag';
import EmpresarialPag from './pages/EmpresarialPag';

import Home from './pages/Home';
import PersonalPa from './pages/PersonalPag';
import PersonalPag from './pages/PersonalPag';


import FamiliarPa from './pages/FamiliarPag'
import FamiliarPag from './pages/FamiliarPag'

 //rutas admin

 import Dash from './pages/DashHome';
 
  

function App() {
  // const [count, setCount] = useState(0)

  return (
    <Router>  
      <Routes>
        <Route path="/Dash" element={<Dash />} /> 
        <Route path="/Inisio" element={<Inisio />} /> 
        <Route path="/Home" element={<Home />} /> 
        <Route path="/Registro" element={<RegistroDeUsuarios />} />
        {/* <Route path="/Sidebar" element={<Sidebar />} /> */}
        <Route path="/Navbar" element={<Navbar />} />
 {/* <ruta del componente si y la ruta dinamica */}
        <Route path="/PersonalPa" element={<PersonalPa />} />
        <Route path="/PersonalPag" element={<PersonalPag />} />
        <Route path="/Presupuestos" element={<PresupuestoPag />} />
        <Route path="/EmpresarialPag" element={<EmpresarialPag />} />
        <Route path="/PersonalPa" element={<PersonalPa />} />
         {/* <ruta del componente si y la ruta dinamica */}
        <Route path="/FamiliarPa" element={<FamiliarPa />} />
        <Route path="/familiarPag" element={<FamiliarPag />} />
         {/* <ruta del componente si y la ruta dinamica */}
        <Route path='/' element = {<InicioSesion/>} />
        <Route path="/Inicio" element={<Inicio />} />
          {/* <ruta del componente si y la ruta dinamica */}
        <Route path='/Productos' element = {<Productos/>}/>
        <Route path='/ProductosL' element = {<ProductosL/>}/>
        <Route path='/ventas' element = {<Ventas/>}/>
      </Routes>
    </Router>
  )
}

export default App
