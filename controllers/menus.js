const { Menu } = require("../models");

class MenusController {
  static async read(req, res, next) {
    try {
      const menus = await Menu.findAll();

      if (!menus || menus.length === 0) {
        return res.status(404).json({ message: "No menus found" });
      }

      res.status(200).json(menus);
    } catch (error) {
      console.error("Error fetching menus: ", error);

      next(error);
    }
  }
}

module.exports = MenusController;
