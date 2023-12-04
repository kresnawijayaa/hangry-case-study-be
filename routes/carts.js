const express = require("express");
const router = express.Router();
const CartsController = require("../controllers/carts");

router.get("/", CartsController.read);
router.post("/", CartsController.create);
router.patch("/:cartId", CartsController.update);
router.delete("/:cartId", CartsController.delete);

router.post("/checkout", CartsController.checkout);

module.exports = router;
