const { Cart, Location, Menu } = require("../models");

class CartsController {
  static async read(req, res, next) {
    try {
      res.status(200);
    } catch (error) {
      next(error);
    }
  }
  static async create(req, res, next) {
    try {
      const UserId = 1; //req.user.id (authentikasi)
      const { LocationId, MenuId, quantity } = req.body;

      // location validation
      const location = await Location.findByPk(LocationId);
      if (!location) {
        return res.status(404).json({ message: "Location not found" });
      }

      // menu validation
      const menu = await Menu.findByPk(MenuId);
      if (!menu) {
        return res.status(404).json({ message: "Menu not found" });
      }
      if (menu.availability == false) {
        return res
          .status(400)
          .json({ message: "Menu unavailable temporarily" });
      }

      // quantity validation
      if (quantity < 1) {
        return res.status(400).json({ message: "Add at least one item" });
      }

      //create new cart
      const newCart = await Cart.create({
        UserId,
        LocationId,
        MenuId,
        quantity,
      });

      res.status(201).json(newCart);
    } catch (error) {
      next(error);
    }
  }
  static async update(req, res, next) {
    try {
      const UserId = 1; //req.user.id (authentikasi)

      const { cartId } = req.params;
      const { quantity } = req.body;

      // cart validation
      const cartFound = await Cart.findByPk(cartId);
      if (!cartFound) {
        return res.status(404).json({ message: "Cart not found" });
      }

      // new quantity validation
      if (quantity < 1) {
        return res.status(400).json({ message: "Add at least one item" });
      }

      // update cart
      await Cart.update({ quantity }, { where: { id: cartId } });

      const updatedCart = await Cart.findByPk(cartId);
      res.status(200).json(updatedCart);
    } catch (error) {
      next(error);
    }
  }
  static async delete(req, res, next) {
    try {
      res.status(200);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CartsController;
