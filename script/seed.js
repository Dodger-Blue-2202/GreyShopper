"use strict";

const {
  db,
  models: { User, Product, Order },
} = require("../server/db");

const colors = [
  {
    name: "#323232",
    price: 5,
    imageUrl: "http://dummyimage.com/250x250.png/323232/323232",
    stock: 904,
    description: "Phasellus id sapien in sapien iaculis congue.",
  },
  {
    name: "#141414",
    price: 6,
    imageUrl: "http://dummyimage.com/250x250.png/141414/141414",
    stock: 783,
    description:
      "Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.",
  },
  {
    name: "#0a0a0a",
    price: 9,
    imageUrl: "http://dummyimage.com/250x250.png/0a0a0a/0a0a0a",
    stock: 812,
    description: "Duis bibendum. Morbi non quam nec dui luctus rutrum.",
  },
  {
    name: "#1e1e1e",
    price: 8,
    imageUrl: "http://dummyimage.com/250x250.png/1e1e1e/1e1e1e",
    stock: 980,
    description:
      "Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.",
  },
  {
    name: "#282828",
    price: 7,
    imageUrl: "http://dummyimage.com/250x250.png/282828/282828",
    stock: 811,
    description: "Suspendisse potenti. Nullam porttitor lacus at turpis.",
  },
  {
    name: "#3b3b3b",
    price: 9,
    imageUrl: "http://dummyimage.com/250x250.png/3b3b3b/3b3b3b",
    stock: 835,
    description: "Vivamus vel nulla eget eros elementum pellentesque.",
  },
  {
    name: "#454545",
    price: 1,
    imageUrl: "http://dummyimage.com/250x250.png/454545/454545",
    stock: 965,
    description: "Donec dapibus. Duis at velit eu est congue elementum.",
  },
  {
    name: "#4f4f4f",
    price: 6,
    imageUrl: "http://dummyimage.com/250x250.png/4f4f4f/4f4f4f",
    stock: 904,
    description:
      "Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.",
  },
  {
    name: "#595959",
    price: 10,
    imageUrl: "http://dummyimage.com/250x250.png/595959/595959",
    stock: 809,
    description: "Donec semper sapien a libero. Nam dui.",
  },
  {
    name: "#636363",
    price: 7,
    imageUrl: "http://dummyimage.com/250x250.png/636363/636363",
    stock: 744,
    description: "Praesent id massa id nisl venenatis lacinia.",
  },
  {
    name: "#6c6c6c",
    price: 2,
    imageUrl: "http://dummyimage.com/250x250.png/6c6c6c/6c6c6c",
    stock: 790,
    description:
      "Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue.",
  },
  {
    name: "#767676",
    price: 8,
    imageUrl: "http://dummyimage.com/250x250.png/767676/767676",
    stock: 866,
    description:
      "Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.",
  },
  {
    name: "#808080",
    price: 1,
    imageUrl: "http://dummyimage.com/250x250.png/808080/808080",
    stock: 721,
    description: "Mauris lacinia sapien quis libero.",
  },
  {
    name: "#8a8a8a",
    price: 10,
    imageUrl: "http://dummyimage.com/250x250.png/8a8a8a/8a8a8a",
    stock: 798,
    description: "Suspendisse potenti. In eleifend quam a odio.",
  },
  {
    name: "#949494",
    price: 5,
    imageUrl: "http://dummyimage.com/250x250.png/949494/949494",
    stock: 844,
    description: "Duis bibendum. Morbi non quam nec dui luctus rutrum.",
  },
  {
    name: "#9d9d9d",
    price: 2,
    imageUrl: "http://dummyimage.com/250x250.png/9d9d9d/9d9d9d",
    stock: 877,
    description: "Nulla mollis molestie lorem.",
  },
  {
    name: "#a7a7a7",
    price: 5,
    imageUrl: "http://dummyimage.com/250x250.png/a7a7a7/a7a7a7",
    stock: 892,
    description:
      "Curabitur convallis. Duis consequat dui nec nisi volutpat eleifend.",
  },
  {
    name: "#b1b1b1",
    price: 1,
    imageUrl: "http://dummyimage.com/250x250.png/b1b1b1/b1b1b1",
    stock: 821,
    description: "Nunc nisl.",
  },
  {
    name: "#bbbbbb",
    price: 1,
    imageUrl: "http://dummyimage.com/250x250.png/bbbbbb/bbbbbb",
    stock: 866,
    description: "Phasellus sit amet erat.",
  },
  {
    name: "#c5c5c5",
    price: 10,
    imageUrl: "http://dummyimage.com/250x250.png/c5c5c5/c5c5c5",
    stock: 707,
    description:
      "Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem.",
  },
  {
    name: "#cecece",
    price: 10,
    imageUrl: "http://dummyimage.com/250x250.png/cecece/cecece",
    stock: 993,
    description: "Nullam varius.",
  },
  {
    name: "#d8d8d8",
    price: 9,
    imageUrl: "http://dummyimage.com/250x250.png/d8d8d8/d8d8d8",
    stock: 980,
    description:
      "Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum.",
  },
  {
    name: "#e2e2e2",
    price: 10,
    imageUrl: "http://dummyimage.com/250x250.png/e2e2e2/e2e2e2",
    stock: 863,
    description:
      "In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante.",
  },
  {
    name: "#ececec",
    price: 4,
    imageUrl: "http://dummyimage.com/250x250.png/ececec/ececec",
    stock: 710,
    description: "Proin risus. Praesent lectus.",
  },
];

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
  {
    username: "DEMO",
    password: "DEMO",
    email: "demo@demo.com",
    isAdmin: false,
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
      "https://static.wikia.nocookie.net/spongebob/images/3/3d/Dining_sock.jpg",
  },
];

const orders = [
  { userId: 1 },
  { userId: 2 },
  { userId: 3 },
  { userId: 4 },
  { userId: 5 },
];

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
    colors.map(async (product) => {
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
    `seeded ${users.length} users, ${colors.length} products and ${orders.length} orders.`
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
