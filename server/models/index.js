const {Sequelize} = require('sequelize')
const {sequelize} = require('../db')

const Wishlist = sequelize.define("wishlist", {
  gifUrl: Sequelize.STRING,     
  bodyPart: Sequelize.STRING,   
  equipment: Sequelize.STRING,  
  name: Sequelize.STRING,       
  target: Sequelize.STRING,  
});

const Item = sequelize.define("items", {         
  gifUrl: Sequelize.STRING,     
  bodyPart: Sequelize.STRING,   
  equipment: Sequelize.STRING,  
  name: Sequelize.STRING,       
  target: Sequelize.STRING,     
});

const User = sequelize.define("user", {         
  username: Sequelize.STRING,     
  password: Sequelize.STRING, 
  age: Sequelize.STRING,     
  bodyWeight: Sequelize.STRING,   
  height: Sequelize.STRING,
});

module.exports = {
  db: sequelize,
  Wishlist,
  Item,
  User,
};
