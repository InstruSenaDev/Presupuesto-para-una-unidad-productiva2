import  React  from 'react'
// import reactLogo from './assets/react.svg'
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
// import viteLogo from '/vite.svg'
import './App.css'
import InicioSesion from './components/inicioDeSesion/Inicio';
import RegistrodeUsuarios from './pages/registro';
import PagPresupuestos from './pages/PagPresupuestos';




function NotFound() {
  return <h2>404: Página no encontrada</h2>;
}

function App() {
  return (
    <Router>  
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path='/InicioSesion' element={<InicioSesion />} />
        <Route path='/RegistrodeUsuario' element={<RegistrodeUsuarios />} />
        <Route path='/PagPresupuestos' element={<PagPresupuestos />} />
        <Route path="*" element={<NotFound />} /> {/* Manejo de rutas no existentes */}
      </Routes>
    </Router>
  );
}



export default App
