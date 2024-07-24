const express = require("express");
const router = express.Router();

const registerUser = require("../../src/controllers/registerUser");

router.post("/register", registerUser);

module.exports = router;