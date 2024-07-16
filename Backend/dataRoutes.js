const express = require("express");
const router = express.Router();
const controller = require("./controller.js");


router.post("/", controller.Ingresos)
router.post("/", controller.Egresos)
router.post("/", controller.Presupuesto)
router.post("/", controller.Ingresos)

module.exports = router;