const router = require("express").Router();
const {
  models: { Product, User, Order, Order_Product },
} = require("../db");
module.exports = router;
// requires authorization of id from JWT before any route

// this is api/orders
router.get("/", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    const order = await Order_Product.findAll({
      include: [
        { model: Order, where: { userId: user.id } },
        { model: Product },
      ],
      where: { isCart: true },
    });
    res.json(order);
  } catch (err) {
    next(err);
  }
});

//add items to orders
//delete items from orders
//checkout an order- change isCart on Object model and subtract Quantity from Product table
//delete orders
