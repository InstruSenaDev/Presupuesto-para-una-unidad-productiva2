import  React  from 'react'
// import reactLogo from './assets/react.svg'
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
// import viteLogo from '/vite.svg'
import './App.css'
// Productos
import InicioSesion from './components/inicioDeSesion/Inicio';
// import RegistrodeUsuarios from './pages/registro';
import Inicio from './pages/Home';
// import Productos from './components/Empresarial/TablaProductos';
import Productos from './pages/Productos'
import Ventas from './pages/ventas';
import Inisio from './pages/Inisio';
import RegistroDeUsuarios from './components/RegistroDeUsuarios/Registro';
import Sidebar from './components/Sidebar/Sidebar';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/InicioHome';
import PagPersonal from './components/pag/pagPresupuestoPersonal';



function App() {
  // const [count, setCount] = useState(0)

  return (
    <Router>  
      <Routes>
        <Route path="/Inisio" element={<Inisio />} /> 
        <Route path="/Home" element={<Home />} /> 
        <Route path="/Registro" element={<RegistroDeUsuarios />} />
        <Route path="/Sidebar" element={<Sidebar />} />
        <Route path="/Navbar" element={<Navbar />} />
        <Route path="/PagPersonal" element={<PagPersonal />} />
       


        <Route path='/' element = {<InicioSesion/>} />
        <Route path="/Inicio" element={<Inicio />} />
        {/* <Route path='/RegistrodeUsuario' element = {<RegistrodeUsuarios/>}/> */}
        <Route path='/Productos' element = {<Productos/>}/>
        <Route path='/ventas' element = {<Ventas/>}/>
      </Routes>
    </Router>
  )
}

export default App
