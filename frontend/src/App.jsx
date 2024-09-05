import  React  from 'react'
// import reactLogo from './assets/react.svg'
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
// import viteLogo from '/vite.svg'
import './App.css'
// Productos
import InicioSesion from './components/inicioDeSesion/Inicio';
// import RegistrodeUsuarios from './pages/registro';
import Inicio from './pages/Inicio';
// import Productos from './components/Empresarial/TablaProductos';
import Productos from './pages/Productos'
import Ventas from './pages/ventas';


function App() {
  // const [count, setCount] = useState(0)

  return (
    <Router>  
      <Routes>
        <Route path="/Inicio" element={<Inicio />} />
        <Route path='/InicioSesion' element = {<InicioSesion/>} />
        {/* <Route path='/RegistrodeUsuario' element = {<RegistrodeUsuarios/>}/> */}
        <Route path='/Productos' element = {<Productos/>}/>
        <Route path='/ventas' element = {<Ventas/>}/>
      </Routes>
    </Router>
  )
}

export default App
