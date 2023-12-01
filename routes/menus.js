const express = require("express");
const router = express.Router();
const MenusController = require("../controllers/menus");

router.get("/", MenusController.read);

module.exports = router;
