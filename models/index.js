const Users = require('./Users');
const Instruments = require('./Instruments');
const userInstruments = require('./UserInstruments');
const Rhythms = require('./Rhythms');
const Comments = require('./Comments');
const Posts = require('./Posts');

//Each user can have many instruments and instruments can go to many users
Instruments.belongsToMany(Users, {through:userInstruments, foreignKey:'instrument_id', unique: false});
Users.belongsToMany(Instruments, {through:userInstruments, foreignKey:'user_id', unique: false});

// Each post has one Rhythm
Posts.belongsTo(Rhythms, {
    foreignKey: 'rhythm_id',
    constraints: false
  });

Rhythms.hasMany(Posts,{
    foreignKey: 'rhythm_id',
    constraints: false
});

//Users can have many posts, but a post only has one user
// Each post has one Rhythm
Posts.belongsTo(Users, {
    foreignKey: 'user_id'
  });

Users.hasMany(Posts,{
    foreignKey: 'user_id'
});
//Posts and Users can have many comments, but a comment only has one post/user
Comments.belongsTo(Posts, {
    foreignKey: 'post_id'
});

Posts.hasMany(Comments,{
    foreignKey: 'post_id'
});

Comments.belongsTo(Users, {
    foreignKey: 'user_id'
});

Users.hasMany(Comments,{
    foreignKey: 'user_id'
});


module.exports = { Users, Instruments, Rhythms, Posts, Comments, userInstruments};
