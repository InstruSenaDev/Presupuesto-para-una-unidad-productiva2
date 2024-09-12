import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PrincipalAdmin from './pages/PrincipalAdmin'; 
import TablaPersonal from './components/Dashboard/TablaPersonal'; // Importa el componente Personal
import TablaEmpresarial from './components/Dashboard/TablaEmpresarial'; // Importa el componente Empresarial

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Ruta para PrincipalAdmin */}
        <Route path="/" element={<PrincipalAdmin />} />
        
        {/* Ruta para Personal */}
        <Route path="/personal" element={<TablaPersonal/>} />
        
        {/* Ruta para Empresarial */}
        <Route path="/empresarial" element={<TablaEmpresarial/>} />
      </Routes>
    </Router>
  );
};

export default App;
