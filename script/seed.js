"use strict";

const {
  db,
  models: { User, Product, Order },
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
    imageUrl:
      "https://www.sephora.com/productimages/sku/s1506492-main-zoom.jpg",
  },
  {
    name: "A Single Spoon",
    price: 4200000,
    description: "This is the best spoon.",
    stock: 1,
    imageUrl:
      "https://www.cutlery-luxury.mj777.com/pic/vip1/Luxury%20Amber%20VIP%20-%20Gold%20Spoon%20Exclusive_3.jpg",
  },
  {
    name: "Two Spoons",
    price: 1,
    description: "Almost worthless.",
    stock: 43,
    imageUrl:
      "https://royaldesign.com/image/2/aida-raw-cutlery-2pcs-gravy-potato-spoon-giftbox-0?w=168&quality=80",
  },
  {
    name: "Coat Hanger",
    price: 100,
    description: "Hang your clothes on this.",
    stock: 7,
    imageUrl:
      "https://i.etsystatic.com/6944591/r/il/444c41/3618253733/il_570xN.3618253733_8aq3.jpg",
  },
  {
    name: "Coffee Beans",
    price: 800,
    description: "Questionably sourced.",
    stock: 13,
    imageUrl:
      "https://cdn11.bigcommerce.com/s-2drwt2az/images/stencil/original/products/25099/70039/api8vpe0r__26940.1592322807.jpg?c=2",
  },
  {
    name: "Chode Jeans",
    price: 4000,
    description: "Size 54 waist, 10 inch legs. They're junk.",
    stock: 2,
    imageUrl:
      "https://preview.redd.it/1h7bwmant8a71.png?width=1738&format=png&auto=webp&s=256c5d5274f84eb3e6ce11468007e41708fa87fb",
  },
  {
    name: "Black T-Shirt",
    price: 1000,
    description: "It's got 4 holes of various sizes, figure it out.",
    stock: 3,
    imageUrl:
      "https://www.inexhibit.com/wp-content/uploads/2021/11/Metaverse-Zuckerberg-3.jpg",
  },
  {
    name: "White T-Shirt",
    price: 1000,
    description: "Comes pre-stained",
    stock: 3,
    imageUrl:
      "https://www.onlineworldofwrestling.com/wp-content/uploads/2012/04/DD-1.jpg",
  },
  {
    name: "Pair of Shoes",
    price: 3000,
    description: "We won't tell you the size or brand. You feeling lucky?",
    stock: 7,
    imageUrl:
      "https://cdn-3.cinemaparadiso.co.uk/film-stills/858171-30758-clp-720.jpg",
  },
  {
    name: "One Sock",
    price: 299,
    description: "We sell them like this so you have to buy two.",
    stock: 9,
    imageUrl:
      "https://static.wikia.nocookie.net/spongebob/images/3/3d/Dining_sock.jpg/revision/latest?cb=20120928060637",
  },
];

const orders = [{ userId: 1 }, { userId: 2 }, { userId: 3 }, { userId: 4 }];

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  //Creating Users
  await Promise.all(
    users.map(async (user) => {
      await User.create(user);
    })
  );

  //Creating Orders
  const newOrders = await Promise.all(
    orders.map((order) => Order.create(order))
  );

  // Creating Products
  await Promise.all(
    products.map(async (product) => {
      const newProduct = await Product.create(product);
      let order = newOrders[Math.floor(Math.random() * newOrders.length)];
      await newProduct.addOrder(order, {
        through: {
          quantity: 1,
          total_price: product.price,
          isCart: Math.random() > 0.5,
        },
      });
    })
  );

  console.log(
    `seeded ${users.length} users, ${products.length} products and ${orders.length} orders.`
  );
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
