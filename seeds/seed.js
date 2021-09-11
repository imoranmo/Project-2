const sequelize = require('../config/connection');
const seedRhythms = require('./rhythmData');
const seedComments = require('./commentData');
const seedInstruments = require('./instrumentData');
const seedPosts = require('./postData');
const seedUsers = require('./userData');


const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedRhythms();
  await seedInstruments();
  await seedUsers();
  await seedPosts();
  await seedComments();

  process.exit(0);
};

seedAll();
