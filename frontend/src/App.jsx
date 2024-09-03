import  React  from 'react'
// import reactLogo from './assets/react.svg'
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
// import viteLogo from '/vite.svg'
import './App.css'
import InicioSesion from './components/inicioDeSesion/Inicio';
import RegistrodeUsuarios from './pages/registro';


function App() {
  // const [count, setCount] = useState(0)

  return (
    <Router>  
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path='/InicioSesion' element = {<InicioSesion/>} />
        <Route path='/RegistrodeUsuario' element = {<RegistrodeUsuarios/>}/>
      </Routes>
    </Router>
  )
}

export default App
