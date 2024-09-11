const express = require("express");
const router = express.Router();

<<<<<<< HEAD
const {getRoles} = require("../controllers/Get/getRoles");
const {nuevosUser} = require("../controllers/post/postUsuarios")
const {productos} = require("../controllers/post/postProductos")
const {iniciarSesion} = require("../controllers/post/postInicio")
const {Presupuesto} = require("../controllers/post/postPresupuesto")

router.get("/rol", getRoles);// http://localhost:3000/rol
router.post("/registro", nuevosUser );// http://localhost:3000/registro
router.post("/productos", productos);// http://localhost:3000/productos
router.post("/presupuesto", Presupuesto);// http://localhost:3000/presupuesto
=======

const { nuevosUser } = require("../controllers/post/postUsuarios")
const { productos } = require("../controllers/post/postProductos")
const { iniciarSesion } = require("../controllers/post/postInicio");
const { apiProductos } = require("../controllers/Get/getProductos");
const { postPago } = require("../controllers/post/postPago");
const { crearPresupuesto, crearMovimiento, obtenerPresupuestos } = require("../controllers/post/postPresupuestos");

router.post("/presupuestos/:idusuario", crearPresupuesto);// http://localhost:3000/presupuestos/${idusuario}
router.post("/movimientos/:idusuario/:idtipopresupuesto", crearMovimiento);// http://localhost:3000/movimientos/${idusuario}/${idtipopresupuesto}
router.get("/presupuestos/:idusuario", obtenerPresupuestos);// http://localhost:3000/presupuestos/${idusuario}
router.get("/traerProductos/:idusuario", apiProductos);// http://localhost:3000/rol
router.post("/registro", nuevosUser);// http://localhost:3000/registro
router.post("/productos/:idusuario", productos);// http://localhost:3000/productos:idusuario
>>>>>>> Juan
router.post("/inicio", iniciarSesion);// http://localhost:3000/inicio
router.post("/postPago", postPago); // http://localhost:3000/postPago

module.exports = router;