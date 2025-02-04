const { wishlist, items, users } = require('./seedData.js');

const { sequelize } = require('./db');
// const {Sauce} = require('./models');
const { Item, Wishlist, User } = require('./models');

const seed = async () => {
  try {
    // drop and recreate tables per model definitions
    await sequelize.sync({ force: true });

    // insert data
    await Promise.all(items.map(item => Item.create(item)));
    await Promise.all(wishlist.map(wishlist => Wishlist.create(wishlist)));
    await Promise.all(users.map(user => User.create(user)));

    console.log("db populated!");
  } catch (error) {
    console.error(error);
  }
}

seed();
