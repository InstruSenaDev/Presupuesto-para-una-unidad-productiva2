const express = require("express");
const router = express.Router();

const getRoles = require("../../src/controllers/getRoles");

router.get("/rol", getRoles.getRoles);

module.exports = router;
