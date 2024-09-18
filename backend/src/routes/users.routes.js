const express = require("express");
const router = express.Router();

const {getRoles} = require("../controllers/Get/getRoles");
const {nuevosUser} = require("../controllers/post/postUsuarios")
const {productos} = require("../controllers/post/postProductos")
const {iniciarSesion} = require("../controllers/post/postInicio")
const {Presupuesto} = require("../controllers/post/postPresupuesto")
const {llamadoUser} = require("../controllers/Get/getUser")

router.get("/rol", getRoles);// http://localhost:3000/rol
router.get("/user", llamadoUser)
router.post("/registro", nuevosUser );// http://localhost:3000/registro
router.post("/productos", productos);// http://localhost:3000/productos
router.post("/presupuesto", Presupuesto);// http://localhost:3000/presupuesto
router.post("/inicio", iniciarSesion);// http://localhost:3000/inicio
// router.post("/postPago", postPago); // http://localhost:3000/postPago

module.exports = router;