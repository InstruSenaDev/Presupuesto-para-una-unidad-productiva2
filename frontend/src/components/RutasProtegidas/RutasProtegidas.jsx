import React from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./authProvider";

export const RutaProtegida = () => {
    const { rol, isLogin } = useAuth();
    const location = useLocation();

    // Lógica para determinar las rutas accesibles según el rol
    let rutasAccesibles = [];
    switch (rol) {
        case 'notLogin':
            rutasAccesibles = ['/', '/InicioSesion', 'Registro', ];
            break;
        case 'loginUser':
            rutasAccesibles = ['/', '/InicioHome', '/Presupuestos', '/Ventas', '/Productos', ];
            break;
        case 'loginAdmin':
            rutasAccesibles = [ '/InicioSesion', 'Registro', '/PrincipalAdmin', '/TablaEmpresarial', '/TablaPersonal', '/TablaFamiliar', ];
            break;
        default:
            break;
    }

    const rutaActual = location.pathname;

    // Verificar si esa ruta es accesible para dicho rol
    const esRutaAccesible = rutasAccesibles.some(ruta => {
        // Manejo especial para rutas con parámetros
        if (ruta.includes(':')) {
            const rutaRegex = new RegExp('^' + ruta.replace(/:[\w-]+/g, '[\\w-]+') + '$');
            return rutaRegex.test(rutaActual);
        }
        return ruta === rutaActual;
    });

    if (!isLogin && !rutasAccesibles.includes(rutaActual)) {
        // Si no está logueado y la ruta no es accesible, redirige al login
        return <Navigate to="/InicioSesion" state={{ from: location }} replace />;
    }

    if (isLogin && !esRutaAccesible) {
        // Si está logueado pero la ruta no es accesible para su rol, redirige a la página principal correspondiente
        return rol === 'loginUser' ? <Navigate to="/InicioHome" replace /> : <Navigate to="/PrincipalAdmin" replace />;
    }

    // Si la ruta es accesible, permite el acceso
    return <Outlet />;
    
}