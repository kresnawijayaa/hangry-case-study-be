const express = require("express");
const router = express.Router();
const CartsController = require("../controllers/carts");

router.get("/", CartsController.read);
router.post("/", CartsController.create);
router.put("/:cartId", CartsController.update);
router.delete("/:cartId", CartsController.delete);

module.exports = router;
