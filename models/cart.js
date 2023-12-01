"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Cart.init(
    {
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: `User ID required.`,
          },
          notNull: {
            args: true,
            msg: `User ID required.`,
          },
        },
      },
      LocationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: `Location ID required.`,
          },
          notNull: {
            args: true,
            msg: `Location ID required.`,
          },
        },
      },
      MenuId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: `Menu ID required.`,
          },
          notNull: {
            args: true,
            msg: `Menu ID required.`,
          },
        },
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: `Quantity required.`,
          },
          notNull: {
            args: true,
            msg: `Quantity required.`,
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Cart",
    }
  );
  return Cart;
};
