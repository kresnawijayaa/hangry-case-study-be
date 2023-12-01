const { Location } = require("../models");

class LocationsController {
  static async read(req, res, next) {
    try {
      const locations = await Location.findAll();

      if (!locations || locations.length === 0) {
        return res.status(404).json({ message: "No locations found" });
      }

      res.status(200).json(locations);
    } catch (error) {
      console.error("Error fetching locations: ", error);

      next(error);
    }
  }
}

module.exports = LocationsController;
