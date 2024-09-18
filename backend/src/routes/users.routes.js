const express = require("express");
const router = express.Router();

const { nuevosUser } = require("../controllers/post/postUsuarios");
const { productos } = require("../controllers/post/postProductos");
const { iniciarSesion } = require("../controllers/post/postInicio");
const { apiProductos } = require("../controllers/Get/getProductos");
const { postPago } = require("../controllers/post/postPago");
const { crearPresupuesto, crearMovimiento, obtenerInformeMovimientos } = require("../controllers/post/postPresupuestos");
const { apiUsuarios } = require("../controllers/Get/getUsuarios");
const { estadosPersonal, estadosFamiliar, estadosEmpresarial } = require("../controllers/Uptade/estados");

// Router GET
router.get("/traerProductos/:idusuario", apiProductos); // Obtener productos http://localhost:3000/traerProductos/1
// router.get("/presupuestos/:idusuario", obtenerPresupuestos); // Obtener presupuestos http://localhost:3000/presupuestos/1
router.get("/usuarios/:idusuarios", apiUsuarios); // Obtener usuarios http://localhost:3000/usuarios/1
router.get("/informe/:idpresupuesto", obtenerInformeMovimientos); // Obtener informe de movimientos (ingresos, egresos, total) http://localhost:3000/informe/1

// Router POST
router.post("/presupuestos/:idusuario", crearPresupuesto); // Crear presupuesto http://localhost:3000/presupuestos/1
router.post("/movimientos/:idusuario/:idpresupuesto", crearMovimiento); // Crear movimiento http://localhost:3000/movimientos/1/1
router.post("/registro", nuevosUser); // Registrar nuevo usuario http://localhost:3000/registro
router.post("/productos/:idusuario", productos); // Crear productos http://localhost:3000/productos/1
router.post("/inicio", iniciarSesion); // Iniciar sesión  http://localhost:3000/inicio
router.post("/postPago", postPago); // Procesar pago http://localhost:3000/postPago

// Router PUT
router.put("/estados/:id", estadosPersonal, estadosFamiliar, estadosEmpresarial); // Actualizar estados http://localhost:3000/estados/1

module.exports = router;
