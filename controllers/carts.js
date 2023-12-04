const { Cart, Location, Menu, Order, OrderDetail } = require("../models");

class CartsController {
  static async read(req, res, next) {
    try {
      const UserId = 1; //req.user.id (authentikasi)

      const carts = await Cart.findAll({
        where: { UserId },
        include: [{ model: Menu }],
      });

      res.status(200).json(carts);
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
      const { cartId } = req.params;

      // cart validation
      const cartFound = await Cart.findByPk(cartId);
      if (!cartFound) {
        return res.status(404).json({ message: "Cart not found" });
      }

      // delete cart
      await Cart.destroy({
        where: { id: cartId },
      });

      res
        .status(200)
        .json({ message: `Cart item with id ${cartId} successfully deleted` });
    } catch (error) {
      next(error);
    }
  }
  static async checkout(req, res, next) {
    try {
      const UserId = 1;

      // find cart by user id
      const cartItems = await Cart.findAll({
        where: { UserId },
        include: [{ model: Menu }],
      });

      console.log(cartItems, "<<<<<");

      // validation cart
      if (cartItems.length === 0) {
        return res.status(400).json({ message: "Keranjang belanja kosong" });
      }

      // calculate total price
      let totalPrice = 0;
      for (const item of cartItems) {
        totalPrice += item.quantity * item.Menu.price;
      }

      // create order history
      const order = await Order.create({
        UserId,
        LocationId: cartItems[0].LocationId,
        totalPrice,
      });

      // create order history details
      for (const item of cartItems) {
        await OrderDetail.create({
          OrderId: order.id,
          MenuId: item.MenuId,
          quantity: item.quantity,
        });
      }

      // delete cart
      await Cart.destroy({ where: { UserId } });

      res.status(200).json({
        message: `Checkout berhasil, total belanja sebesar Rp ${totalPrice}`,
        order,
      });
    } catch (error) {
      console.error("Checkout failed: ", error);
      next(error);
    }
  }
}

module.exports = CartsController;
