const express = require("express");
const router = express.Router();

const {getRoles} = require("../controllers/Get/getRoles");
const {nuevosUser} = require("../controllers/post/postUsuarios")
const {productos} = require("../controllers/post/postProductos")
const {iniciarSesion} = require("../controllers/post/postInicio")
const {apiProductos} = require("../controllers/Get/getProductos")
const {llamadouser}= require("../controllers/Get/getUser")

router.get("/rol", getRoles);// http://localhost:3000/rol
router.post("/registro", nuevosUser );// http://localhost:3000/registro
router.post("/productos", productos);// http://localhost:3000/productos
router.post("/inicio", iniciarSesion);// http://localhost:3000/inicio
router.get("/traerProductos", apiProductos);// http://localhost:3000/api/producto
router.get("/user",llamadouser)
module.exports = router;
