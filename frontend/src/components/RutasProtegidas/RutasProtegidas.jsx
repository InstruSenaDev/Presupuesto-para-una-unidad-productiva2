import React from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./authProvider";

export const RutaProtegida = () => {
    const { rol, isLogin } = useAuth();
    const location = useLocation();

    // Rutas públicas que siempre son accesibles
    const rutasPublicas = ['/', '/Registro'];

    // Rutas accesibles según el rol
    const rutasPorRol = {
        loginUser: ['/InicioHome', '/Presupuestos', '/Ventas', '/Productos'],
        loginAdmin: ['/PrincipalAdmin', '/TablaEmpresarial', '/TablaPersonal', '/TablaFamiliar']
    };

    const rutaActual = location.pathname;

    // Verifica si la ruta actual es pública
    if (rutasPublicas.includes(rutaActual)) {
        return <Outlet />;
    }

    // Si no está logueado, redirige al login
    if (!isLogin) {
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    // Verifica si la ruta es accesible para el rol actual
    const esRutaAccesible = rutasPorRol[rol]?.includes(rutaActual);

    if (!esRutaAccesible) {
        // Redirige a la página principal correspondiente al rol
        const paginaPrincipal = rol === 'loginAdmin' ? '/PrincipalAdmin' : '/InicioHome';
        return <Navigate to={paginaPrincipal} replace />;
    }

    // Si la ruta es accesible, permite el acceso
    return <Outlet />;
};