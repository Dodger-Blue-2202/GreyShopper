const router = require("express").Router();
const {
  models: { User,Order ,Product},
} = require("../db");
module.exports = router;

router.post("/login", async (req, res, next) => {
  try {
    res.send({ token: await User.authenticate(req.body) });
  } catch (err) {
    next(err);
  }
});

router.post("/signup", async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    if (req.body.cart){
    let cart = await Order.create();
    user.addOrder(cart)
    await Promise.all(req.body.cart.map(async (order)=>{
      let product = await Product.findByPk(order.product.id);
      console.log
      await product.addOrder(cart, {
        through: {
          quantity: order.quantity,
          total_price: Number(product.price) * Number(order.quantity),
          isCart: true,
        },
      });
  
     }))
    }
    //body now contains cart data to create a user with a cart if a user signs up after adding items to cart
    res.send({ token: await user.generateToken() });
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      res.status(401).send("Username/Email already exists");
    } else {
      next(err);
    }
  }
});

router.get("/me", async (req, res, next) => {
  try {
    res.send(await User.findByToken(req.headers.authorization));
  } catch (ex) {
    next(ex);
  }
});
//adminaccess route
router.get("/aa", async (req,res,next)=>{
  try {
    //returns boolean of admin access
    res.send(await User.checkAdminAccess(req.headers.authorization))
  } catch (error) {
    next(error)
  }
})
