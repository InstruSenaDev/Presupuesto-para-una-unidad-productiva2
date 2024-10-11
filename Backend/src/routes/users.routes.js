const express = require("express");
const verificarToken = require("../controllers/middleware/tokenVerificacion.js");
const router = express.Router();

const { nuevosUser } = require("../controllers/post/postUsuarios");
const { productos } = require("../controllers/post/postProductos");
const { iniciarSesion } = require("../controllers/post/postInicio");
const { apiProductos } = require("../controllers/Get/getProductos");
const { postPago } = require("../controllers/post/postPago");
const { crearPresupuesto, crearMovimiento,  } = require("../controllers/post/postPresupuestos");
const { apiUsuarios } = require("../controllers/Get/getUsuarios");
const { estadosPersonal, estadosFamiliar, estadosEmpresarial } = require("../controllers/Uptade/estados");
const { enviarCodigoRecuperacion, validarCodigoYRestablecer } = require("../controllers/post/codigoRecuperacion.js");
const { getTiposPresupuesto } = require("../controllers/Get/getTiposPresupuesto.js");
const { getActivePresupuesto } = require("../controllers/Get/getActivePresupuesto.js");

// Router GET
router.get("/traerProductos/:idusuario",  apiProductos); // Obtener productos http://localhost:3000/traerProductos/1
router.get("/presupuestos/tipos/:idusuario", getTiposPresupuesto); // Obtener tipos de presupuestos http://localhost:3000/presupuestos/tipos/1
router.get("/presupuestos/activos/:idusuario/:idtipopresupuesto", getActivePresupuesto); // Obtener presupuesto activo por tipo
router.get("/usuarios/:idusuarios", apiUsuarios); // Obtener usuarios http://localhost:3000/usuarios/1
router.get("/informe/:idpresupuesto", ); // Obtener informe de movimientos (ingresos, egresos, total) http://localhost:3000/informe/1

// Router POST
// router.post("/presupuestos/:idusuario",  crearPresupuesto); // Crear presupuesto http://localhost:3000/presupuestos/1
router.post("/movimientos/:idusuario/:idpresupuesto", crearMovimiento); // Crear movimiento http://localhost:3000/movimientos/1/1
router.post("/registro", nuevosUser); // Registrar nuevo usuario http://localhost:3000/registro
router.post("/productos/:idusuario", productos); // Crear productos http://localhost:3000/productos/1
router.post("/postPago",  postPago); // Procesar pago http://localhost:3000/postPago
router.post("/inicio", iniciarSesion); // Iniciar sesión  http://localhost:3000/inicio
router.post('/recuperar-contrasena', enviarCodigoRecuperacion);
router.post('/validar-codigo', validarCodigoYRestablecer);

// Router PUT
router.put("/estados/:id", estadosPersonal, estadosFamiliar, estadosEmpresarial); // Actualizar estados http://localhost:3000/estados/1

module.exports = router;
