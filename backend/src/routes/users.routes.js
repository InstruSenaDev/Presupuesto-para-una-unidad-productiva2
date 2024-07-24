const express = require("express");
const router = express.Router();

const getRoles = require("../../src/controllers/getRoles");
const {nuevosUser} = require("../controllers/postUsuarios")

router.get("/rol", getRoles.getRoles);
router.post("/register", nuevosUser );

module.exports = router;
