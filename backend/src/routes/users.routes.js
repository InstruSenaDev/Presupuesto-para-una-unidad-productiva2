const express = require("express");
const router = express.Router();

const {getRoles} = require("../controllers/Get/getRoles");
const {nuevosUser} = require("../controllers/post/postUsuarios")

router.get("/rol", getRoles);// http://localhost:3000/rol
router.post("/registro", nuevosUser );// http://localhost:3000/registro
router.get("/productos" )

module.exports = router;
