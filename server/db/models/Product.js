const Sequelize = require("sequelize");
const db = require("../db");

const Product = db.define("product", {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false,
    validate: {
      min: 0.0,
    },
  },
  description: {
    type: Sequelize.TEXT,
    defaultValue:
      "This product description hasn't been filled out yet. Check back later!",
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: "https://i.imgflip.com/1kvs1p.jpg",
    validate: {
      isUrl: true,
      notEmpty: true,
    },
  },
  stock: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0,
    },
  },
});

module.exports = Product;
