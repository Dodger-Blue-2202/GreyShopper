const router = require("express").Router();
const {
  models: { User },
} = require("../db");
module.exports = router;

router.use("/", async (req,res,next)=>{
  try {
    console.log(req.headers.authorization)
    const isAdmin = await User.checkAdminAccess(req.headers.authorization)
    if (!isAdmin){
      throw "Does not have correct authorization"
    }
    next()
  } catch (error) {
    next(error)
  }
})
// this is /api/users
router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ["id", "username"],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

// this is /api/users/id
router.get("/:id", async (req, res, next) => {
  try {
    const users = await User.findByPk(req.params.id, {
      attributes: ["id", "username"],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

// add a user
router.post("/", async (req, res, next) => {
  try {
    res.status(201).send(await User.create(req.body));
  } catch (err) {
    next(err);
  }
});

// delete a user
router.delete("/:id", async (req, res, next) => {
  try {
    const userToRemove = await User.findByPk(req.params.id);
    await userToRemove.destroy();
    res.send(userToRemove);
  } catch (err) {
    next(err);
  }
});

//update a user
router.put("/:id", async (req, res, next) => {
  try {
    const userToUpdate = await User.findByPk(req.params.id);
    res.send(await userToUpdate.update(req.body));
  } catch (error) {
    next(error);
  }
});
