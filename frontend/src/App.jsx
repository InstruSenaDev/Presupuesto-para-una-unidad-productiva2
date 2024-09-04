import React from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import FormularioInicio from '../src/assets/componentes/inicio/inicio.jsx';
import Registro from '../src/assets/componentes/inicio/registro.jsx';
import Layout from '../src/assets/componentes/navbar/navbar.jsx';
import Home from '../src/assets/componentes/homee/home.jsx'
import Sidebar from './assets/componentes/sidebar/sidebar.jsx';
import DashPrincipal from '../src/assets/componentes/dashAdmin/dashPrincipal.jsx';
import TablaUserPersonal from './assets/componentes/dashAdmin/tablaPersonal.jsx'
import TablaUserFamiliar from './assets/componentes/dashAdmin/tablaPersonal.jsx'
import TablaUserEmpresarial from './assets/componentes/dashAdmin/tablaEmpresarial.jsx'
import TablaProductos from './assets/componentes/productosEmpresarial/tablaProductos.jsx';

import './App.css';



function App() {
  // const [count, setCount] = useState(0)

  return (
    <Router>  
      <Routes>
        
        <Route path='/dashPrincipal' element = {<DashPrincipal/>} />
        <Route path='/TablaUserPersonal' element = {<TablaUserPersonal/>} />
        <Route path='/TablaUserFamiliar' element = {<TablaUserFamiliar/>} />
        <Route path='/TablaUserEmpresarial' element = {<TablaUserEmpresarial/>} />
        <Route path='/TablaProductos' element = {<TablaProductos/>} />
        <Route path='/home' element = {<Home/>} />
        <Route path='/sidebar' element = {<Sidebar/>} />
        <Route path='/inicio' element = {<FormularioInicio/>} />
        <Route path='/registro' element = {<Registro/>}/>
        <Route path='/navbar' element = {<Layout/>}/>
      </Routes>
    </Router>
  )
}

export default App;

