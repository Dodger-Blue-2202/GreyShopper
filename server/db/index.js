//this is the access point for all things database related!

const db = require("./db");
const Sequelize = require("sequelize");

const User = require("./models/User");
const Product = require("./models/Product");
const Order = require("./models/Order");

const Order_Product = db.define("Order_Product", {
  quantity: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0,
    },
  },
  total_price: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0,
    },
  },
  isCart: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
    validate: {
      notEmpty: true,
    },
  },
});

Product.belongsToMany(Order, { through: Order_Product });
Order.belongsTo(User);
User.hasMany(Order);

module.exports = {
  db,
  models: {
    User,
    Product,
    Order,
  },
};
