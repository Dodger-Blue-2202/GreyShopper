//this is the access point for all things database related!

const db = require("./db");
const Sequelize = require("sequelize");

const User = require("./models/User");
const Product = require("./models/Product");

const User_Product = db.define("User_Product", {
  quantity: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0,
    },
  },
});
Product.belongsToMany(User, { through: User_Product });
User.belongsToMany(Product, { through: User_Product });

module.exports = {
  db,
  models: {
    User,
    Product,
  },
};
