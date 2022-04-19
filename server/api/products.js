const router = require("express").Router();
const {
  models: { Product },
} = require("../db");
module.exports = router;

// this is /api/products
router.get("/", async (req, res, next) => {
  try {
    const products = await Product.findAll({});
    res.json(products);
  } catch (err) {
    next(err);
  }
});

// this is /api/products/id
router.get("/:id", async (req, res, next) => {
  try {
    const products = await Product.findByPk(req.params.id);
    res.json(products);
  } catch (err) {
    next(err);
  }
});

// ADMIN ACCESS ONLY BELOW
// add a product
router.post("/", async (req, res, next) => {
  try {
    res.status(201).send(await Product.create(req.body));
  } catch (err) {
    next(err);
  }
});

// delete a product
router.delete("/:id", async (req, res, next) => {
  try {
    const productToRemove = await Product.findByPk(req.params.id);
    await productToRemove.destroy();
    res.send(productToRemove);
  } catch (err) {
    next(err);
  }
});

//update a product
router.put("/:id", async (req, res, next) => {
  try {
    const productToUpdate = await Product.findByPk(req.params.id);
    res.send(await productToUpdate.update(req.body));
  } catch (error) {
    next(error);
  }
});
