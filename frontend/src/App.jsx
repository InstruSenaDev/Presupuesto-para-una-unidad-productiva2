import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PrincipalAdmin from './pages/PrincipalAdmin'; 
import TablaPersonal from './components/Dashboard/TablaPersonal'; // Importa el componente Personal
import TablaEmpresarial from './components/Dashboard/TablaEmpresarial'; // Importa el componente Empresarial
import TablaFamiliar from './components/Dashboard/TablaFamiliar';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Ruta para PrincipalAdmin */}
        <Route path="/PrincipalAdmin" element={<PrincipalAdmin/>} />
      
        {/* Ruta para TablaEmpresarial */}
        <Route path="/TablaEmpresarial" element={<TablaEmpresarial/>} />

        {/* Ruta para TablaPersonal */}
        <Route path="/TablaPersonal" element={<TablaPersonal/>} />
        
        {/* Ruta para TablaFamiliar*/}
        <Route path="/TablaFamiliar" element={<TablaFamiliar/>} />

      </Routes>
      
    </Router>
  );
};

export default App;
