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

//add initial item to cart
// update item amount in cart
router.post("/products", async (req, res, next) => {
  try {
    console.log("req is ", req.body);
    let product = await Product.findByPk(req.body.data.product.id);
    let user = await User.findByToken(req.body.headers.authorization);
    // this is the cart
    let order = await Order.findOne({
      include: [{ model: Order_Product, where: { isCart: true } }],
      where: { userId: user.id },
    });
    if (!order) {
      order = await Order.create();
      user.addOrder(order)
    }
    let qty = req.body.data.qty || 1;
    await product.addOrder(order, {
      through: {
        quantity: qty,
        total_price: product.price * qty,
        isCart: true,
      },
    });

    res.status(201).send();
  } catch (err) {
    next(err);
  }
});

//delete item from cart
router.delete("/products", async (req, res, next) => {
  try {
    let product = await Product.findByPk(req.body.id);
    let user = await User.findByToken(req.headers.authorization);
    // this is the cart
    const order = await Order_Product.findOne({
      include: [
        { model: Order, where: { userId: user.id } },
        { model: Product, where: { id: product.id } },
      ],
      where: { isCart: true },
    });
    await order.destroy();
    res.status(201).send(order);
  } catch (err) {
    next(err);
  }
});

//checkout an order- change isCart on Object model and subtract Quantity from Product table
router.put("/checkout", async(req,res,next)=>{
  if(req.headers.authorization){
    try {
      let user = await User.findByToken(req.headers.authorization);
      let orders = await Order_Product.findAll(
      {
        include: [
          { model: Order, where: { userId: user.id } },
          { model: Product},
        ],
        where: { isCart: true },
      }); 
      let msg  =await Promise.all( orders.map(async (order)=> { 
        if (order.quantity<=order.product.stock) {
          let product = await Product.findOne({where:{id:order.product.id}})
          await product.decrement('stock',{by:order.quantity})
          let output = await order.update({isCart:false}); 
        return output
        }
      }))
      res.status(201).send(msg)
    } catch (error) {
      next(error)
    }
  } else{
    //if not logged in then 
    let orders = req.body;
    console.log(orders)
  }
})