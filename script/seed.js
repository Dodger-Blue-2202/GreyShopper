"use strict";

const {
  db,
  models: { User, Product },
} = require("../server/db");

const users = [
  {
    username: "dwight",
    password: "schrute",
    email: "dwight@fakeoffice.com",
    isAdmin: true,
  },
  {
    username: "pam",
    password: "beesly",
    email: "beepboop@fakeoffice.com",
    isAdmin: false,
  },
  {
    username: "jim",
    password: "halpert",
    email: "jim@fakeoffice.com",
    isAdmin: false,
  },
  {
    username: "michael",
    password: "scott",
    email: "michael@fakeoffice.com",
    isAdmin: true,
  },
];
const products = [
  {
    name: "Hair Brush",
    price: 400,
    description: "Brushes more than one hair at a time!",
    stock: 7,
  },
  {
    name: "A Single Spoon",
    price: 4200000,
    description: "This is the best spoon.",
    stock: 1,
  },
  {
    name: "Two Spoons",
    price: 1,
    description: "Almost worthless.",
    stock: 43,
  },
  {
    name: "Coat Hanger",
    price: 100,
    description: "Hang your clothes on this.",
    stock: 7,
  },
  {
    name: "Coffee Beans",
    price: 800,
    description: "Questionably sourced.",
    stock: 13,
  },
  {
    name: "Chode Jeans",
    price: 4000,
    description: "Size 54 waist, 10 inch legs. They're junk.",
    stock: 2,
  },
  {
    name: "Black T-Shirt",
    price: 1000,
    description: "It's got 4 holes of various sizes, figure it out.",
    stock: 3,
  },
  {
    name: "White T-Shirt",
    price: 1000,
    description: "Comes pre-stained",
    stock: 3,
  },
  {
    name: "Pair of Shoes",
    price: 3000,
    description: "We won't tell you the size or brand. You feeling lucky?",
    stock: 7,
  },
  {
    name: "One Sock",
    price: 299,
    description: "We sell them like this so you have to buy two.",
    stock: 9,
  },
];

const orders = [
  {
    quantity: 2,
    total_price: 598,
  },
  {
    quantity: 1,
    total_price: 3000,
  },
];

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating Products
  // const newProducts = await Promise.all(
  //   products.map((product) => Product.create(product))
  // );
  await Promise.all(products.map((product) => Product.create(product)));

  // Creating Users
  await Promise.all(
    users.map((user) => User.create(user))
    // users.map((user) => {
    //   User.create(user);
    // const newUser = await User.create(user);
    // let product = newProducts[Math.floor(Math.random() * newProducts.length)];
    // await newUser.addProduct(product, { through: { quantity: 1 } });
    // let secondProduct =
    //   newProducts[Math.floor(Math.random() * newProducts.length)];
    // await newUser.addProduct(secondProduct, {
    //   through: { quantity: Math.floor(Math.random() * 5) },
    // });
    // })
  );

  console.log(`seeded ${users.length} users and ${products.length} products`);
  console.log(`seeded successfully`);
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
