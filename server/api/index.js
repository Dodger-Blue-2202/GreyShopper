const router = require("express").Router();
module.exports = router;

//What are our different routes going to be
// Admin needs /users and /products route... /users completely blocked by token authorization
// /products is blocked by token authorization for everything except get requests
// Regular users will use the orders route which can make changes to orders table and on a checkout can make changes to product quantity even without admin access

router.use("/users", require("./users"));
router.use("/products", require("./products"));
router.use("/orders", require("./orders"));
router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
