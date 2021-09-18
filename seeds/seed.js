const sequelize = require('../config/connection');
const seedRhythms = require('./rhythmData.json');
const seedComments = require('./commentData.json');
const seedInstruments = require('./instrumentData.json');
const seedUserInstruments = require('./userInstrumentsData.json');
const seedPosts = require('./postData.json');
const seedUsers = require('./userData.json');
const { Users, Comments, Instruments, Posts, Rhythms, userInstruments } = require('../models');


const seedAll = async () => {
  await sequelize.sync({ force: true });

  await Rhythms.bulkCreate(seedRhythms, {
    individualHooks: true,
    returning: true,
  });
  await Instruments.bulkCreate(seedInstruments, {
    individualHooks: true,
    returning: true,
  });
  await Users.bulkCreate(seedUsers, {
    individualHooks: true,
    returning: true,
  });
  await userInstruments.bulkCreate(seedUserInstruments, {
    individualHooks: true,
    returning: true,
  });
  await Posts.bulkCreate(seedPosts, {
    individualHooks: true,
    returning: true,
  });
  await Comments.bulkCreate(seedComments, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedAll();
