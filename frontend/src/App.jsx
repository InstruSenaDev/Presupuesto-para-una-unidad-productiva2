import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PrincipalAdmin from './pages/PrincipalAdmin';
import TablaPersonal from './components/Dashboard/TablaPersonal';
import TablaEmpresarial from './components/Dashboard/TablaEmpresarial';
import TablaFamiliar from './components/Dashboard/TablaFamiliar';
import InicioSesionAdmin from './pages/inisio';
import RegistrodeUsuarios from './components/registroDeUsuarios/Registro';
import InicioHome from './components/Home/inicioHome';
import { AuthProvider } from './components/RutasProtegidas/authProvider';
import { RutaProtegida } from './components/RutasProtegidas/RutasProtegidas';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={<InicioSesionAdmin />} />
          <Route path="/Registro" element={<RegistrodeUsuarios />} />

          {/* estas rutas son las protegidas se deben de poder dentro las rutas protegidas*/}
          {/* Rutas para usuarios */}
          <Route path="/InicioHome" element={<InicioHome />} />

          {/* Rutas para administradores */}
          <Route path="/PrincipalAdmin" element={<PrincipalAdmin />} />
          <Route path="/TablaEmpresarial" element={<TablaEmpresarial />} />
          <Route path="/TablaPersonal" element={<TablaPersonal />} />
          <Route path="/TablaFamiliar" element={<TablaFamiliar />} />
          {/* estas rutas son las protegidas*/}


          {/* Rutas protegidas aquivan las rutas protegidas */}
          <Route element={<RutaProtegida />}>

          </Route>

        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;