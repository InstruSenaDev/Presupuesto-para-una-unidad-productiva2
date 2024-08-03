const express = require("express");
const router = express.Router();

const {getRoles} = require("../controllers/Get/getRoles");
const {nuevosUser} = require("../controllers/post/postUsuarios")
const {productos} = require("../controllers/post/postProductos")
const {iniciarSesion} = require("../controllers/post/postInicio")

router.get("/rol", getRoles);// http://localhost:3000/rol
router.post("/registro", nuevosUser );// http://localhost:3000/registro
router.post("/productos", productos);// http://localhost:3000/productos
router.post("/inicio", iniciarSesion);// http://localhost:3000/inicio

module.exports = router;
