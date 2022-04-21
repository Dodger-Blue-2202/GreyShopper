const router = require("express").Router();
const {
  models: { Product,User,Order,Order_Product },
} = require("../db");
module.exports = router;
// requires authentication of id from JWT before any route

// router.use("/", async (req,res,next)=>{
//   try {
//     console.log(req.headers.authorization)
//     const isAdmin = await User.checkAdminAccess(req.headers.authorization)
//     if (!isAdmin){
//       throw "Does not have correct authorization"
//     }
//     next()
//   } catch (error) {
//     next(error)
//   }
// })

router.get('/', async (req, res, next) => {
  try {    
    console.log(req.headers.authorization)
    const user = await User.findByToken(req.headers.authorization)
    console.log(Order_Product.prototype)
    const order = await Order_Product.findAll({
      include:[
      {model:Order, where: {userId:user.id} },
      {model:Product,}],
      where:{isCart:true}
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